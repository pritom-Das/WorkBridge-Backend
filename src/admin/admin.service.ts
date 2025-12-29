import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
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
import { Service } from 'src/vendor/service.entity';
import { Vendor } from 'src/vendor/vendor.entity';
import { CustomerInfoEntity } from 'src/Customer/Entity/customerInfo.entity';

@Injectable()
export class AdminService {
  constructor(@InjectRepository(AdminEntity) private adminRepo: Repository<AdminEntity>,
    @InjectRepository(Service) private serviceRepo: Repository<Service>,
    @InjectRepository(Vendor) private vendorRepo: Repository<Vendor>,
    @InjectRepository(CustomerInfoEntity) private customerRepository : Repository<CustomerInfoEntity>,
     private readonly jwtService: JwtService,) {}

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
    createdBy: creator, 
  });

  return await this.adminRepo.save(admin);
}



// ................customer service...................
async getAllCustomers() {
  return this.customerRepository.find();
}

async deleteCustomer(customerId: string) {
  const customer = await this.customerRepository.findOne({
    where: { id: customerId }
  });

  if (!customer) {
    throw new NotFoundException('Customer not found');
  }

  return this.customerRepository.remove(customer);
}



// ................vendor servicess....................

// -------------------- Get All Vendors --------------------
  async getAllVendors(): Promise<Vendor[]> {
    return this.vendorRepo.find({
      relations: ['services'], // include services if needed
    });
  }

  // -------------------- Delete Vendor By ID --------------------
  async deleteVendor(vendorId: number): Promise<{ message: string }> {
    const vendor = await this.vendorRepo.findOne({ where: { id: vendorId } });
    if (!vendor) throw new NotFoundException('Vendor not found');

    await this.vendorRepo.remove(vendor);
    return { message: `Vendor with id ${vendorId} has been deleted.` };
  }


// // ...............services management............

async approveService(serviceId: string, adminId: string) {
  const id = Number(serviceId);

  const service = await this.serviceRepo.findOne({
    where: { id },
  });

  if (!service) {
    throw new NotFoundException('Service not found');
  }

  if (service.isApproved) {
    throw new BadRequestException('Already approved');
  }

  const admin = await this.adminRepo.findOne({
    where: { id: adminId }
  });

  if (!admin) {
    throw new UnauthorizedException('Invalid admin');
  }

  service.isApproved = true;
  service.approvedBy = admin;

  return await this.serviceRepo.save(service);
}

 async getPendingServices() {
    return this.serviceRepo.find({
      where: { isApproved: false },
    });
  }

async getServicesApprovedByAdmin(adminId: string) {
  const id = Number(adminId); 

  const admin = await this.adminRepo.findOne({ where: { id:adminId } });
  if (!admin) throw new NotFoundException('Admin not found');


  const services = await this.serviceRepo.find({
    where: { approvedBy: { id: admin.id } },
    relations: ['vendor', 'approvedBy'], 
  });

  return services;
}

async getServiceApprovedBy(serviceId: number) {
  const service = await this.serviceRepo.findOne({
    where: { id: serviceId },
    relations: ['approvedBy'], 
  });

  if (!service) {
    throw new NotFoundException("Service not found");
  }

  if (!service.approvedBy) {
    return { message: "This service is not approved yet" };
  }


  return {
    serviceId: service.id,
    approvedBy: {
      id: service.approvedBy.id,
      name: service.approvedBy.name,
      email: service.approvedBy.email,
      role: service.approvedBy.role
    }
  };
}


}


