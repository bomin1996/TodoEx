import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity } from './entities/todo.entity';
import { UserEntity } from '../user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
  ) {}

  async createTodo(user: UserEntity, todoText: string): Promise<TodoEntity> {
    const newTodo = this.todoRepository.create({
      todo: todoText,
      isCompleted: false,
      user: user, // UserEntity와 TodoEntity를 연결합니다.
    });
    return this.todoRepository.save(newTodo);
  }
  async getTodosByUser(user: UserEntity): Promise<TodoEntity[]> {
    return this.todoRepository.find({ where: { user } });
  }
  async updateTodo(
    id: number,
    updatedTodo: Partial<TodoEntity>,
  ): Promise<TodoEntity | null> {
    const todo = await this.todoRepository.findOne({
      where: { id, user: updatedTodo.user },
    });
    if (!todo) {
      return null; // Todo with the provided id was not found
    }
    Object.assign(todo, updatedTodo); // Update fields
    return this.todoRepository.save(todo);
  }
  async deleteTodo(id: number, user: UserEntity): Promise<void> {
    await this.todoRepository.delete({ id, user });
  }
}
