import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateClientPolicyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  clientId: number;

  @IsNumber()
  @IsNotEmpty()
  premium: number;

  @IsNumber()
  @IsNotEmpty()
  coverage: number;
}
