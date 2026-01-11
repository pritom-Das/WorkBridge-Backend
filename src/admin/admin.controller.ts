    import { Body, ConflictException, Controller, Delete, Get, Param, Patch, Post, Query, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
    import { AdminService } from './admin.service';
import { updateCustomerStatusDto } from './Dtos/UpdateCustomerStatus.dto';
import { updateVendorStatus } from './Dtos/UpdateVendorStatus.dto';
import { GetVendorDto } from './Dtos/GetVendro.dto';
import { CreateAdminDto } from './Dtos/CreateAdmin.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { LoginDto } from './Dtos/Login.dto';
import { JwtAuthGuard } from './JwtAuth.guards';
import { use } from 'passport';
import type { Response } from 'express';



    @Controller('admin')
    export class AdminController {
     
        constructor(private readonly adminService:AdminService){}
    
        // -------------------- Super Admin Login --------------------
  @Post('super-login')
  async superAdminLogin(@Body() loginDto: LoginDto) {
    return this.adminService.login(loginDto);
  }

  // -------------------- Admin Login --------------------
  // @Post('login')
  // async adminLogin(@Body() loginDto: LoginDto) {
  //   return this.adminService.login(loginDto);
  // }
  @Post('login')
async adminLogin(
  @Body() loginDto: LoginDto,
  @Res({ passthrough: true }) res: Response
) {
  const { token, role } = await this.adminService.login(loginDto);

  res.cookie('access_token', token, {
    httpOnly: true,
    secure: false, // true in production (HTTPS)
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });

  return { message: 'Login successful', role };
}



@UseGuards(JwtAuthGuard)
@Post('create')
async createAdmin(@Body() createAdminDto: CreateAdminDto, @Req() req) {

  return this.adminService.createAdmin(createAdminDto, req.user);
}



//   ...........................customer management.....................//

// @UseGuards(JwtAuthGuard)
// @Get('customers')
// getAllCustomers() {
//   return this.adminService.getAllCustomers();
// }
@Get('customers')
@UseGuards(JwtAuthGuard)
getAllCustomers(@Req() req) {
  // console.log('Cookies:', req.cookies);
  // console.log('Headers:', req.headers);
  // console.log('User:', req.user);
  return this.adminService.getAllCustomers();
}

@UseGuards(JwtAuthGuard)
@Delete('customer/:id')
deleteCustomer(@Param('id') customerId: string) {
  return this.adminService.deleteCustomer(customerId);
}


// ......................vendor management .....................//

// get all vendors 
  @UseGuards(JwtAuthGuard)
  @Get('vendors')
  async getAllVendors() {
    return this.adminService.getAllVendors();
  }

// delete vendor by id 
  @UseGuards(JwtAuthGuard)
  @Delete('vendors/:id')
  async deleteVendor(@Param('id') id: string) {
    const vendorId = Number(id); 
    return this.adminService.deleteVendor(vendorId);
  }

// ..........................services................

@UseGuards(JwtAuthGuard)
@Patch('approve-service/:id')
approveService(@Param('id') serviceId: string, @Req() req) {
  return this.adminService.approveService(serviceId, req.user.id);
}

  @Get('pending-services')
  @UseGuards(JwtAuthGuard)
  async getPendingServices() {
    return this.adminService.getPendingServices();
  }
  @UseGuards(JwtAuthGuard) 
@Get('approved-services/:adminId')
getServicesApprovedByAdmin(@Param('adminId') adminId: string) {
  return this.adminService.getServicesApprovedByAdmin(adminId);

}
@UseGuards(JwtAuthGuard)
@Get('service/:id/approved-by')
getServiceApprovedBy(@Param('id') serviceId: string) {
  return this.adminService.getServiceApprovedBy(Number(serviceId));
}


    }
