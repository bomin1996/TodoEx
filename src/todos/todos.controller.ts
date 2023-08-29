import {
  Body,
  Controller,
  Post,
  UseGuards,
  Get,
  Put,
  Param,
  ParseIntPipe,
  Delete,
  Res,
  Req,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodoEntity } from './entities/todo.entity';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { Response } from 'express';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createTodo(@Req() req, @Body() todo: TodoEntity): Promise<TodoEntity> {
    const user = req.user;
    console.log(user.email);
    const newTodo = await this.todosService.createTodo(user, todo.todo); // 유저 정보와 할 일 텍스트 전달
    return {
      id: newTodo.id,
      todo: newTodo.todo,
      isCompleted: newTodo.isCompleted,
      user: user.id,
    };
  }
  @UseGuards(JwtAuthGuard) // Apply JwtAuthGuard to secure this route
  @Get()
  async getTodos(@Req() req): Promise<TodoEntity[]> {
    const user = req.user;
    return this.todosService.getTodosByUser(user);
  }
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateTodo(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatedTodo: Partial<TodoEntity>,
  ): Promise<TodoEntity | { status: number; message: string }> {
    const todo = await this.todosService.updateTodo(id, updatedTodo);

    if (!todo) {
      return { status: 404, message: 'Todo not found!' };
    }
    return todo;
  }
  @UseGuards(JwtAuthGuard) // Apply JwtAuthGuard to secure this route
  @Delete(':id')
  async deleteTodo(
    @Param('id', ParseIntPipe) id: number,
    @Res() response: Response,
    @Req() req,
  ): Promise<void> {
    const user = req.user;
    await this.todosService.deleteTodo(id, user);
    response.status(204).send(); // Set status code to 204 and send response without body
  }
}
