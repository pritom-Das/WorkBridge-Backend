import { Controller, Get, Post } from '@nestjs/common';
import { Body, Delete, Param, Patch, Put } from '@nestjs/common/decorators';
import { VendorService } from './vendor.service';
import { CreateServiceDto,UpdateServiceDto,UpdateProfileDto } from './Dto/vendor.dto';
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

  

   @Get('services/:id')
   getServiceById(@Param('id') id: number) {
       return this.vendorService.getServiceById(id);
   }

     @Post('add-service')
  addService(@Body() createServiceDto: CreateServiceDto) {
    console.log(createServiceDto.title);
    console.log(createServiceDto.id); 
        return this.vendorService.addService(createServiceDto);

    }
    @Delete('delete-service/:id')
    deleteService(@Param('id') id: number) { 
        return this.vendorService.deleteService(id);
    }
    @Put('update-service/:id')
    updateService(@Param('id') id: number, @Body() updateServiceDto: UpdateServiceDto) {
        return this.vendorService.updateService(id, updateServiceDto);
    }
    @Patch('update-profile/:id')
    updateProfile(@Param('id') id: number, @Body() updateProfileDto: UpdateProfileDto) {
        return this.vendorService.updateProfile(id, updateProfileDto);
    }
}