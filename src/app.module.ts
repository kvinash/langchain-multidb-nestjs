import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AskController } from './ask/ask.controller';
import { AskService } from './ask/ask.service';
import { AiService } from './ai/ai.service';
import { PostgresService } from './db/postgres.service';
import { MongoService } from './db/mongo.service';
import { VizService } from './viz/viz.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AskController],
  providers: [AskService, AiService, PostgresService, MongoService, VizService],
})
export class AppModule {}