import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

export class UserRepository extends Repository<User> {
   async findOneById(id: string): Promise<User> {
    return this.findOne({ where: { id } });
  }
}