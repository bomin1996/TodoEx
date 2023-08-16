import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(user: UserEntity): Promise<UserEntity> {
    const newuser = this.userRepository.create(user);
    return await this.userRepository.save(newuser);
  }

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: number, user: UserEntity): Promise<number> {
    await this.userRepository.update(id, user);
    return id;
  }

  async remove(id: number): Promise<number> {
    await this.userRepository.delete(id);
    return id;
  }
}
