import {Controller,Get,Post,Delete,Param,Body,Patch,Put, Query, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { VendorService } from './vendor.service';   
import { CreateVendorDto } from './Dto/create_vendor.dto';
import { LoginVendorDto, UpdateVendorDto } from './Dto/update.dto';
import { CreateServiceDto } from './Dto/create_service.dto';
import { CreateProfileDto } from './Dto/create_profile.dto';
import { UpdateProfileDto } from './Dto/update_profile.dto';
 

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
 
@Post(':vendorId/profile')
createProfile(
  @Param('vendorId', ParseIntPipe) vendorId: number,
  @Body() body: CreateProfileDto,
) {
  return this.vendorService.createProfile(vendorId, body);
}
 
@Put(':vendorId/profile')
updateProfile(
  @Param('vendorId', ParseIntPipe) vendorId: number,
  @Body() body: UpdateProfileDto,
) {
  return this.vendorService.updateProfile(vendorId, body);
}
 
@Get(':vendorId/profile')
getProfile(@Param('vendorId', ParseIntPipe) vendorId: number) {
  return this.vendorService.getProfile(vendorId);
}
@Post ('login')
login(@Body() body: LoginVendorDto) {
  return this.vendorService.loginVendor(body);
}
}
