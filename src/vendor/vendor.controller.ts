import {Controller,Get,Post,Delete,Param,Body,Patch,Put, Query 
} from '@nestjs/common';
import { VendorService } from './vendor.service';
import { CreateServiceDto, UpdateProfileDto } from './Dto/vendor.dto';  

@Controller('vendors')
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}

  @Get('services')
  FindAllServices(@Query('category') category?: 'development' | 'design') {
    return this.vendorService.FindAllServices(category);
  }

  @Get('services/:id')
  getServiceById(@Param('id') id: string) {
    return this.vendorService.getServiceById(id);
  }

  @Delete('services/:id')
  deleteService(@Param('id') id: string) { 
    return this.vendorService.deleteService(id);
  }
   
  @Post('services/:vendorId/create')
  createService(
    @Param('vendorId') vendorId: string,
    @Body() createServiceDto: CreateServiceDto,
  ) { 
    return this.vendorService.createService(vendorId, createServiceDto);
  }
  @Get('profile')
    getVendorProfile() {
        return this.vendorService.getVendorProfile();
    }
  @Patch('profile/update/:id')
  updateVendorProfile(@Param('id') id: string,@Body() updateProfileDto: UpdateProfileDto, 
  ) 
  {
    return this.vendorService.updateVendorProfile(id, updateProfileDto);
  }

}
