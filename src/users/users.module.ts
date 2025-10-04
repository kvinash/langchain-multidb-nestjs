import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from './users.repository';

@Module({
  controllers: [UsersController],
  providers: [UserService, UserRepository],
  exports: [UserService],

})
export class UsersModule {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}
}
