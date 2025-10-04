import { Injectable } from '@nestjs/common';
import { CreateUserConnectionDto } from './dto/create-user-connection.dto';
import { UpdateUserConnectionDto } from './dto/update-user-connection.dto';
import { UserConnection } from '../user-connections/entities/user-connection.entity';
import { UserRepository } from '../users/users.repository';

@Injectable()
export class UserConnectionsService {
  constructor(private readonly userRepository: UserRepository) {}

    async createConnection(userId: string, createConnectionDto: CreateUserConnectionDto): Promise<UserConnection> {
    const user = await this.userRepository.findOneById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    const userConnection = new UserConnection();
    userConnection.dbConfig = JSON.stringify(createConnectionDto.dbConfig);
    userConnection.dbPassword = createConnectionDto.dbPassword;

    user.connections.push(userConnection);

    await this.userRepository.save(user);

    return userConnection;
  }

  findAll() {
    return `This action returns all userConnections`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userConnection`;
  }

  update(id: number, updateUserConnectionDto: UpdateUserConnectionDto) {
    return `This action updates a #${id} userConnection`;
  }

  remove(id: number) {
    return `This action removes a #${id} userConnection`;
  }
}
