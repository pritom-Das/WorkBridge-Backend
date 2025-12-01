/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { LoginUserDto, RegisterUserDto, UpdatePhoneNumberDto } from './dto/customer.dto';
import { BookServiceDto } from './dto/bookService.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerInfoEntity } from './Entity/customerInfo.entity';
import { Service } from '../vendor/service.entity';
import { IsNull, Repository } from 'typeorm';
 
@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerInfoEntity)private readonly userRepo: Repository<CustomerInfoEntity>,
    @InjectRepository(Service)private readonly serviceRepo: Repository<Service>,
   
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

async updateProfile(id:string,updateUser: RegisterUserDto)
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

//   findOne2(id:string) 
//  {
//   const service = this.service.find(service=>service.id===id);
//   return service;
//  }
// findAllService()
// {
//   return this.service;
// }

// async findNullName() 
//  {
//   const nullName = await this.userRepo.find({where:[{name:IsNull()},{name:''} ]});
  
//   return nullName;
//  }

// async updateServiceStatus(id: string, updateStatus: UpdateServiceStatus) {
//   const status=await this.serviceRepo.findOne({where:{id}});
//   if(!status)
//   {
//     return 'Service not found';
//   }
//    status.status = updateStatus.status;
//   return this.serviceRepo.save(status);

// }
// bookService(bookService:BookServiceDto)
// {
//   const user=this.serviceRepo.create(bookService);
//   return this.serviceRepo.save(user);
// }

// async updatePhoneNumber(id:string,updatePhoneNumberDto: UpdatePhoneNumberDto)
// {
//   const phoneNumber= await this.userRepo.findOne({where:{name:id}});
//   if(!phoneNumber)
//   {
//     return 'User not found';
//   }
//   phoneNumber.phoneNumber=Number(updatePhoneNumberDto.phoneNumber);
  
//   return this.userRepo.save(phoneNumber);
// }


  }