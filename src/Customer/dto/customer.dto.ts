/* eslint-disable prettier/prettier */

import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Matches,MinLength} from 'class-validator';

export class RegisterUserDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    // @Matches(/^[A-Za-z0-9._%+-]+@aiub\.edu$/, {message: 'Email must end with @aiub.edu'})
    email: string;

  @IsNotEmpty()
  @IsEnum(['male','female','other'],{ message: 'Gender must be either male, female, or other' })
    gender: 'male' | 'female' | 'other';

    @IsNotEmpty()
    @IsString()
    @Matches(/^01\d{9}$/, { message: 'Phone number must be 11 digits and start with 01' })
    phoneNumber: string;

  @IsEnum(['customer', 'vendor'],{ message: 'Role must be either customer or vendor' })
    role: 'customer' | 'vendor';

    @IsNotEmpty() // Added address to match frontend
  @IsString()
  @MinLength(5)
  address: string;
    
    @IsString()
    @IsNotEmpty()
   // @Matches(/^(?=.*[A-Z]).{6,}$/, {message: 'Password must be at least 6 characters long and contain at least one uppercase letter'})
   @Matches(/^.{6,}$/, {message: 'Password must be at least 6 characters'})
    password:string;
}
export class UpdateUserDto {
  @IsOptional() 
  @IsString() 
  name: string;

  @IsOptional() 
  @IsEmail()
  // @Matches(/^[A-Za-z0-9._%+-]+@aiub\.edu$/, {message: 'Email must end with @aiub.edu'})
  email: string;

  @IsOptional() 
  @IsEnum(['male','female','other'], { message: 'Gender must be either male, female, or other' })
  gender: 'male' | 'female' | 'other';

  @IsOptional() 
  @IsString()
  @Matches(/^01\d{9}$/, { message: 'Phone number must be 11 digits and start with 01' })
  phoneNumber: string;  // change to string for Matches

  @IsOptional() 
  @IsEnum(['customer','vendor'], { message: 'Role must be either customer or vendor' })
  role: 'customer' | 'vendor';

  @IsOptional()
  @IsString()
  @Matches(/^(?=.*[A-Z]).{6,}$/, { message: 'Password must be at least 6 characters long and contain at least one uppercase letter' })
  password: string;
}
//check login 
export class LoginUserDto {
  @IsOptional() 
  @IsEmail()
  // @Matches(/^[A-Za-z0-9._%+-]+@aiub\.edu$/, {message: 'Email must end with @aiub.edu'})
  email: string;
  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[A-Z]).{6,}$/, {message: 'Password must be at least 6 characters long and contain at least one uppercase letter'})
  password: string;
}



// export class UpdateServiceStatus {
//   @IsNotEmpty()
//  @IsEnum(['active','inactive'],{ message: 'Status must be either active or inactive' })
//   status: 'active' | 'inactive';
// }


