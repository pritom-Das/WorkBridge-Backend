import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { LoginUserDto } from './dto/user-login.dto';
import { BookServiceDto  } from './dto/book-service.dto';
import { AddReviewDto } from './dto/add-review.dto';
@Injectable()
export class UserService {
  getUserList(): string[] {
    return ['Alice', 'Bob', 'Charlie'];
  }
  getAllService(): string {
    return 'List of all services';
  }
  registerUser(createUserDto: CreateUserDto) {
    return { message: 'User registered successfully', user: createUserDto };
  }
  loginUser(loginUserDto: LoginUserDto) {
    return { message: 'User logged in successfully', user: loginUserDto };
  }

  updateUserProfile(userId: string, updateUserDto: CreateUserDto) {
    return { message: 'User profile updated', userId, user: updateUserDto };
  }
  bookService(serviceId: string, bookServiceDto: BookServiceDto) {
    return { message: 'Service booked', serviceId, booking: bookServiceDto };
  }
  cancelBooking(bookingId: string) {
    return { message: 'Booking cancelled', bookingId };
  }
  updateServiceStatus(serviceId: string, statusUpdate: any) {
    return { message: 'Service status updated', serviceId, status: statusUpdate };
  }
}
