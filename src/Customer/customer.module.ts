import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerInfoEntity } from './Entity/customerInfo.entity';
import { Service } from '../vendor/service.entity';
import { JwtModule } from '@nestjs/jwt';
import { OrderEntity } from './Entity/order.entity';
import { ReviewEntity } from './Entity/review.entity';
import { PassportModule } from '@nestjs/passport';
@Module({
  imports: [TypeOrmModule.forFeature([CustomerInfoEntity,OrderEntity, ReviewEntity, Service]),PassportModule,
      JwtModule.register({
      secret: 'admin25801', 
      signOptions: { expiresIn: '1h' },
    }),
],

  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
