import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInfoEntity } from './Entity/userInfo.entity';
import { ServiceEntity } from './Entity/service.entity';
@Module({
  imports: [TypeOrmModule.forFeature([UserInfoEntity, ServiceEntity])],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
// localhost:3000/users/service/4/status
// {
//     "status":"poco"
// }
// localhost:3000/users/book-service
// {
//     "id":"7",s
//     "serviceName":"Dave ",
//     "category":"a@gmail.com",
//     "description":"Admin",
//     "price":1000,
//     "status":"active",
// eslint-disable-next-line no-irregular-whitespace
//     "rating":2.5
// }
// localhost:3000/users/add-user
// {
//     "id":"7",
//     "name":"Rahat",
//     "email":"r@aiub.edu",
//     "gender":"male",
//     "phoneNumber":"01334545443",
//     "role":"customer",
//     "password":"12312A"
// }
// eslint-disable-next-line prettier/prettier
// GET: localhost:3000/users/service