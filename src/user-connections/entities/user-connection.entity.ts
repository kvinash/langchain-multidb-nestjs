import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class UserConnection {

    @PrimaryGeneratedColumn()
    id: number;

    // Add relaion to User entity
    @ManyToOne(() => User, user => user.userConnections, { onDelete: 'CASCADE' })
    userId: User;



}
