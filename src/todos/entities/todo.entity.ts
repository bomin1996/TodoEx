import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';

@Entity({ name: 'todo' })
export class TodoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  todo: string;

  @Column({ default: false })
  isCompleted: boolean;

  @ManyToOne(() => UserEntity, (user) => user.todos)
  @JoinColumn({ name: 'userEmail', referencedColumnName: 'email' })
  user: UserEntity;
}
