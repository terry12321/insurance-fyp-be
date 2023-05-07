import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateNoteDto } from './dto/create-note.dto';
import { TaskDto } from './dto/task.dto';
import { Note } from './entities/note.entity';
import { Task } from './entities/task.entity';
import { User } from 'src/users/entities/user.entity';
import { TaskNote } from './entities/taskNote.entity';
import { UpdateNoteDto } from './dto/update-note-dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private taskRepo: Repository<Task>,
    @InjectRepository(Note) private noteRepo: Repository<Note>,
    @InjectRepository(TaskNote) private taskNoteRepo: Repository<TaskNote>,
  ) {}
  async create(createTaskDto: CreateNoteDto, user: User) {
    const result = await this.noteRepo.save(createTaskDto);
    await this.taskNoteRepo.save({ userId: user.id, noteId: result.id });
    return 'Succesfully created a task';
  }

  async findAll(user: User) {
    // get users task
    const userTasks = await this.taskNoteRepo.find({
      where: { userId: user.id },
    });
    const noteIds = userTasks.map((value) => {
      return value.noteId;
    });

    const promiseTask = await this.taskRepo.find().then((tasks) => {
      return tasks.map(async (task) => {
        const body: TaskDto = { ...task, notes: [] };
        const notes = await this.noteRepo.find({
          where: { cardId: task.cardId, id: In(noteIds) },
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
    await this.taskNoteRepo.delete({ noteId: id });
    return 'Successfully deleted note';
  }
  async update(id: number, body: UpdateNoteDto) {
    return await this.noteRepo.update(id, body);
  }
}
