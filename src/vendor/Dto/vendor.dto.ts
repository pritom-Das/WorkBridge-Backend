 import { IsString, IsNumber, IsBoolean, IsIn, IsOptional, IsEmail, IsObject } from 'class-validator';

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
  email?: string; 
  @IsOptional()
  @IsString()
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