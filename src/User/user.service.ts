/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateServiceStatus } from './dto/user.dto';
import { BookServiceDto } from './dto/bookService.dto';

@Injectable()
export class UserService {
    private vendors = [
  {
    "id": "1",
    "name": "Rafi Hasan",
    "email": "rafi.hasan@gmail.com",
    "role": "vendor",
    "status": "pending",
  },
  {
    "id": "2",
    "name": "Nusrat Jahan",
    "email": "nusrat.jahan@gmail.com",
    "role": "vendor",
    "status": "approved",
    
  },
  {
    "id": "3",
    "name": "Mehedi Rahman",
    "email": "mehedi.dev@gmail.com",
    "role": "vendor",
    "status": "rejected",
  
  }, 
   {
    "id": "4",
    "name": "pritom das",
    "email": "pritom@gmail.com",
    "role": "vendor",
    "status": "pending",
  },
]

private users = [
  {
    "id": "1",
    "name": "Tanvir Alam",
    "email": "tanvir.alam@gmail.com",
    "gender":"male",
    "phoneNumber": "01771111221",
    "role": "customer",
    "password":"12312E"
  
    
  },
  {
    "id": "2",
    "name": "Rima Khatun",
    "email": "rima.khatun@gmail.com",
    "gender":"female",
    "phoneNumber": "017112331121",
    "role": "customer",
    "password":"12312D"
 
    
  },
  {
    "id": "3",
    "name": "Shahriar Hossain",
    "email": "mim.akter@gmail.com",
    "gender":"male",
    "phoneNumber": "017112334421",
    "role": "customer",
    "password":"12312C"

    
  },
  {
    "id": "4",
    "name": "Mim Akter",
    "email": "mim.akter@gmail.com",
    "gender":"female",
    "phoneNumber": "017112334421",
    "role": "customer",
    "password":"12312B"
   
   
  }
]
private service=[
  {
      id: "1",
      serviceName: "Professional Home Cleaning",
      category: "Home Services",
      description: "Complete home cleaning including living room, kitchen, and bathrooms",
      price: 2500,
      status: "active",
      rating: 4.8
    },
    {
      id: "2",
      serviceName: "Web Development",
      category: "IT Services",
      description: "Full-stack web development with React and Node.js",
      price: 15000,
      status: "active",
      rating: 4.9
    },
    {
      id: "3",
      serviceName: "AC Repair & Maintenance",
      category: "Repair & Maintenance",
      description: "Professional AC repair, gas refill, and maintenance services",
      price: 1200,
      status: "active",
      rating: 4.6
    },
    {
      id: "4",
      serviceName: "Graphic Design",
      category: "Design & Creative",
      description: "Logo design, business cards, and branding materials",
      price: 3000,
      status: "inactive",
      rating: 4.7
    },
    {
      id: "5",
      serviceName: "Math Tutoring",
      category: "Education",
      description: "One-on-one math tutoring for high school students",
      price: 500,
      status: "active",
      rating: 4.9
    }
  ];

 findAll(role?:string)
 {
  if(role)
  {
    return this.users.filter(user=>user.role===role)

  }
  return this.users
 }

 findOne(id:string) 
 {
  const user = this.users.find(user=>user.id===id);
  return user;
 }

  findOne2(id:string) 
 {
  const service = this.service.find(service=>service.id===id);
  return service;
 }
findAllService()
{
  return this.service;
}
 delete(id:string)//fix the logic here
 {
  const service = this.service.filter(service=>service.id!==id);
  return service;
 }
updateServiceStatus(id: string, updateStatus: UpdateServiceStatus) {
  
  this.service = this.service.map(service => {
    if (service.id === id) {
      return { ...service, status: updateStatus.status }
    }
    return service;
  });
  return this.service.find(service => service.id === id);
}
bookService(bookService:BookServiceDto)
{
 const book= {...bookService};
 this.service.push(bookService);
  return book;
}
create(createUser: CreateUserDto) {
  const user={...createUser};
  this.users.push(createUser);
  return user;
}
  }