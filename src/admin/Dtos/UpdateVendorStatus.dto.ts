import { IsEnum } from "class-validator";

export class updateVendorStatus{
    @IsEnum(['approved','rejected'])
    status:'approved'|'rejected'
}