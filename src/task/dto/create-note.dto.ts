import { IsNotEmpty, IsString } from 'class-validator';
import { NoteDto } from './note.dto';

export class CreateNoteDto extends NoteDto {
  @IsString()
  @IsNotEmpty()
  cardId: string;
}
