import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { Pool, PoolConfig, PoolClient } from 'pg';
import { ConfigService } from '@nestjs/config';
import * as retry from 'retry';

@Injectable()
export class PostgresService implements OnModuleInit, OnModuleDestroy {
  private pool: Pool;
  private readonly logger = new Logger(PostgresService.name);
  private readonly maxRetries = 5;
  private readonly retryDelay = 5000; // 5 seconds
  
  constructor(private configService: ConfigService) {
    const config: PoolConfig = {
      connectionString: this.configService.get<string>('POSTGRES_URI'),
      max: 20, // maximum number of clients in the pool
      idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
      connectionTimeoutMillis: 2000, // how long to wait for a connection
    };

    this.pool = new Pool(config);

    // Handle pool errors
    this.pool.on('error', (err) => {
      this.logger.error('Unexpected error on idle PostgreSQL client', err);
    });
  }

  async onModuleInit() {
    await this.connectWithRetry();
  }

  async onModuleDestroy() {
    await this.closeConnection();
  }

  private async connectWithRetry(): Promise<void> {
    const operation = retry.operation({
      retries: this.maxRetries,
      factor: 2,
      minTimeout: this.retryDelay,
      maxTimeout: this.retryDelay * 5,
    });

    operation.attempt(async (currentAttempt) => {
      try {
        const client = await this.pool.connect();
        client.release();
        this.logger.log('Successfully connected to PostgreSQL');
      } catch (err) {
        this.logger.warn(
          `Failed to connect to PostgreSQL (attempt ${currentAttempt}/${this.maxRetries}): ${err.message}`,
        );
        if (operation.retry(err)) {
          return;
        }
        this.logger.error('Failed to connect to PostgreSQL after all retries');
        throw err;
      }
    });
  }

  private async closeConnection(): Promise<void> {
    try {
      await this.pool.end();
      this.logger.log('PostgreSQL connection pool closed');
    } catch (err) {
      this.logger.error('Error closing PostgreSQL connection pool', err);
      throw err;
    }
  }

  async executeQuery<T>(query: string, params: any[] = []): Promise<T[]> {
    let client: PoolClient;
    try {
      client = await this.pool.connect();
      const result = await client.query(query, params);
      return result.rows;
    } catch (err) {
      this.handleQueryError(err, query);
      throw err;
    } finally {
      if (client) {
        client.release();
      }
    }
  }

  private handleQueryError(error: any, query: string): void {
    const errorContext = {
      code: error.code,
      detail: error.detail,
      query: query.substring(0, 100) + '...', // Truncate long queries in logs
      timestamp: new Date().toISOString(),
    };

    switch (error.code) {
      case '28000': // Invalid authorization
        this.logger.error('Database authentication failed', errorContext);
        break;
      case '3D000': // Database does not exist
        this.logger.error('Database not found', errorContext);
        break;
      case '42P01': // Table does not exist
        this.logger.error('Table not found', errorContext);
        break;
      case '23505': // Unique violation
        this.logger.warn('Duplicate key violation', errorContext);
        break;
      case '57P01': // Database server closed the connection
      case '57P02': // Database server terminated abnormally
      case '57P03': // Database server connection lost
        this.logger.error('Database connection lost', errorContext);
        this.connectWithRetry().catch((err) => {
          this.logger.error('Failed to reconnect to database', err);
        });
        break;
      default:
        this.logger.error('Database error occurred', {
          ...errorContext,
          error: error.message,
        });
    }
  }

  // Health check method
  async checkHealth(): Promise<boolean> {
    try {
      const client = await this.pool.connect();
      try {
        await client.query('SELECT 1');
        return true;
      } finally {
        client.release();
      }
    } catch (err) {
      this.logger.error('Database health check failed', err);
      return false;
    }
  }

  // Get current pool status
  getPoolStatus() {
    return {
      totalCount: this.pool.totalCount,
      idleCount: this.pool.idleCount,
      waitingCount: this.pool.waitingCount,
    };
  }
}