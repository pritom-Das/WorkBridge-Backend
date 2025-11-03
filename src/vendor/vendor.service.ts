import { Injectable } from '@nestjs/common';

@Injectable()
export class VendorService {
  getVendors(): string {
    return 'List of vendors';
  }
}