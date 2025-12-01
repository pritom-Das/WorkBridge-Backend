import { IsEnum } from "class-validator";

export class updateCustomerStatusDto{
   @IsEnum(['blocked','unblocked'])
    status: 'blocked' | 'unblocked';
}