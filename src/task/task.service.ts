import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNoteDto } from './dto/create-note.dto';
import { NoteDto } from './dto/note.dto';
import { TaskDto } from './dto/task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Note } from './entities/note.entity';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private taskRepo: Repository<Task>,
    @InjectRepository(Note) private noteRepo: Repository<Note>,
  ) {}
  async create(createTaskDto: CreateNoteDto) {
    await this.noteRepo.save(createTaskDto);
    return 'Succesfully created a task';
  }

  async findAll() {
    const promiseTask = await this.taskRepo.find().then((tasks) => {
      return tasks.map(async (task) => {
        const body: TaskDto = { ...task, notes: [] };
        const notes = await this.noteRepo.find({
          where: { cardId: task.cardId },
          select: ['content', 'date'],
        });
        body.notes = notes;
        return body;
      });
    });
    return await Promise.all(promiseTask);
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
