import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
// localhost:3000/users/service/4/status
// {
//     "status":"poco"
// }
// localhost:3000/users/book-service
// {
//     "id":"7",
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