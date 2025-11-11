/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */

import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

export class CreateUserDto {

    @IsOptional()
    @IsString()
    id:string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    @Matches(/^[A-Za-z0-9._%+-]+@aiub\.edu$/, {message: 'Email must end with @aiub.edu'})
    email: string;

  @IsNotEmpty()
  @IsEnum(['male','female','other'],{ message: 'Gender must be either male, female, or other' })
    gender: 'male' | 'female' | 'other';

    @IsNotEmpty()
    @IsString()
    @Matches(/^01[0-9]{9}$/, { message: 'Phone number must start with 01 and contain only numbers (total 11 digits)' })
    phoneNumber: string;

  @IsEnum(['customer', 'vendor'],{ message: 'Role must be either customer or vendor' })
    role: 'customer' | 'vendor';
    
    @IsString()
    @IsNotEmpty()
    @Matches(/^(?=.*[A-Z]).{6,}$/, {message: 'Password must be at least 6 characters long and contain at least one uppercase letter'})
    password:string;
}
export class UpdateServiceStatus {
  @IsNotEmpty()
 @IsEnum(['active','inactive'],{ message: 'Status must be either active or inactive' })
  status: 'active' | 'inactive';
}


