import { Module } from '@nestjs/common';
import { VendorController } from './vendor.controller';
import { VendorService } from './vendor.service'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vendor } from './vendor.entity';
import { Service } from './service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vendor, Service])],
  controllers: [VendorController],
  providers: [VendorService],
})
export class VendorModule {}
