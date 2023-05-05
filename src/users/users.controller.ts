import {
  Controller,
  Get,
  UseGuards,
  Request,
  Post,
  Body,
  Param,
  HttpException,
  Put,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/authentication/jwt-auth.guard';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    const { password, ...result } = await this.usersService.findOne(
      req.user.email,
    );
    return result;
  }

  @Post('register')
  async register(@Body() body: UserDto) {
    try {
      return await this.usersService.register(body);
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
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

  @UseGuards(JwtAuthGuard)
  @Put('update-profile')
  async updateFile(@Request() req, @Body() body) {
    try {
      await this.usersService.updateFile(req.user, body);
      return 'successfully updated user profile';
    } catch (error) {
      return error;
    }
  }
}
