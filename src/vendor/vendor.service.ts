import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateServiceDto, CreateUserDto, CreateVendorDto, UpdateProfileDto, UpdateStatusDto, VendorLoginDto } from './Dto/vendor.dto'; 
import { VendorEntity } from './vendor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, MoreThanOrEqual, Repository } from 'typeorm';

@Injectable()
export class VendorService {
  constructor(@InjectRepository(VendorEntity) private vendorRepo: Repository<VendorEntity>) {}
  private services = [
    {
      id: '1',
      vendorId: '1',
      name: 'Web Development',
      description: 'Professional website development service',
      price: 5000,
      duration: 120,
      category: 'development',
      isActive: true,
      createdAt: new Date('2024-01-15'),
    },
    {
      id: '2',
      vendorId: '1',
      name: 'Mobile App Development',
      description: 'Cross-platform mobile application development',
      price: 8000,
      duration: 180,
      category: 'development',
      isActive: true,
      createdAt: new Date('2024-01-20'),
    },
    {
      id: '3',
      vendorId: '2',
      name: 'Graphic Design',
      description: 'Professional logo and branding design',
      price: 2000,
      duration: 60,
      category: 'design',
      isActive: true,
      createdAt: new Date('2024-01-10'),
    },
  ];

 private vendors = [
  {
    id: '1',
    businessName: 'Tech Solutions Ltd',
    email: 'vendor1@aiub.edu',
    password: 'SecurePass123',
    contactNumber: '1234567890',
    address: '123 Business St, City',
    description: 'Professional tech services',
    gender: 'male',   
    businessHours: {
      open: '09:00',
      close: '18:00',
    },
    createdAt: new Date('2024-01-15'),   
  },
  {
    id: '2',
    businessName: 'Creative Designs',
    email: 'vendor2@aiub.edu',
    password: 'DesignPass456',
    contactNumber: '0987654321',
    address: '456 Creative Ave, Town',
    description: 'Creative design services',
    gender: 'female',   
    businessHours: {
      open: '10:00',
      close: '19:00',
    },
    createdAt: new Date('2024-01-10'),  
  },
]; 
  
  FindAllServices(category?: 'development' | 'design') {
    if (category) {
      return this.services.filter(
        (service) => service.category === category,
      );
    }
    return this.services;
  }

  getServiceById(id: string) {
    return this.services.find((service) => service.id === id);
  }

  deleteService(id: string) {
    this.services = this.services.filter((service) => service.id !== id);
    return { message: 'Service deleted successfully', data: this.services };
  }

  createService(vendorId: string, createServiceDto: CreateServiceDto) { 
    const newService = {
      id: (this.services.length + 1).toString(),
      vendorId,
      name: createServiceDto.name,
      description: createServiceDto.description,
      price: createServiceDto.price,
      duration: createServiceDto.duration,
      category: createServiceDto.category,
      isActive: createServiceDto.isActive,
      createdAt: new Date(),
    }; 
    this.services.push(newService);
    return { message: 'Service created successfully', data: newService };
  }
    getVendorProfile() {
    return this.vendors;
    }
    updateVendorProfile(id: string, updateProfileDto: UpdateProfileDto) {
    this.vendors = this.vendors.map((vendor) => {
      if (vendor.id === id) {
        return { ...vendor, ...updateProfileDto };
      }
      return vendor;
    });
    return { message: 'Profile updated successfully', data: this.vendors.find(vendor => vendor.id === id) };  
  }
  registerVendor(createVendorDto: CreateVendorDto) { 
    const existingVendor = this.vendors.find(
      vendor => vendor.email === createVendorDto.email
    );
    
    if (existingVendor) {
      throw new ConflictException('Vendor with this email already exists');
    }

    const newVendor = {
      id: (this.vendors.length + 1).toString(),
      ...createVendorDto,
      description: createVendorDto.description ?? 'No description provided',
      createdAt: new Date(),
    };

    this.vendors.push(newVendor);
     
    const { password, ...vendorWithoutPassword } = newVendor;
    return { 
      message: 'Vendor registered successfully', 
      data: vendorWithoutPassword 
    };
  }
    // Vendor Login
  loginVendor(loginVendorDto: VendorLoginDto) {
    const vendor = this.vendors.find(
      v => v.email === loginVendorDto.email && v.password === loginVendorDto.password
    );

    if (!vendor) {
      throw new UnauthorizedException('Invalid email or password');
    }
 
    const { password, ...vendorWithoutPassword } = vendor;
    return { 
      message: 'Login successful', 
      data: vendorWithoutPassword 
      
    };
  }
  getVendorById(id: string) {
    const vendor = this.vendors.find(vendor => vendor.id === id);
    if (vendor) {
      const { password, ...vendorWithoutPassword } = vendor;
      return vendorWithoutPassword;
    }
    return null;
  }

 async create(CreateUser:CreateUserDto)
  {
    await this.vendorRepo.create(CreateUser);
    return this.vendorRepo.save(CreateUser);
  } 
  async getInactiveVendors() {
    return this.vendorRepo.find({ where: { status: 'inactive' } });
  }
  async updateStatus(id:number, updateStatus:UpdateStatusDto) {
    const user = await this.vendorRepo.findOne({ where: { id } });

    if (!user) throw new NotFoundException('User not found');

    user.status = updateStatus.status;
    return await this.vendorRepo.save(user);
  }
  async deleteUser(id:number) {
    const user = await this.vendorRepo.findOne({ where: { id } });
    if (!user) {
    throw new NotFoundException('User not found');
  }
  await this.vendorRepo.delete(id);
  return { message: 'User deleted successfully' };
  }
  async getUsersInAgeRange() {
  return this.vendorRepo.find({
    where: { age: MoreThan(40) },
  });
  }
  async customRange(id:number) {
    return this.vendorRepo.find({
      where: { age: MoreThanOrEqual(id) },
    });
  }
}
