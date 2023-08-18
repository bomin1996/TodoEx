import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({ usernameField: 'email', passwordField: 'password' });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (!user || user.password !== password) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인하세요.');
    }
    console.log('User validation successful:', user.id);
    return user;
  }
}
