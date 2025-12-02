import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerInfoEntity } from './Entity/customerInfo.entity';
import { Service } from '../vendor/service.entity';
import { JwtModule } from '@nestjs/jwt';
import { OrderEntity } from './Entity/order.entity';
import { ReviewEntity } from './Entity/review.entity';
@Module({
  imports: [TypeOrmModule.forFeature([CustomerInfoEntity,OrderEntity, ReviewEntity, Service]),
      JwtModule.register({
      secret: 'YOUR_SECRET_KEY',
      signOptions: { expiresIn: '1d' },
    }),
],

  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
