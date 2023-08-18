import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt'; // 추가
import { PassportModule } from '@nestjs/passport'; // 추가
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { BookEntity } from './books/entities/book.entity';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/entities/user.entity';
import { AuthService } from './auth/auth.service'; // 추가
import { AuthController } from './auth/auth.controller'; // 추가
import { JwtStrategy } from './auth/jwt.strategy';
import { UserService } from './user/user.service';
import { LocalStrategy } from './auth/local.strategy'; // 추가
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'world',
      entities: [BookEntity, UserEntity],
      synchronize: true,
    }),
    JwtModule.register({
      secret: 'your-secret-key', // 더 강력한 키를 사용해야 합니다.
      signOptions: { expiresIn: '10s' }, // 토큰 유효 기간 설정
    }),
    PassportModule,
    TypeOrmModule.forFeature([UserEntity]), // UserEntity를 포함하는 모듈 등록
    BooksModule,
    UserModule,
    TodosModule,
  ],
  controllers: [AppController, AuthController], // AuthController 추가
  providers: [
    AppService,
    AuthService,
    JwtStrategy,
    LocalStrategy,
    UserService, // UserService 추가
  ], // AuthService, LocalStrategy, JwtStrategy 추가
})
export class AppModule {}
