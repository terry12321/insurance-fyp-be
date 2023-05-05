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
import { TaskModule } from './task/task.module';
import { Note } from './task/entities/note.entity';
import { Task } from './task/entities/task.entity';
import { ClientModule } from './client/client.module';
import { Client } from './client/entities/client.entity';
import { Occupation } from './client/entities/occupation.entity';
import { ClientPolicy } from './client/entities/clientPolicy.entity';
import { ClientUser } from './client/entities/clientUser.entity';

@Module({
  imports: [
    AuthenticationModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db.ivxonmjfqaxpzevtrzjm.supabase.co',
      port: 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB,
      entities: [
        Authentication,
        User,
        UserFile,
        Note,
        Task,
        Client,
        Occupation,
        ClientPolicy,
        ClientUser,
      ],
      synchronize: true,
    }),
    UsersModule,
    MailModule,
    TaskModule,
    ClientModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
