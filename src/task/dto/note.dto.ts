import { IsNotEmpty, IsString } from 'class-validator';

export class NoteDto {
  @IsString()
  @IsNotEmpty()
  date: string;
  @IsString()
  @IsNotEmpty()
  content: string;
}
