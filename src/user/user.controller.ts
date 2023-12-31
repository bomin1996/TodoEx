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
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { Response } from 'express';

@Controller('auth')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/signup')
  async create(@Body() user: UserEntity, @Res() res: Response) {
    try {
      // 이메일 형식 체크
      if (!this.isEmailValid(user.email)) {
        throw new BadRequestException('유효하지 않은 이메일 형식입니다.');
      }
      const isEmailUnique = await this.userService.isEmailUnique(user.email);
      if (!isEmailUnique) {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ error: '중복된 이메일 주소입니다.' });
      } else {
        await this.userService.create(user);
        res.status(HttpStatus.CREATED).send();
      }
    } catch (error) {
      if (error instanceof BadRequestException) {
        res.status(HttpStatus.BAD_REQUEST).json({ error: error.message });
      } else {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ error: '서버 오류가 발생했습니다.' });
      }
    }
  }

  async isEmailUnique(email: string): Promise<boolean> {
    const existingUser = await this.userService.findByEmail(email);
    return !existingUser; // 이메일이 이미 존재하면 false 반환, 존재하지 않으면 true 반환
  }

  private isEmailValid(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); //간단한 이메일 형식 체크
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
