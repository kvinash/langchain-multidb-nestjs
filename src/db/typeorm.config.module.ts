import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SchemaEmbedding } from '../schema-embedding/entities/schema-embedding.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('POSTGRES_URI'),
        entities: [SchemaEmbedding],
        synchronize: true, // set to false in production
      }),
    }),
    TypeOrmModule.forFeature([SchemaEmbedding]),
  ],
  exports: [TypeOrmModule],
})
export class TypeOrmConfigModule {}