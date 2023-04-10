import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { Authentication } from './authentication/entities/authentication.entity';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from './mail/mail.module';
import { UserFile } from './users/entities/userFile.entity';

@Module({
  imports: [
    AuthenticationModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123qwe!!',
      database: 'Insurance_Fyp',
      entities: [Authentication, User, UserFile],
      synchronize: true,
    }),
    UsersModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
