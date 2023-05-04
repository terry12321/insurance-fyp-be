import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { jwtConstants } from './constants';
import { MailService } from 'src/mail/mail.service';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOne(email);
    if (!user) {
      throw new BadRequestException('No such user exists.');
    }
    const login = await bcrypt.compare(password, user.password);
    if (user && login) {
      delete user.password;
      return user;
    } else {
      throw new UnauthorizedException('Incorrect email or password.');
    }
  }

  login(user: User) {
    const payload = { email: user.email, id: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async forgetPassword(email: string) {
    const user = await this.usersService.findOne(email);
    if (!user) {
      return null;
    }

    const secret = jwtConstants.secret + user.password;
    const payload = {
      email: user.email,
      id: user.id,
    };
    const token = this.jwtService.sign(payload, {
      expiresIn: '2m',
      secret: secret,
    });
    const url = `http://localhost:3000/resetPassword?id=${user.id}&token=${token}`;
    await this.mailService.sendResetConfirmation(user.email, url);
    return 'Password reset link has been sent to your email....';
  }

  async resetPassword(body: UpdateAuthenticationDto) {
    const user = await this.usersService.findOneById(+body.id);
    if (user) {
      const secret = jwtConstants.secret + user.password;
      const payload = this.jwtService.verify(body.token, { secret: secret });
      if (payload) {
        const result = await this.usersService.updateUserPassword(
          user.id,
          body.newPassword,
        );
        return result;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
}
