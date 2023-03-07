import { Controller, Post, UseGuards, Request, Res } from '@nestjs/common';
import { Request as ExpressRequest, Response } from 'express';
import { AuthenticationService } from './authentication.service';
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
    response.json({ accessToken: result.accessToken });
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
}
