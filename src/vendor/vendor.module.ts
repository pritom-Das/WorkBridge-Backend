import { Module } from '@nestjs/common';
import { VendorController } from './vendor.controller';
import { VendorService } from './vendor.service';
import { VendorEntity } from './vendor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([VendorEntity])],
  controllers: [VendorController],
  providers: [VendorService],
})
export class VendorModule {}
