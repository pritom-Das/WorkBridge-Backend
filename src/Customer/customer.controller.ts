/* eslint-disable prettier/prettier */
import { Body, Controller,Delete,Get,Put,Param, Patch, Post, UsePipes, ValidationPipe} from '@nestjs/common';// Delete, Get, 
import { CustomerService } from './customer.service';
import { LoginUserDto, RegisterUserDto, UpdateUserDto } from './dto/customer.dto';//, UpdateServiceStatus
import { OrderDto } from './dto/order.dto';
import { ReviewDto } from './dto/review.dto';
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
  updateProfile(@Param('id') id: string, @Body() updateUser:UpdateUserDto)
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
  @Get('service/:id')
  findOne(@Param('id') id: string) 
 {
   return this.customerService.findOne(id);
 }


 @Post('review/service/:id')
  @UsePipes(new ValidationPipe() )
  reviewService(@Param('id') id: string, @Body() review:ReviewDto)
  {
    return this.customerService.reviewService(id, review);
  }

  @Get('order/:id')
  getOrders(@Param('id') id: string)
  {
    return this.customerService.getOrders(id);
  }

  @Post('order/:id')
  @UsePipes(new ValidationPipe() )//validation pipe added here
  orderService(@Param('id') id: string, @Body() order:OrderDto)
  {
    return this.customerService.orderService(id, order);
  }


  @Put('review/:id/update')
  @UsePipes(new ValidationPipe() )
  updateReview(@Param('id') id: string, @Body() review:ReviewDto)
  {
    return this.customerService.updateReview(id,review);
  }

  @Delete('review/:id')
  deleteReview(@Param('id')id:string) {
    return this.customerService.deleteReview(id);
  }

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
