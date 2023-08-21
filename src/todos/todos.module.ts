import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './entities/todo.entity';
import { UserEntity } from '../user/entities/user.entity';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([TodoEntity, UserEntity]), // UserEntity도 여기에 추가
  ],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
