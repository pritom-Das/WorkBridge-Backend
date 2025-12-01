import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerInfoEntity } from './Entity/customerInfo.entity';
import { Service } from '../vendor/service.entity';
@Module({
  imports: [TypeOrmModule.forFeature([CustomerInfoEntity, Service])],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
