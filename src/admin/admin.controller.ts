    import { Body, ConflictException, Controller, Delete, Get, Param, Patch, Post, Query, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
    import { AdminService } from './admin.service';
import { updateCustomerStatusDto } from './Dtos/UpdateCustomerStatus.dto';
import { updateVendorStatus } from './Dtos/UpdateVendorStatus.dto';
import { GetVendorDto } from './Dtos/GetVendro.dto';
import { CreateAdminDto } from './Dtos/CreateAdmin.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { LoginDto } from './Dtos/Login.dto';
import { JwtAuthGuard } from './JwtAuth.guards';


    @Controller('admin')
    export class AdminController {
        constructor(private readonly adminService:AdminService){}
    
        // -------------------- Super Admin Login --------------------
  @Post('super-login')
  async superAdminLogin(@Body() loginDto: LoginDto) {
    return this.adminService.login(loginDto);
  }

  // -------------------- Admin Login --------------------
  @Post('login')
  async adminLogin(@Body() loginDto: LoginDto) {
    return this.adminService.login(loginDto);
  }

  // -------------------- Create Admin (Only Super Admin) --------------------
//   @UseGuards(JwtAuthGuard)
//   @Post('create')
//   async createAdmin(@Body() createAdminDto: CreateAdminDto, @Req() req) {
//     // req.user is populated by JwtStrategy
//     return this.adminService.createAdmin(createAdminDto, req.user.role);
//   }
@UseGuards(JwtAuthGuard)
@Post('create')
async createAdmin(@Body() createAdminDto: CreateAdminDto, @Req() req) {
  // req.user should contain the whole super admin entity, not just role
  return this.adminService.createAdmin(createAdminDto, req.user);
}



//   ...........................customer management.....................//

// @UseGuards(JwtAuthGuard)
// @Get('customers')
// async getAllCustomers() {
//   return this.adminService.getAllCustomers();
// }

// ......................vendor management .....................//

// @UseGuards(JwtAuthGuard)
// @Get('vendors')
// async getAllVendors() {
//   return this.adminService.getAllVendors();
// }


// ..........................services................
// @UseGuards(JwtAuthGuard)
// @Get('services')
// async getAllServices() {
//   return this.adminService.getAllServices();
// }








    // get all the customers
    @Get('customers')
    findallCustomer(@Query('status') status?: 'blocked' | 'unblocked'){
        return this.adminService.findallcustomer(status)
    }
    // get all the customers by id
    @Get('customers/:id')
    findOneCustomer(@Param('id') id:string){
         return this.adminService.findOnecustomer(id)
    }

    @Delete('customers/:id')
    DeleteCustomer(@Param('id') id : string){
       return this.adminService.findOnecustomer(id)
    }

    @Patch('customers/:id/updatestatus')
    updateCustomerStatus(@Param('id') id:string,@Body() updateStatus:updateCustomerStatusDto ){
        return this.adminService.updateCustomerstatus(id,updateStatus)
    }

    @Delete('/customers:id')
    deleteAcustomer(@Param('id') id:string){
        return this.adminService.deleteAcustomer(id)
    }
   //............................................vendors.......................................................//


   
    // get admin by namesubstring 
//    @Get('search')
// async searchUsers(@Query('name') name: string) {
//   return this.adminService.findAdminByNameSubstring(name);
// }

// retrive admin by uuid
// @Get('uuid/:uuid')
// getAdminByUUID(@Param('uuid') uuid: string) {
//   return this.adminService.getAdminByUUID(uuid);
// }
//   remove admin by email
// @Delete("remove/:uuid")
// async removeAdmin(@Param("uuid") uuid: string) {
//   return this.adminService.removeAdminByEmail(uuid);
// }

}

// @Get('active')
// async getActiveAdmins() {
//   return this.adminService.getActiveAdmins();
// }