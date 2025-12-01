import { Transform } from "class-transformer";
import { IsBoolean, IsEmail, IsIn, IsNotEmpty, IsOptional, Matches, MinLength } from "class-validator";

export class CreateAdminDto {
    @IsNotEmpty()
  @Matches(/^[A-Za-z\s]+$/, {
    message: "Name must contain only letters and spaces",
  })
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(6, { message: "Password must be at least 6 characters long" })
  @Matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).*$/, {
    message: "Password must contain at least one uppercase letter and one special character",
  })
  password: string;
    
}