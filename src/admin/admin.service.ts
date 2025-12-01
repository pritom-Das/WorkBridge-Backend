import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { updateCustomerStatusDto } from './Dtos/UpdateCustomerStatus.dto';
import { updateVendorStatus } from './Dtos/UpdateVendorStatus.dto';
import { GetVendorDto } from './Dtos/GetVendro.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminEntity } from './Enteties/admin.entity';
import { CreateAdminDto } from './Dtos/CreateAdmin.dto';
import { promises } from 'dns';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './Dtos/Login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(@InjectRepository(AdminEntity) private adminRepo: Repository<AdminEntity>,

     private readonly jwtService: JwtService,) {}

  // private customerRepo : Repository<CustomerEntity>,
  // private vendorRepo : Repository<VendorEntity>,
  // private serviceRepo : Repository<ServiceEntity>


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

private customers = [
  {
    "id": "1",
    "name": "Tanvir Alam",
    "email": "tanvir.alam@gmail.com",
    "role": "customer",
    "totalBookings": 5,
    "totalSpent": 4200,
    "status": "unblocked"
  },
  {
    "id": "2",
    "name": "Rima Khatun",
    "email": "rima.khatun@gmail.com",
    "role": "customer",
    "totalBookings": 2,
    "totalSpent": 1500,
    "status": "blocked"
  },
  {
    "id": "3",
    "name": "Shahriar Hossain",
    "email": "mim.akter@gmail.com",
    "role": "customer",
    "totalBookings": 8,
    "totalSpent": 7200,
    "status": "unblocked"
  },
  {
    "id": "4",
    "name": "Mim Akter",
    "email": "mim.akter@gmail.com",
    "role": "customer",
    "totalBookings": 1,
    "totalSpent": 300,
    "status": "blocked"
  }
]

//...........................login..................//

async login(loginDto: LoginDto): Promise<{ token: string; role: string }> {
    const { email, password } = loginDto;

    // Find admin by email
    const admin = await this.adminRepo.findOne({ where: { email } });
    if (!admin) throw new UnauthorizedException('Invalid credentials');

    console.log('Login attempt with password:', password);

    console.log('Stored Hash from DB:', admin.password);

    // Compare password
    const isMatch = await bcrypt.compare(password, admin.password);
    // 👇 DEBUG STEP 3: See the direct result of the comparison
    console.log('Bcrypt comparison result:', isMatch);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    // Generate JWT
    const payload = { id: admin.id, role: admin.role };
    const token = this.jwtService.sign(payload);

    return { token, role: admin.role };
  }

  // -------------------- Create Admin (Only Super Admin) --------------------

  // async createAdmin(createAdminDto: CreateAdminDto, creatorRole: string): Promise<AdminEntity> {
  //   if (creatorRole !== 'super-admin') {
  //     throw new UnauthorizedException('Only super admin can create admins');
  //   }

  //   const { name, email, password } = createAdminDto;

  //   // Check if email already exists
  //   const existingAdmin = await this.adminRepo.findOne({ where: { email } });
  //   if (existingAdmin) throw new BadRequestException('Email already exists');



  //   // Create and save new admin
  //   const admin = this.adminRepo.create({
  //     name,
  //     email,
  //     password,
  //     role: 'admin',
  //   });

  //   return await this.adminRepo.save(admin);
  // }

  // ...............another method........................//
  // -------------------- Create Admin (Only Super Admin) --------------------
async createAdmin(createAdminDto: CreateAdminDto, creator: AdminEntity): Promise<AdminEntity> {
  if (creator.role !== 'super-admin') {
    throw new UnauthorizedException('Only super admin can create admins');
  }

  const { name, email, password } = createAdminDto;

  // Check if email already exists
  const existingAdmin = await this.adminRepo.findOne({ where: { email } });
  if (existingAdmin) throw new BadRequestException('Email already exists');

  // Create and save new admin, set createdBy to super admin
  const admin = this.adminRepo.create({
    name,
    email,
    password,
    role: 'admin',
    createdBy: creator, // <-- set the super admin here
  });

  return await this.adminRepo.save(admin);
}



