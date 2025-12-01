/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsOptional, IsString, IsNumber, IsEnum, Max, Min } from 'class-validator';

export class BookServiceDto {
      @IsOptional()
      @IsString()
      id: string;

      @IsNotEmpty()
      @IsString()
      serviceName: string;

      @IsNotEmpty()
      @IsEnum(['Education', 'Design & Creative', 'IT Services', 'Home Services', 'Repair & Maintenance'], { 
      message: 'Category must be one of: Education, Design & Creative, IT Services, Home Services, Repair & Maintenance' })
      category: 'Education' | 'Design & Creative' | 'IT Services' | 'Home Services' | 'Repair & Maintenance';

      @IsNotEmpty()
      @IsString()
      description:  string;

      @IsNotEmpty()
      @IsNumber()
      @Min(500, { message: 'Price must be at least 500' })
      @Max(10000, { message: 'Price cannot exceed 10000' })
      price: number;

      @IsNotEmpty()
      @IsEnum(['active','inactive'],{ message: 'Status must be either active or inactive' })
      status: 'active' | 'inactive';

      @IsNotEmpty()
      @IsNumber()
      rating: number;
}