import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity } from './Enteties/admin.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { Service } from 'src/vendor/service.entity';
import { Vendor } from 'src/vendor/vendor.entity';
import { CustomerInfoEntity } from 'src/Customer/Entity/customerInfo.entity';

@Module({
  imports:[TypeOrmModule.forFeature([AdminEntity,Service,Vendor,CustomerInfoEntity]),PassportModule,
    JwtModule.register({
      secret: 'admin25801', 
      signOptions: { expiresIn: '1h' },
    }),],
  providers: [AdminService,JwtStrategy],
  controllers:[AdminController]
})
export class AdminModule {}
