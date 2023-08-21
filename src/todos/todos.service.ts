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
    const todoToUpdate = await this.todoRepository.findOne({ where: { id } });
    if (!todoToUpdate) {
      return null; // Todo with the provided id was not found
    }
    Object.assign(todoToUpdate, updatedTodo); // Update fields
    return this.todoRepository.save(todoToUpdate);
  }
  async deleteTodo(id: number): Promise<void> {
    await this.todoRepository.delete(id);
  }
}
