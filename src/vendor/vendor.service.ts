import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './Dto/vendor.dto';

@Injectable()
export class VendorService {
  getVendors(): string {
    return 'List of vendors';
  }
  getAllServices(): string {
    return 'List of vendor services';
  }
  addService(createServiceDto: CreateServiceDto) {
    const { title, category, description, price } = createServiceDto;
     return `Service titled ${title} in category ${category} with price ${price} has been added.`;
  }
}