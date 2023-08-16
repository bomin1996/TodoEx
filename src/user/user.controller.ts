import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/signup')
  async create(@Body() user: UserEntity, @Res() res: Response) {
    await this.userService.create(user);
    res.status(HttpStatus.CREATED).send(); // 201 Created 상태만 반환
  }

  @Get()
  async findAll(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserEntity> {
    return this.userService.findOne(+id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() User: UserEntity,
  ): Promise<number> {
    return this.userService.update(+id, User);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<number> {
    return this.userService.remove(+id);
  }
}
