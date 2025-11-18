/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdatePhoneNumberDto, UpdateServiceStatus } from './dto/user.dto';
import { BookServiceDto } from './dto/bookService.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInfoEntity } from './Entity/userInfo.entity';
import { ServiceEntity } from './Entity/service.entity';
import { IsNull, Repository } from 'typeorm';
 
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserInfoEntity)private readonly userRepo: Repository<UserInfoEntity>,
    @InjectRepository(ServiceEntity)private readonly serviceRepo: Repository<ServiceEntity>
  ) {}

//     private vendors = [
//   {
//     "id": "1",
//     "name": "Rafi Hasan",
//     "email": "rafi.hasan@gmail.com",
//     "role": "vendor",
//     "status": "pending",
//   },
//   {
//     "id": "2",
//     "name": "Nusrat Jahan",
//     "email": "nusrat.jahan@gmail.com",
//     "role": "vendor",
//     "status": "approved",
    
//   },
//   {
//     "id": "3",
//     "name": "Mehedi Rahman",
//     "email": "mehedi.dev@gmail.com",
//     "role": "vendor",
//     "status": "rejected",
  
//   }, 
//    {
//     "id": "4",
//     "name": "pritom das",
//     "email": "pritom@gmail.com",
//     "role": "vendor",
//     "status": "pending",
//   },
// ]

// private users = [
//   {
//     "id": "1",
//     "name": "Tanvir Alam",
//     "email": "tanvir.alam@gmail.com",
//     "gender":"male",
//     "phoneNumber": "01771111221",
//     "role": "customer",
//     "password":"12312E"
  
    
//   },
//   {
//     "id": "2",
//     "name": "Rima Khatun",
//     "email": "rima.khatun@gmail.com",
//     "gender":"female",
//     "phoneNumber": "017112331121",
//     "role": "customer",
//     "password":"12312D"
 
    
//   },
//   {
//     "id": "3",
//     "name": "Shahriar Hossain",
//     "email": "mim.akter@gmail.com",
//     "gender":"male",
//     "phoneNumber": "017112334421",
//     "role": "customer",
//     "password":"12312C"

    
//   },
//   {
//     "id": "4",
//     "name": "Mim Akter",
//     "email": "mim.akter@gmail.com",
//     "gender":"female",
//     "phoneNumber": "017112334421",
//     "role": "customer",
//     "password":"12312B"
   
   
//   }
// ]
// private service=[
//   {
//       id: "1",
//       serviceName: "Professional Home Cleaning",
//       category: "Home Services",
//       description: "Complete home cleaning including living room, kitchen, and bathrooms",
//       price: 2500,
//       status: "active",
//       rating: 4.8
//     },
//     {
//       id: "2",
//       serviceName: "Web Development",
//       category: "IT Services",
//       description: "Full-stack web development with React and Node.js",
//       price: 15000,
//       status: "active",
//       rating: 4.9
//     },
//     {
//       id: "3",
//       serviceName: "AC Repair & Maintenance",
//       category: "Repair & Maintenance",
//       description: "Professional AC repair, gas refill, and maintenance services",
//       price: 1200,
//       status: "active",
//       rating: 4.6
//     },
//     {
//       id: "4",
//       serviceName: "Graphic Design",
//       category: "Design & Creative",
//       description: "Logo design, business cards, and branding materials",
//       price: 3000,
//       status: "inactive",
//       rating: 4.7
//     },
//     {
//       id: "5",
//       serviceName: "Math Tutoring",
//       category: "Education",
//       description: "One-on-one math tutoring for high school students",
//       price: 500,
//       status: "active",
//       rating: 4.9
//     }
//   ];

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
  console.log(nullName);
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

async delete(id:string)//fix the logic here
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