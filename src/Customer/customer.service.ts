/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { LoginUserDto, RegisterUserDto, UpdateUserDto } from './dto/customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerInfoEntity } from './Entity/customerInfo.entity';
import { Service } from '../vendor/service.entity';
import { Repository } from 'typeorm';
import { OrderDto } from './dto/order.dto';
import { OrderEntity } from './Entity/order.entitiy';
import { ReviewEntity } from './Entity/review.entity';
import { ReviewDto } from './dto/review.dto';
 
@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerInfoEntity)private readonly userRepo: Repository<CustomerInfoEntity>,
    @InjectRepository(Service)private readonly serviceRepo: Repository<Service>,
    @InjectRepository(OrderEntity)private readonly orderRepo: Repository<OrderEntity>,
    @InjectRepository(ReviewEntity)private readonly reviewRepo: Repository<ReviewEntity>,
   
  ) {}

register(createUser: RegisterUserDto) {
  const user = this.userRepo.create({
    ...createUser,
    phoneNumber: Number(createUser.phoneNumber)
  });
  return this.userRepo.save(user);
}

async login(loginUser:LoginUserDto)
{
  const user= await this.userRepo.findOne({where:{name:loginUser.name,password:loginUser.password}});
 
  if (!user) {
    return "User not found";
  }
  //change this part for hashed password later
  if (user.password !== loginUser.password) {
    return "Invalid password";
  }
  //change this part for hashed password later
    return {
    message: "Login successful",
    user: user,
  };

}

async getProfile(id:string)
{
  const profile=await  this.userRepo.findOne({where:{id}});
  if(!profile)
  {
    return 'User not found';//Throw not found exception later
  }
  return profile;
}

async updateProfile(id:string,updateUser: UpdateUserDto)
{
  const user= await this.userRepo.findOne({where:{id}});  
  if(!user)
  {
    return 'User not found';//Throw not found exception later
  }
  user.name = updateUser.name;
  user.email = updateUser.email;
  user.password = updateUser.password;
  user.gender = updateUser.gender;
  user.phoneNumber = Number(updateUser.phoneNumber);
  return this.userRepo.save(user);
}
async delete(id:string)
 {
  const delUser =await this.userRepo.findOne({where:{id}});
  if(!delUser)
  {
    return 'User not found';//Throw not found exception later
  }
  else
  {
    await this.userRepo.delete(id);
    return 'User deleted successfully';  
  }
}

async findAllService()
{
  const services=await this.serviceRepo.find({where:{isApproved: true}});
  return services;
}

async findOne(id:string) 
 {
  const service =await this.serviceRepo.findOneBy({id});
  return service;
 }

//Order
async orderService(id: string,order:OrderDto):Promise<OrderEntity>
{
    const customer = await this.userRepo.findOneBy({ id: id });
  if (!customer) {
    throw new Error('Customer not found');
  }
  const service = await this.serviceRepo.findOneBy({ 
      id: order.serviceId 
    });
      if (!service) {
        throw new Error("Service not found");
      }
  const totalPrice=service.price * order.quantity;
  const newOrder = new OrderEntity();
    newOrder.customer = customer;  
    newOrder.service = service;    
    newOrder.quantity = order.quantity;
    newOrder.totalPrice = totalPrice;
    return this.orderRepo.save(newOrder);
}
//not sure
async getOrders(id: string)
{
  const orders = await this.orderRepo.find({where:{customer: {id}}});
  return orders;
}

//Review 
async reviewService(id: string,review:ReviewDto)
{
  const service = await this.serviceRepo.findOneBy({id});
      if (!service) {
        throw new Error("Service not found");
      }
      const reView=this.reviewRepo.create({
        rating:review.rating,
        comment:review.comment,
        service:service,
      });
      return this.reviewRepo.save(reView);
}
async updateReview(id: string,review:ReviewDto)
{
  const existingReview = await this.reviewRepo.findOneBy({ id });
  if (!existingReview) {
    return 'Review not found'; // Throw not found exception later
  }
  existingReview.rating = review.rating;
  existingReview.comment = review.comment;
  return this.reviewRepo.save(existingReview);
}
async deleteReview(id: string)
{
  const delReview = await this.reviewRepo.findOneBy({ id });
  if (!delReview) {
    return 'Review not found'; // Throw not found exception later
  } else {
    await this.reviewRepo.delete(id);
    return 'Review deleted successfully';
}
}


  }