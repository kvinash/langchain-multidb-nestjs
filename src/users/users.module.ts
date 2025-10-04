import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from './users.repository';
import { UserConnection } from 'src/user-connections/entities/user-connection.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserConnection])],
  controllers: [UsersController],
  providers: [UserService, UserRepository],
  exports: [UserService],

})
export class UsersModule {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}
}
