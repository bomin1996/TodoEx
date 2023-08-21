import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Put,
  Param,
  ParseIntPipe,
  Delete,
  Res,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodoEntity } from './entities/todo.entity';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { Response } from 'express';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @UseGuards(JwtAuthGuard) // Apply JwtAuthGuard to secure this route
  @Post()
  async createTodo(
    @Request() req, // Use @Request() decorator to access request object
    @Body('todo') todoText: string, // Extract todo text from request body
  ): Promise<TodoEntity> {
    const user = req.user; // Access user object from request

    const newTodo = await this.todosService.createTodo(todoText, req);

    return {
      id: newTodo.id,
      todo: newTodo.todo,
      isCompleted: newTodo.isCompleted,
      user: user.id,
    };
  }
  @UseGuards(JwtAuthGuard) // Apply JwtAuthGuard to secure this route
  @Get()
  async getTodos(@Request() req): Promise<TodoEntity[]> {
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
      return { status: 404, message: 'Todo not found' };
    }
    return todo;
  }
  @UseGuards(JwtAuthGuard) // Apply JwtAuthGuard to secure this route
  @Delete(':id')
  async deleteTodo(
    @Param('id', ParseIntPipe) id: number,
    @Res() response: Response,
  ): Promise<void> {
    await this.todosService.deleteTodo(id);
    response.status(204).send(); // Set status code to 204 and send response without body
  }
}
