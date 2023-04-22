import { IsNotEmpty, IsString } from 'class-validator';

export class CreateClientDto {
  @IsString()
  profileImage: string;
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  NRIC: string;
  @IsString()
  @IsNotEmpty()
  contactNo: string;
  @IsString()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  address: string;
  @IsString()
  @IsNotEmpty()
  occupation: string;
}
