import {IsInt, IsUUID, Min} from 'class-validator';
export class OrderDto {
    @IsUUID()
    serviceId: string;
  
    @IsInt()
    @Min(1)
    quantity: number;
}