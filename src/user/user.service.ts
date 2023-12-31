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
  async findByEmail(email: string): Promise<UserEntity | undefined> {
    return await this.userRepository.findOne({ where: { email } });
  }
  async isEmailUnique(email: string): Promise<boolean> {
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    return !existingUser; // 이메일이 이미 존재하면 false 반환, 존재하지 않으면 true 반환
  }
}
