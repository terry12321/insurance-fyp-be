import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findOne(username);
    const login = await bcrypt.compare(password, user.password);
    if (user && login) {
      delete user.password;
      return user;
    }

    return null;
  }

  login(user: User) {
    const payload = { username: user.username, userId: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
