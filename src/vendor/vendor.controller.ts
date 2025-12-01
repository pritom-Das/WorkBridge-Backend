import {Controller,Get,Post,Delete,Param,Body,Patch,Put, Query, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { VendorService } from './vendor.service';   
import { CreateVendorDto } from './Dto/create_vendor.dto';
import { UpdateVendorDto } from './Dto/update.dto';
import { CreateServiceDto } from './Dto/create_service.dto';
 

@Controller('vendors')
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}
 
  @Post()
  createVendor(@Body() body: CreateVendorDto){
    return this.vendorService.createVendor(body);
  }

  @Get()
  getAllVendors(){
    return this.vendorService.getAllVendors();
  }
  @Get(':id')
  getVendor(@Param('id',ParseIntPipe) id:number){
    return this.vendorService.getVendor(id);
  }
  @Put(':id')
  updateVendor(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateVendorDto) {
    return this.vendorService.updateVendor(id, body);
  }
  @Patch(':id/approve')
  approveVendor(@Param('id', ParseIntPipe) id: number) {
    return this.vendorService.approveVendor(id);
  }
  @Delete(':id')
  deleteVendor(@Param('id', ParseIntPipe) id: number) {
    return this.vendorService.deleteVendor(id);
  }
  @Post(':vendorId/services')
  createService(
    @Param('vendorId', ParseIntPipe) vendorId: number,
    @Body() createServiceDto: CreateServiceDto,
  ) {
    return this.vendorService.createService(vendorId, createServiceDto);
  }
  @Get(':vendorId/services')
  getServicesByVendor(@Param('vendorId', ParseIntPipe) vendorId: number) {
    return this.vendorService.getServicesByVendor(vendorId);
  }
 
}
