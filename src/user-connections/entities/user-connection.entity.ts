import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class UserConnection {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'jsonb' })
  dbConfig: Object;

  @Column()
  dbPassword: string;

  @ManyToOne(() => User, user => user.connections)
  user: User;
}