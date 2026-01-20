import { Module } from '@nestjs/common';
import { VendorController } from './vendor.controller';
import { VendorService } from './vendor.service'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vendor } from './vendor.entity';
import { Service } from './service.entity';
import { VendorProfile } from './vendor_profile.entity';
import { JwtModule } from '@nestjs/jwt';
import { PusherService } from 'src/Notification/pusher.service';

@Module({
  imports: [TypeOrmModule.forFeature([Vendor, Service, VendorProfile]),
  JwtModule.register({
      secret: 'YOUR_SECRET_KEY',
      signOptions: { expiresIn: '1d' },
    }),
],
  controllers: [VendorController],
  providers: [VendorService, PusherService],
})
export class VendorModule {}
