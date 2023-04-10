import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateNoteDto } from './dto/create-note.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(@Body() createTaskDto: CreateNoteDto) {
    try {
      return await this.taskService.create(createTaskDto);
    } catch (error) {
      return error;
    }
  }

  @Get('get-all-task')
  async findAll() {
    return await this.taskService.findAll();
  }

  @Post(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.taskService.remove(+id);
    } catch (error) {
      return error;
    }
  }
}
