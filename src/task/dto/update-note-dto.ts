import { PartialType } from '@nestjs/mapped-types';
import { NoteDto } from './note.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateNoteDto extends PartialType(NoteDto) {
  @IsString()
  @IsNotEmpty()
  cardId: string;
}
