import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeleteFileDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
