import { IsNotEmpty, IsString } from 'class-validator';

export class ForgetPasswordAuthenticationDto {
  @IsString()
  @IsNotEmpty()
  email: string;
}
