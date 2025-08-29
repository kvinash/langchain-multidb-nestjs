import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class PostgresService {
  private dataSource: DataSource;

  constructor() {
    this.dataSource = new DataSource({
      type: 'postgres',
      url: process.env.POSTGRES_URI,
    });
    this.dataSource.initialize();
  }

  async runQuery(sql: string) {
    return this.dataSource.query(sql + ' LIMIT 500');
  }
}