import { IsEnum, IsOptional } from "class-validator";

export class GetVendorDto {
    @IsOptional()
    @IsEnum(['approved','rejected','pending'])
    status?: 'approved'|'rejected'|'pending'
}