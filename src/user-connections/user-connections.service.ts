import { Injectable } from '@nestjs/common';
import { CreateUserConnectionDto } from './dto/create-user-connection.dto';
import { UpdateUserConnectionDto } from './dto/update-user-connection.dto';

@Injectable()
export class UserConnectionsService {
  create(createUserConnectionDto: CreateUserConnectionDto) {
    return 'This action adds a new userConnection';
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
