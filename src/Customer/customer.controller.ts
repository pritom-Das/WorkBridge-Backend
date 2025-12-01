/* eslint-disable prettier/prettier */
import { Body, Controller,Delete,Get,Put,Param, Patch, Post, UsePipes, ValidationPipe} from '@nestjs/common';// Delete, Get, 
import { CustomerService } from './customer.service';
import { LoginUserDto, RegisterUserDto, UpdatePhoneNumberDto } from './dto/customer.dto';//, UpdateServiceStatus
// import { BookServiceDto } from './dto/bookService.dto';
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post('register')//Post user need to add this here later
  @UsePipes(new ValidationPipe() )//validation pipe added here
  register(@Body() RegisterUser:RegisterUserDto)
  {
    return this.customerService.register(RegisterUser);
  }
  @Post('login')
  @UsePipes(new ValidationPipe() )
  login(@Body() loginUser:LoginUserDto)
  {
    return this.customerService.login(loginUser);
  }

  @Get('profile/:id')
  getProfile(@Param('id') id: string) 
  {
    return this.customerService.getProfile(id);
  }
  @Put('profile/:id/updateProfile')
  @UsePipes(new ValidationPipe() )
  updateProfile(@Param('id') id: string, @Body() updateUser: RegisterUserDto)
  {
    return this.customerService.updateProfile(id,updateUser);
  }
  @Delete('profile/delete/:id')//Delete user/:id
  delete(@Param('id')id:string) {
    return this.customerService.delete(id);
  }
  @Get('service')
  findAllService()
  {
    return this.customerService.findAllService();
  }
// @Get('service/:id')
// findOne2(@Param('id') id: string) {
//   return this.userService.findOne2(id);
// }
  // @Post('book-service')//Booking service later using post method
  // @UsePipes(new ValidationPipe() )//validation pipe added here
  // bookService(@Body() bookService:BookServiceDto)
  // {
  //   return this.userService.bookService(bookService);
  // }
  // @Get() //Get users //add here query where user role are vendors
  // findAll() {

  //   return this.customerService.findAll();
  // }
  // @Get('null-name')//Get user with null name
  // findNullName() {
  //   return this.customerService.findNullName();
  // }

// @Patch('update-phone/:id')
// @UsePipes(new ValidationPipe() )//validation pipe added here
// updatePhoneNumber(@Param('id')id:string,@Body()updatePhoneNumberDto: UpdatePhoneNumberDto)
// {
//   return this.customerService.updatePhoneNumber(id,updatePhoneNumberDto);
// }
//   @Delete('/delete/:id')//Delete user/:id
//   delete(@Param('id')id:string) {
//     return this.customerService.delete(id);
//   }
}
