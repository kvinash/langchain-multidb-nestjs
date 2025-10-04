import { Test, TestingModule } from '@nestjs/testing';
import { UserConnectionsController } from './user-connections.controller';
import { UserConnectionsService } from './user-connections.service';

describe('UserConnectionsController', () => {
  let controller: UserConnectionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserConnectionsController],
      providers: [UserConnectionsService],
    }).compile();

    controller = module.get<UserConnectionsController>(UserConnectionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
