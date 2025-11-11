/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateServiceStatus } from './dto/user.dto';
import { BookServiceDto } from './dto/bookService.dto';
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get() //Get users //add here query where user role are vendors
  findAll(@Param('role') role:string) {
    
    return this.userService.findAll(role);
  }
  
  @Get('service')
findAllService()
{
  console.log('Hello');
  return this.userService.findAllService();
}
  @Get(':id')//Get user/:id
  findOne(@Param('id')id:string) {
    return this.userService.findOne(id);
  }

@Get('service/:id')
findOne2(@Param('id') id: string) {
  return this.userService.findOne2(id);
}




//add service status update later using patch method
@Patch('service/:id/status')
@UsePipes(new ValidationPipe() )//validation pipe added here
updateServiceStatus(@Param('id')id:string,@Body()updateStatus:UpdateServiceStatus)
{
  return this.userService.updateServiceStatus(id,updateStatus);
}

  @Post('book-service')//Booking service later using post method
  @UsePipes(new ValidationPipe() )//validation pipe added here
  bookService(@Body() bookService:BookServiceDto)
  {
    return this.userService.bookService(bookService);
  }

  @Post('add-user')//Post user need to add this here later
  @UsePipes(new ValidationPipe() )//validation pipe added here
  create(@Body() createUser:CreateUserDto)
  {
    return this.userService.create(createUser);
  }

  @Delete(':id')//Delete user/:id
  delete(@Param('id')id:string) {
    return this.userService.delete(id);
  }
}
