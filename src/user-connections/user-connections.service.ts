import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserConnectionDto } from './dto/create-user-connection.dto';
import { UpdateUserConnectionDto } from './dto/update-user-connection.dto';
import { UserConnection } from '../user-connections/entities/user-connection.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserConnectionsService {
    constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(UserConnection)
    private readonly connectionRepository: Repository<UserConnection>,
  ) {}

    async createConnection(userId: string, createConnectionDto: CreateUserConnectionDto): Promise<UserConnection> {
    const user = await this.userRepository.findOne({
    where: { id: userId },
    relations: ['connections'],
  });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const userConnection = new UserConnection();
    userConnection.dbConfig = createConnectionDto.dbConfig;
    userConnection.dbPassword = createConnectionDto.dbPassword;
  
    await this.connectionRepository.save(userConnection);
      // Initialize connections array if it's undefined
  if (!user.connections) {
    user.connections = [];
  }
    user.connections.push(userConnection);
console.log("user",user);   
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
