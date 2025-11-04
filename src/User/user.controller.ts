import { Controller, Get, Post, Put, Delete, Patch } from '@nestjs/common';
import { Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';
import { LoginUserDto } from './dto/user-login.dto';
import { BookServiceDto  } from './dto/book-service.dto';
import { AddReviewDto } from './dto/add-review.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(): string[]{
    return this.userService.getUserList();
  }
  @Get('allServices')
  getAllService(): string {
    return this.userService.getAllService();
  }
  @Post('register')
  registerUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.registerUser(createUserDto);
  }
  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.userService.loginUser(loginUserDto);
  }
  @Put('profile/:userId')
  updateUserProfile(@Param('userId') userId: string, @Body() updateUserDto: CreateUserDto) {
    return this.userService.updateUserProfile(userId, updateUserDto);
  }
  @Post('services/:serviceId/book')
  bookService(@Param('serviceId') serviceId: string, @Body() bookServiceDto: BookServiceDto) {
    return this.userService.bookService(serviceId, bookServiceDto);
  }
  @Delete('bookings/:bookingId')
  cancelBooking(@Param('bookingId') bookingId: string) {
    return this.userService.cancelBooking(bookingId);
  }
  @Patch('services/:serviceId/status')
  updateServiceStatus(@Param('serviceId') serviceId: string, @Body() statusUpdate: any) {
    return this.userService.updateServiceStatus(serviceId, statusUpdate);
  }
}
