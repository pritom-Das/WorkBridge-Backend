import { Module } from '@nestjs/common';
import { VendorController } from './vendor.controller';
import { VendorService } from './vendor.service'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vendor } from './vendor.entity';
import { Service } from './service.entity'; 
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './JwtStrategyVendor';  
import { VendorProfile } from './vendor_profile.entity';

@Module({
  imports: [ 
    TypeOrmModule.forFeature([Vendor, Service,VendorProfile]),
    PassportModule,
    JwtModule.register({
      secret: 'admin25801', 
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [VendorController], 
  providers: [VendorService, JwtStrategy], 
})
export class VendorModule {}