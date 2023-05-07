import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
  Put,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { JwtAuthGuard } from 'src/authentication/jwt-auth.guard';
import { UpdateNoteDto } from './dto/update-note-dto';

@Controller('task')
@UseGuards(JwtAuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(@Body() createTaskDto: CreateNoteDto, @Request() req) {
    try {
      return await this.taskService.create(createTaskDto, req.user);
    } catch (error) {
      return error;
    }
  }

  @Get('get-all-task')
  async findAll(@Request() req) {
    return await this.taskService.findAll(req.user);
  }

  @Post(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.taskService.remove(+id);
    } catch (error) {
      return error;
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdateNoteDto) {
    try {
      return await this.taskService.update(+id, body);
    } catch (error) {
      return error;
    }
  }
}
