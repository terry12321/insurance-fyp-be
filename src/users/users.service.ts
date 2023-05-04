import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { UserFileDto } from './dto/userFile.dto';
import { UserFile } from './entities/userFile.entity';
import { DeleteFileDto } from './dto/deleteFile.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(UserFile) private userFileRepo: Repository<UserFile>,
  ) {}
  async findOne(email: string) {
    return await this.userRepo.findOne({ where: { email: email } });
  }

  async findOneById(id: number) {
    return await this.userRepo.findOne({ where: { id: id } });
  }

  async register(body: UserDto) {
    return await bcrypt
      .hash(body.password, 10)
      .then(async (hash) => {
        if (hash) {
          const user = new User();
          user.email = body.email;
          user.password = hash;
          await this.userRepo.save(user);
          return 'successfully created';
        }
      })
      .catch((err) => {
        return err;
      });
  }

  async updateUserPassword(id: number, newPassword: string) {
    return bcrypt
      .hash(newPassword, 10)
      .then(async (hash) => {
        if (hash) {
          await this.userRepo
            .createQueryBuilder()
            .update(User)
            .set({ password: hash })
            .where('id = :id', { id: id })
            .execute();
          return 'successfully updated!';
        }
      })
      .catch((err) => {
        return err;
      });
  }

  async getUserFiles(user: User) {
    return await this.userFileRepo.find({
      where: {
        userId: user.id,
      },
    });
  }

  async uploadFile(user: User, body: UserFileDto[]) {
    const promiseBody = [];
    body.map(async (val) => {
      const userFileBody = new UserFile();
      userFileBody.path = val.path;
      userFileBody.userId = user.id;
      userFileBody.name = val.name;
      promiseBody.push(this.userFileRepo.save(userFileBody));
    });
    await Promise.all(promiseBody);
  }

  async deleteFile(user: User, id: number) {
    const body: DeleteFileDto = {
      id: id,
      userId: user.id,
    };
    return await this.userFileRepo.delete(body).then((value) => {
      return value;
    });
  }
}
