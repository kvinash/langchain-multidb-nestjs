import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AskController } from './ask/ask.controller';
import { AskService } from './ask/ask.service';
import { AiService } from './ai/ai.service';
import { PostgresService } from './db/postgres.service';
import { MongoService } from './db/mongo.service';
import { VizService } from './viz/viz.service';
import { UsersModule } from './users/users.module';
import { TypeOrmConfigModule } from './db/typeorm.config.module';
import { UserConnectionsModule } from './user-connections/user-connections.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), 
    UsersModule,
    TypeOrmConfigModule,
    UserConnectionsModule
  ],
  controllers: [AskController],
  providers: [AskService, AiService, PostgresService, MongoService, VizService],
})
export class AppModule {}