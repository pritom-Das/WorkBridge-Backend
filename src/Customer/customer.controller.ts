/* eslint-disable prettier/prettier */
import { Body, Controller,Delete,Get,Param, Patch, Post, UsePipes, ValidationPipe} from '@nestjs/common';// Delete, Get, 
import { CustomerService } from './customer.service';
import { CreateUserDto, UpdatePhoneNumberDto } from './dto/customer.dto';//, UpdateServiceStatus
// import { BookServiceDto } from './dto/bookService.dto';
@Controller('users')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}
//   @Get('service')
// findAllService()
// {
//   console.log('Hello');
//   return this.userService.findAllService();
// }
// @Get('service/:id')
// findOne2(@Param('id') id: string) {
//   return this.userService.findOne2(id);
// }
//   @Get(':id')//Get user/:id
//   findOne(@Param('id')id:string) {
//     return this.userService.findOne(id);
//   }
// @Patch('service/:id/status')
// @UsePipes(new ValidationPipe() )//validation pipe added here
// updateServiceStatus(@Param('id')id:string,@Body()updateStatus:UpdateServiceStatus)
// {
//   return this.userService.updateServiceStatus(id,updateStatus);
// }
  // @Post('book-service')//Booking service later using post method
  // @UsePipes(new ValidationPipe() )//validation pipe added here
  // bookService(@Body() bookService:BookServiceDto)
  // {
  //   return this.userService.bookService(bookService);
  // }
  @Get() //Get users //add here query where user role are vendors
  findAll() {

    return this.customerService.findAll();
  }
  @Get('null-name')//Get user with null name
  findNullName() {
    return this.customerService.findNullName();
  }


  @Post('add-user')//Post user need to add this here later
  @UsePipes(new ValidationPipe() )//validation pipe added here
  create(@Body() createUser:CreateUserDto)
  {
    return this.customerService.create(createUser);
  }
@Patch('update-phone/:id')
@UsePipes(new ValidationPipe() )//validation pipe added here
updatePhoneNumber(@Param('id')id:string,@Body()updatePhoneNumberDto: UpdatePhoneNumberDto)
{
  return this.customerService.updatePhoneNumber(id,updatePhoneNumberDto);
}
  @Delete('/delete/:id')//Delete user/:id
  delete(@Param('id')id:string) {
    return this.customerService.delete(id);
  }
}
