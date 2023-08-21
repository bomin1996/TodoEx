import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { BookEntity } from './books/entities/book.entity';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/entities/user.entity';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { JwtStrategy } from './auth/jwt.strategy';
import { UserService } from './user/user.service';
import { LocalStrategy } from './auth/local.strategy';
import { TodosModule } from './todos/todos.module';
import { TodoEntity } from './todos/entities/todo.entity';
import { TodosService } from './todos/todos.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'world',
      entities: [BookEntity, UserEntity, TodoEntity],
      synchronize: true,
    }),
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '5m' },
    }),
    PassportModule,
    TypeOrmModule.forFeature([UserEntity, TodoEntity]), // Add TodoEntity here
    TodosModule,
    BooksModule,
    UserModule,
  ],
  controllers: [AppController, AuthController],
  providers: [
    AppService,
    AuthService,
    JwtStrategy,
    LocalStrategy,
    UserService,
    TodosService,
  ],
})
export class AppModule {}