// ................customer service...................
// async getAllCustomers() {
//   return await this.customerRepo.find(); // returns all customers
// }


// ................vendor servicess....................

// async getAllVendors() {
//   return await this.vendorRepo.find(); // returns all vendors
// }


// // ...............services............
// async getAllServices() {
//   return await this.serviceRepo.find({ relations: ['vendor'] });
//   // relations included so you can see which vendor created each service
// }

// all the function of customer
findallcustomer(status?: 'blocked' | 'unblocked'){
  if(status){
    return this.customers.filter(customer => customer.status === status)
  }
return this.customers
}


findOnecustomer(id : string){
  const customer = this.customers.find(customer => customer.id === id)
  return customer
}

updateCustomerstatus(id:string, updatestatus:updateCustomerStatusDto){
  this.customers = this.customers.map(customer =>{
    if(customer.id === id){
      return {...customer,status:updatestatus.status}
    }
    return customer
  })
  return this.customers.find(customer => customer.id === id);
}

deleteAcustomer(id:string){
  return this.customers.filter(customer => customer.id !== id)
}
/////////////......................................................................................................../////////////////
// alll the functions of vendors
 findAllVendor(getvendordto : GetVendorDto){
  const {status} = getvendordto
  if(status){
    return this.vendors.filter(vn => vn.status === status)
  }
    return this.vendors
 }

findOneVendor(id:String){
    const vendor = this.vendors.find(vendor => vendor.id === id)
    return vendor;
}

getAllVendorRequest(){
    const vendorsRuests = this.vendors.filter((vendor) => vendor.status === 'pending')
    return vendorsRuests;
}

updateVendorStatus(id:string,updatestatus:updateVendorStatus){
        this.vendors = this.vendors.map((vendor) =>{
            if(vendor.id === id){
                return{...vendor,status:updatestatus.status}
            }
            return vendor;
        })
        return  this.vendors.find(vendor => vendor.id === id)
    }

 DeleteVendor(id:string){
    return this.vendors.filter((vendor) => vendor.id !== id)
 }   

// //  create admin 
//  async createAdmin (admindata : CreateAdminDto): Promise <AdminEntity>{
//   const newAdmin = this.adminRepository.create(admindata)
//   return await this.adminRepository.save(newAdmin)

//  }

//  get admin by name substring
// async findAdminByNameSubstring(substring: string): Promise<any> {
//   const admin = await this.adminRepository
//     .createQueryBuilder("admin")
//     .where("admin.name ILIKE :name", { name: `%${substring}%` })
//     .getMany();

//   if (admin.length === 0) {
//     return {
//       message: `No users found matching '${substring}'`,
//       data: [],
//     };
//   }

//   return {
//     message: "Users retrieved successfully",
//     data: admin,
//   };
// }

// remove admin by email
// async removeAdminByEmail(uuid: string): Promise<any> {
//   const admin = await this.adminRepository.findOne({ where: { uuid } });

//   if (!admin) {
//     return {
//       message: `No admin found with email '${uuid}'`,
//     };
//   }

//   await this.adminRepository.remove(admin);

//   return {
//     message: `Admin with email '${uuid}' has been removed successfully`,
//     deletedAdmin: admin
//   };
// }
// retrive admin by uuid
// async getAdminByUUID(uuid: string): Promise<any> {
//   const admin = await this.adminRepository.findOne({
//     where: { uuid },
//   });

//   if (!admin) {
//      return {
//       message: `No admin found with email '${uuid}'`,
//     };
  
//   }

//   return admin;
// }


}

// // async getActiveAdmins(): Promise<AdminEntity[]> {
//   return await this.adminRepository.find({
//     where: { status: true },
//   });
// }

