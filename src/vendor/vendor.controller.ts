import { Controller, Get, Post } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators';
import { VendorService } from './vendor.service';
import { CreateServiceDto } from './Dto/vendor.dto';
@Controller('vendors')
export class VendorController {
    constructor(private readonly vendorService: VendorService) {}
    @Get('all')
    getVendors(): string {
    return this.vendorService.getVendors();
    }
    @Get('services')
    getVendorServices(): string {
     return this.vendorService.getAllServices();
    }
    @Post('add-service')
  addService(@Body() createServiceDto: CreateServiceDto) {
    console.log(createServiceDto.title);
    console.log(createServiceDto.id); 
        return this.vendorService.addService(createServiceDto);

    }



}