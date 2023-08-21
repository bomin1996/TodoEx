import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { LocalAuthGuard } from './auth.guard';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: 'your-secret-key', // 실제로는 더 강력한 키를 사용해야 합니다.
      signOptions: { expiresIn: '5m' }, // 토큰 유효 기간 설정
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LocalStrategy, LocalAuthGuard],
  exports: [AuthService], // 다른 모듈에서 AuthService를 사용할 수 있도록 exports
})
export class AuthModule {}
