import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNoteDto } from './dto/create-note.dto';
import { TaskDto } from './dto/task.dto';
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
        });
        body.notes = notes;
        return body;
      });
    });
    return await Promise.all(promiseTask);
  }

  async remove(id: number) {
    await this.taskRepo
      .createQueryBuilder()
      .delete()
      .from('note')
      .where('id = :id', { id: id })
      .execute();
    return 'Successfully deleted note';
  }
}
