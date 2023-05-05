import {
  Controller,
  Post,
  UseGuards,
  Request,
  Res,
  Body,
} from '@nestjs/common';
import { Request as ExpressRequest, Response } from 'express';
import { AuthenticationService } from './authentication.service';
import { ForgetPasswordAuthenticationDto } from './dto/forget-password-authentication.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Res() response: Response) {
    const result = this.authService.login(req.user);
    response.cookie('session', result.accessToken, {
      maxAge: 60000 * 60 * 3,
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
    });
    response.json({ accessToken: result.accessToken, user: req.user });
  }

  @UseGuards(JwtAuthGuard)
  @Post('verify')
  async verify(@Request() req: ExpressRequest, @Res() response: Response) {
    if (req.cookies) {
      console.log(req.cookies);
    }
    response.status(200).send({});
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Res() response: Response) {
    response.clearCookie('session');
    response.status(200).send({});
  }

  @Post('forget-password')
  async forgetPassword(@Request() req, @Res() response: Response) {
    const { email } = req.body;
    const result = await this.authService.forgetPassword(email);
    if (!result) {
      response.status(400).send({ msg: 'User not registered' });
    } else {
      response.status(200).send(result);
    }
  }

  @Post('reset-password')
  async resetPassword(@Request() req, @Res() response: Response) {
    try {
      const result = await this.authService.resetPassword(req.body);
      response.status(200).send(result);
    } catch (error) {
      response.status(400).send(error);
    }
  }
}
