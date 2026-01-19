import { Contains, IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class CreateVendorDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @Contains('@gmail.com', { message: 'Email must be a gmail address' })
  email: string;

  @MinLength(6)
  @IsNotEmpty()
  @Matches(/^(?=.*[A-Z]).{6,}$/, {message: 'Password must be at least 6 characters long...'})
  password: string;
 
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  phone: string; 
}