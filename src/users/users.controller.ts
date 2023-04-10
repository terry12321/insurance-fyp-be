import {
  Controller,
  Get,
  UseGuards,
  Request,
  Post,
  Body,
  Param,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/authentication/jwt-auth.guard';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('register')
  async register(@Body() body: UserDto) {
    return await this.usersService.register(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-files')
  async getUserFiles(@Request() req) {
    return await this.usersService.getUserFiles(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('upload-file')
  async uploadFile(@Request() req) {
    try {
      if (req.body.length > 0) {
        await this.usersService.uploadFile(req.user, req.body);
        return 'successfully added user file';
      }
    } catch (error) {
      return error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('delete-file/:id')
  async deleteFile(@Request() req, @Param() params) {
    try {
      await this.usersService.deleteFile(req.user, +params.id);
      return 'successfully deleted user file';
    } catch (error) {
      return error;
    }
  }
}
