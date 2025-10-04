import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

export class UserRepository extends Repository<User> {
  // Custom repository methods or overrides of existing methods can be defined here
}