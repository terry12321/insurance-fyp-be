import { IsNotEmpty, IsString } from 'class-validator';

export class UserFileDto {
  @IsString()
  @IsNotEmpty()
  path: string;

  @IsString()
  name: string;
}
