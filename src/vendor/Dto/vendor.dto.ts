 import { IsString, IsNumber, IsBoolean, IsIn, IsOptional, IsEmail, IsObject, Contains, Matches, MinLength, Max, MaxLength, IsInt, Min, IsNotEmpty } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  name: string; 
  @IsString()
  description: string; 
  @IsNumber()
  price: number; 
  @IsNumber()
  duration: number; 
  @IsIn(['development', 'design'])
  category: 'development' | 'design'; 
  @IsBoolean()
  isActive: boolean;
}

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  businessName?: string; 

 @IsOptional()
  @IsEmail()
  @Contains('aiub.edu', { message: 'Email must be an aiub.edu address' })
  email?: string;  

  @IsOptional()
  @IsString()
  @Matches(/^[0-9]+$/, { message: 'Contact number must contain only number' })
  contactNumber?: string; 

  @IsOptional()
  @IsString()
  address?: string;  

  @IsOptional()
  @IsString()
  description?: string; 

  @IsOptional()
  @IsObject()
  businessHours?: {
    open: string;
    close: string;
  };
}
 export class CreateVendorDto {
  @IsString() 
  businessName: string;

  @IsEmail()
  @Contains('aiub.edu', { message: 'Email must be an aiub.edu address' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @Matches(/(?=.*[A-Z])/, { message: 'Password must contain at least one uppercase letter' })
  password: string;

  @IsString()
  @Matches(/^[0-9]+$/, { message: 'Contact number must contain only number' })
  contactNumber: string;

  @IsString()
  address: string;

  @IsIn(['male', 'female'], { message: 'Invalid gender' })
  gender: 'male' | 'female'; 

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsObject()
  businessHours: {
    open: string;
    close: string;
  }; 
}
export class VendorLoginDto {
  @IsEmail()
  @Contains('aiub.edu', { message: 'Email must be an aiub.edu address' })
  email: string;
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @Matches(/(?=.*[A-Z])/, { message: 'Password must contain at least one uppercase letter' })
  password: string;
}

export class UpdateStatusDto {
  @IsIn(['active', 'inactive'])
  status: 'active' | 'inactive';
}
export class CreateUserDto{
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  fullName:string;

  @IsInt()
  @Min(0)
   @IsNotEmpty()
  age:number;
  
  @IsOptional()
  @IsIn(['active','inactive'])
  status?:'active' | 'inactive';


}