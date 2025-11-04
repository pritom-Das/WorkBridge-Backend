    import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
    import { AdminService } from './admin.service';
import { updateCustomerStatusDto } from './Dtos/UpdateCustomerStatus.dto';
import { updateVendorStatus } from './Dtos/UpdateVendorStatus.dto';
import { GetVendorDto } from './Dtos/GetVendro.dto';
import { CreateAdminDto } from './Dtos/CreateAdmin,dto';
    // import path from 'path';


    @Controller('admin')
    export class AdminController {
        constructor(private readonly adminService:AdminService){}

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


    @Get("vendors")
    findAllVendor(@Query() getvendordto:GetVendorDto){
        return this.adminService.findAllVendor(getvendordto)
    
    }


    @Get('vendors/:id')
    findOneVendor(@Param('id') id:string){
    return this.adminService.findOneVendor(id)
    }

    @Patch("vendors/:id/updatestatus")
    updateVendorStatus(@Param('id') id:string, @Body() updateStatus:updateVendorStatus){
        return this.adminService.updateVendorStatus(id,updateStatus)

    }

   

    @Get('vendor-request')
    getAllVendorRequest(){
        return this.adminService.getAllVendorRequest()
    }


    @Post('add-admin')
    addAdmin(@Body() createadmin:CreateAdminDto){
        return createadmin;
    }

    }
