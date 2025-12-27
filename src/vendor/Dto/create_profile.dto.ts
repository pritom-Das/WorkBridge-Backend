import { IsString, IsOptional } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  address: string;

  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  description?: string;
}
