import { Controller, Get, Post, Delete, Param, Body, Patch, Put, ParseIntPipe, UseGuards, Res } from '@nestjs/common';
import type { Response } from 'express'; 
import { VendorService } from './vendor.service';   
import { CreateVendorDto } from './Dto/create_vendor.dto';
import {  UpdateVendorDto } from './Dto/update.dto';
import { CreateServiceDto } from './Dto/create_service.dto';
import { JwtAuthGuard } from '../admin/JwtAuth.guards';  
import { LoginVendorDto } from './Dto/login.dto';

@Controller('vendors')
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}

  // Registration - Public
  @Post()
  createVendor(@Body() body: CreateVendorDto){
    return this.vendorService.createVendor(body);
  }

  // Login - Public (Sets httpOnly Cookie)
  @Post('login')
  async login(@Body() body: LoginVendorDto, @Res({ passthrough: true }) res: Response) {
    const result = await this.vendorService.loginVendor(body);
    
    
    res.cookie('token', result.access_token, {
      httpOnly: true,  
      secure: false,   
      sameSite: 'lax',
      maxAge: 3600000,  
    });

    return { message: 'Login successful' };
  }

  @Get()
  getAllVendors(){
    return this.vendorService.getAllVendors();
  }

  @Get(':id')
  getVendor(@Param('id', ParseIntPipe) id: number){
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

  // PROTECTED: Only logged in Vendors can create services
  @UseGuards(JwtAuthGuard)
  @Post(':vendorId/services')
  createService(
    @Param('vendorId', ParseIntPipe) vendorId: number,
    @Body() createServiceDto: CreateServiceDto,
  ) {
    return this.vendorService.createService(vendorId, createServiceDto);
  }
  
  // PROTECTED: Use this for the Dashboard data
  @UseGuards(JwtAuthGuard)
  @Get(':vendorId/profile')
  getProfile(@Param('vendorId', ParseIntPipe) vendorId: number) {
    return this.vendorService.getProfile(vendorId);
  }

  @Get(':vendorId/services')
  getServicesByVendor(@Param('vendorId', ParseIntPipe) vendorId: number) {
    return this.vendorService.getServicesByVendor(vendorId);
  }
}
