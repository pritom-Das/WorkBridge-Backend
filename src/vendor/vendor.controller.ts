import { Controller, Get } from '@nestjs/common';
import { VendorService } from './vendor.service';

@Controller('vendors')
export class VendorController {
    constructor(private readonly vendorService: VendorService) {}
    
    @Get()
    getVendors(): string {
        return this.vendorService.getVendors();
    }


}