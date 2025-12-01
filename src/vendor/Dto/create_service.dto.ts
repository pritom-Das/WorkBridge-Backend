import { IsString, IsNumber } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;
}
