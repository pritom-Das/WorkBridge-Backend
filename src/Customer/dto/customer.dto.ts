/* eslint-disable prettier/prettier */

import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Matches} from 'class-validator';

export class CreateUserDto {

    @IsOptional()
    @IsString()
    id:string;

    // @IsNotEmpty()
    @IsOptional()
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
    //  @Min(1000000000, { message: 'Phone number must be 11 digits' }) 
    // @Max(1999999999, { message: 'Phone number must be 11 digits' })
    @Matches(/^01\d{9}$/, { message: 'Phone number must be 11 digits and start with 01' })
    phoneNumber: number;

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
export class UpdatePhoneNumberDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^01\d{9}$/, { message: 'Phone number must be 11 digits and start with 01' })
  phoneNumber: number;
}

