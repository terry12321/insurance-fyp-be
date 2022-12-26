import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}
  async findOne(username: string) {
    return await this.userRepo.findOne({ where: { username: username } });
  }

  async register(body: UserDto) {
    return bcrypt
      .hash(body.password, 10)
      .then(async (hash) => {
        if (hash) {
          const user = new User();
          user.username = body.username;
          user.password = hash;
          this.userRepo.save(user);
          return 'successfully created';
        }
      })
      .catch((err) => {
        return err;
      });
  }
}
