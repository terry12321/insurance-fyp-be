import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { NoteDto } from './note.dto';

export class TaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsString()
  @IsNotEmpty()
  cardId: string;
  @IsArray()
  @Type(() => NoteDto)
  notes: NoteDto[];
  @IsString()
  @IsNotEmpty()
  color: string;
  @IsString()
  @IsNotEmpty()
  btnColor: string;
}
