/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdatePhoneNumberDto, UpdateServiceStatus } from './dto/customer.dto';
import { BookServiceDto } from './dto/bookService.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInfoEntity } from './Entity/userInfo.entity';
import { ServiceEntity } from './Entity/service.entity';
import { IsNull, Repository } from 'typeorm';
 
@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(UserInfoEntity)private readonly userRepo: Repository<UserInfoEntity>,
    @InjectRepository(ServiceEntity)private readonly serviceRepo: Repository<ServiceEntity>
  ) {}

 findAll()
 {
  return this.userRepo.find();
 }

//  findOne(id:string) 
//  {
//   const user = this.users.find(user=>user.id===id);
//   return user;
//  }

//   findOne2(id:string) 
//  {
//   const service = this.service.find(service=>service.id===id);
//   return service;
//  }
// findAllService()
// {
//   return this.service;
// }
async findNullName() 
 {
  const nullName = await this.userRepo.find({where:[{name:IsNull()},{name:''} ]});
  
  return nullName;
 }
async updateServiceStatus(id: string, updateStatus: UpdateServiceStatus) {
  const status=await this.serviceRepo.findOne({where:{id}});
  if(!status)
  {
    return 'Service not found';
  }
   status.status = updateStatus.status;
  return this.serviceRepo.save(status);

}
bookService(bookService:BookServiceDto)
{
  const user=this.serviceRepo.create(bookService);
  return this.serviceRepo.save(user);
}
create(createUser: CreateUserDto) {
  
  // const user=this.userRepo.create(createUser);
  const user = this.userRepo.create({
    ...createUser,
    phoneNumber: Number(createUser.phoneNumber)
  });
  return this.userRepo.save(user);
}

async updatePhoneNumber(id:string,updatePhoneNumberDto: UpdatePhoneNumberDto)
{
  const phoneNumber= await this.userRepo.findOne({where:{name:id}});
  if(!phoneNumber)
  {
    return 'User not found';
  }
  phoneNumber.phoneNumber=Number(updatePhoneNumberDto.phoneNumber);
  
  return this.userRepo.save(phoneNumber);
}

async delete(id:string)
 {
  const delUser =await this.userRepo.findOne({where:{id}});
  if(!delUser)
  {
    return 'User not found';
  }
  else
  {
    await this.userRepo.delete(id);
    return 'User deleted successfully';  
  }
}
  }