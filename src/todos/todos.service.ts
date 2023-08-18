import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity } from './entities/todo.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
    private readonly userService: UserService,
  ) {}

  async createTodo(userEmail: string, todoText: string): Promise<TodoEntity> {
    const user = await this.userService.findByEmail(userEmail);
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    const newTodo = this.todoRepository.create({
      todo: todoText,
      isCompleted: false,
      user: user,
    });

    return await this.todoRepository.save(newTodo);
  }

  async getAllTodosByUser(userEmail: string): Promise<TodoEntity[]> {
    const user = await this.userService.findByEmail(userEmail);
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    return await this.todoRepository.find({ user });
  }

  async updateTodo(todoId: number, todoText: string): Promise<TodoEntity> {
    const todo = await this.todoRepository.findOne(todoId);
    if (!todo) {
      throw new NotFoundException('할일을 찾을 수 없습니다.');
    }

    todo.todo = todoText;
    return await this.todoRepository.save(todo);
  }

  async deleteTodo(todoId: number): Promise<void> {
    const todo = await this.todoRepository.findOne(todoId);
    if (!todo) {
      throw new NotFoundException('할일을 찾을 수 없습니다.');
    }

    await this.todoRepository.remove(todo);
  }
}
