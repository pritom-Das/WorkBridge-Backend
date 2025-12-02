import { IsOptional, IsString, IsEmail, MinLength } from 'class-validator';

export class UpdateVendorDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}

export class LoginVendorDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}