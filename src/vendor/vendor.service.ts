import { Injectable } from '@nestjs/common';
import { CreateServiceDto, UpdateServiceDto ,UpdateProfileDto} from './Dto/vendor.dto';

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
  getServiceById(id: number): string {
    return `Details of service with ID: ${id}`;
  }
  deleteService(id: number): string {
    return `Service with ID: ${id} has been deleted.`;
  }
  updateService(id: number, updateServiceDto: UpdateServiceDto): string {
    return `Service with ID: ${id} has been updated.`;
  }
  updateProfile(id: number, updateProfileDto: UpdateProfileDto): string {
    return `Profile with ID: ${id} has been updated.`;
}
}