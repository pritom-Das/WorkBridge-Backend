import { Controller, Get, Post, Delete, Param, Body, Patch, Put, ParseIntPipe, UseGuards, Res } from '@nestjs/common';
import type { Response } from 'express'; 
import { VendorService } from './vendor.service';    
import { CreateVendorDto } from './Dto/create_vendor.dto';
import { UpdateVendorDto } from './Dto/update.dto';
import { CreateServiceDto } from './Dto/create_service.dto';
import { LoginVendorDto } from './Dto/login.dto';
// 1. IMPORT AuthGuard from passport directly
import { AuthGuard } from '@nestjs/passport'; 

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
      secure: false, // Set to true if using HTTPS
      sameSite: 'lax',
      maxAge: 3600000,  
    });

    // Returns ID so frontend can save it
    return { 
      message: 'Login successful',
      id: result.vendor.id,
      name: result.vendor.name
    };
  }
  // Add this inside your VendorController class

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('token', {
      httpOnly: true,
      secure: false, // Match your login settings
      sameSite: 'lax',
    });
    
    return { message: 'Logged out successfully' };
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
  // 2. UPDATED: Uses 'vendor-jwt' to match your new Strategy name
  @UseGuards(AuthGuard('vendor-jwt'))
  @Post(':vendorId/services')
  createService(
    @Param('vendorId', ParseIntPipe) vendorId: number,
    @Body() createServiceDto: CreateServiceDto,
  ) {
    return this.vendorService.createService(vendorId, createServiceDto);
  }
  
  // PROTECTED: Use this for the Dashboard data
  // 3. UPDATED: Uses 'vendor-jwt' here too
  @UseGuards(AuthGuard('vendor-jwt'))
  @Get(':vendorId/profile')
  getProfile(@Param('vendorId', ParseIntPipe) vendorId: number) {
    return this.vendorService.getProfile(vendorId);
  }

  // This can be public or protected depending on your needs
  @Get(':vendorId/services')
  getServicesByVendor(@Param('vendorId', ParseIntPipe) vendorId: number) {
    return this.vendorService.getServicesByVendor(vendorId);
  }
}