/* eslint-disable prettier/prettier */
import { Injectable,ConflictException, NotFoundException,UnauthorizedException } from '@nestjs/common';
import { LoginUserDto, RegisterUserDto, UpdateUserDto } from './dto/customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerInfoEntity } from './Entity/customerInfo.entity';
import { Service } from '../vendor/service.entity';
import { Repository } from 'typeorm';
import { OrderDto } from './dto/order.dto';
import { OrderEntity } from './Entity/order.entity';
import { ReviewEntity } from './Entity/review.entity';
import { ReviewDto } from './dto/review.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
 
@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerInfoEntity)private readonly userRepo: Repository<CustomerInfoEntity>,
    @InjectRepository(Service)private readonly serviceRepo: Repository<Service>,
    @InjectRepository(OrderEntity)private readonly orderRepo: Repository<OrderEntity>,
    @InjectRepository(ReviewEntity)private readonly reviewRepo: Repository<ReviewEntity>,
    private jwtService: JwtService ,
 
   
  ) {}


async register(createUser: RegisterUserDto) {
  const existingUser= await this.userRepo.findOne({where:{email:createUser.email}});
  if(existingUser){
      throw new ConflictException('User with this email already exists');
    }
    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(createUser.password, salt);
    const user=this.userRepo.create({...createUser,password:hashed});
    return this.userRepo.save(user);
 
}

// async login(loginUser:LoginUserDto)
// {
//   const user= await this.userRepo.findOne({where:{email:loginUser.email}});
 
//    if (!user) {
//     throw new NotFoundException('User not found');
//   }
// const match= await bcrypt.compare(loginUser.password, user.password);
//  if(!match)
//  {
//   throw new UnauthorizedException('Invalid credentials');
//  }
//  const payload = { id: user.id, role: 'customer' };
 
//   return {
//     access_token: await this.jwtService.signAsync(payload),
//   };

// }

  // Login Logic for Task
  async login(data: LoginUserDto) {
    const user = await this.userRepo.findOne({ where: { email: data.email } });
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Creating the payload for the JWT
    const payload = { id: user.id, email: user.email, role: 'customer' };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }




async getProfile(id:string)
{
  const profile=await  this.userRepo.findOne({where:{id}});
  if(!profile)
  {
   throw new NotFoundException('User not found');
  }
  return profile;
}

async updateProfile(id:string,updateUser: UpdateUserDto)
{
  const user= await this.userRepo.findOne({where:{id}});  
  if(!user)
  {
    throw new NotFoundException('User not found');
  }
  user.name = updateUser.name;
  user.email = updateUser.email;
  user.password = updateUser.password;
  user.gender = updateUser.gender;
  user.phoneNumber = String(updateUser.phoneNumber);
  return this.userRepo.save(user);
}
async delete(id:string)
 {
  const delUser =await this.userRepo.findOne({where:{id}});
  if(!delUser)
  {
   throw new NotFoundException('User not found');
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
  if(services.length === 0)
  {
    throw new NotFoundException('No services found');
  }
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
    const customer = await this.userRepo.findOneBy({ id});
  if (!customer) {
    throw new NotFoundException('User not found');
  }
  const service = await this.serviceRepo.findOneBy({ 
      id: order.serviceId 
    });
      if (!service) {
        throw new NotFoundException("Service not found");
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

async reviewService(customerId: string, 
  serviceId: string, 
  review:ReviewDto )
{
    const customer = await this.userRepo.findOneBy({ id: customerId });
  if (!customer) {
    throw new NotFoundException('User not found');
  }
  const service = await this.serviceRepo.findOneBy({id: serviceId});
      if (!service) {
        throw new NotFoundException("Service not found");
      }
      const reView=this.reviewRepo.create({
        rating:review.rating,
        comment:review.comment,
        customer: customer,
        service:service,
      });
      return this.reviewRepo.save(reView);
}


async updateReview(id: string,review:ReviewDto)
{
  const existingReview = await this.reviewRepo.findOneBy({ id });
  if (!existingReview) {
    throw new NotFoundException('Review not found');
  }
  existingReview.rating = review.rating;
  existingReview.comment = review.comment;
  return this.reviewRepo.save(existingReview);
}
async deleteReview(id: string)
{
  const delReview = await this.reviewRepo.findOneBy({ id });
  if (!delReview) {
    throw new NotFoundException('Review not found');
  } else {
    await this.reviewRepo.delete(id);
    return 'Review deleted successfully';
}
}


  }