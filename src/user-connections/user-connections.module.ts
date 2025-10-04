import { Module } from '@nestjs/common';
import { UserConnectionsService } from './user-connections.service';
import { UserConnectionsController } from './user-connections.controller';
import { User } from '../users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserConnection } from './entities/user-connection.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserConnection])],
  controllers: [UserConnectionsController],
  providers: [UserConnectionsService],
})
export class UserConnectionsModule {}
