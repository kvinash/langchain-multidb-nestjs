import { Module } from '@nestjs/common';
import { UserConnectionsService } from './user-connections.service';
import { UserConnectionsController } from './user-connections.controller';

@Module({
  controllers: [UserConnectionsController],
  providers: [UserConnectionsService],
})
export class UserConnectionsModule {}
