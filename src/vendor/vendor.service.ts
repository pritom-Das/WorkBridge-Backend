import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'; 
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vendor } from './vendor.entity';
import { Service } from './service.entity';
import { CreateVendorDto } from './Dto/create_vendor.dto';
import { LoginVendorDto } from './Dto/update.dto'; 
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';  
@Injectable()
export class VendorService {
  constructor(
    @InjectRepository(Vendor) private vendorRepo: Repository<Vendor>,
    @InjectRepository(Service) private serviceRepo: Repository<Service>,
    private jwtService: JwtService,  
  ) {}

  async createVendor(data: CreateVendorDto) {
    const existingVendor = await this.vendorRepo.findOne({ where: { email: data.email } });
    if (existingVendor) {
      throw new ConflictException('Vendor with this email already exists');
    }
    const salt = await bcrypt.genSalt();
    const hased = await bcrypt.hash(data.password, salt);
    const vendor = this.vendorRepo.create({ ...data, password: hased });
    return await this.vendorRepo.save(vendor);
  }

  // Login Logic for Task
  // ... inside VendorService class

async loginVendor(data: LoginVendorDto) {
  const vendor = await this.vendorRepo.findOne({ where: { email: data.email } });
  
  if (!vendor) {
    throw new UnauthorizedException('Invalid credentials');
  }

  const isMatch = await bcrypt.compare(data.password, vendor.password);
  if (!isMatch) {
    throw new UnauthorizedException('Invalid credentials');
  }

  const payload = { id: vendor.id, email: vendor.email, role: 'vendor' };
  
  // CHANGE HERE: Return the vendor object too
  return {
    access_token: this.jwtService.sign(payload),
    vendor: vendor, 
  };
}

  getAllVendors() {
    return this.vendorRepo.find({ relations: { services: true } });
  }

  async getVendor(id: number) {
    const vendor = await this.vendorRepo.findOne({ where: { id }, relations: { services: true } });
    if (!vendor) {
      throw new NotFoundException('Vendor not found');
    }
    return vendor;
  }

  async updateVendor(id: number, data: Partial<CreateVendorDto>) {
    const vendor = await this.getVendor(id);
    Object.assign(vendor, data);
    return this.vendorRepo.save(vendor);
  }

  async approveVendor(id: number) {
    const vendor = await this.getVendor(id);
    vendor.isApproved = true;
    return this.vendorRepo.save(vendor);
  }

  async deleteVendor(id: number) {
    const vendor = await this.getVendor(id);
    return this.vendorRepo.remove(vendor);
  }

  async createService(vendorId: number, data: Partial<Service>) {
    const vendor = await this.getVendor(vendorId);
    const service = this.serviceRepo.create({ ...data, vendor });
    return this.serviceRepo.save(service);
  }

  async getServicesByVendor(vendorId: number) {
    return this.serviceRepo.find({
      where: { vendor: { id: vendorId } },
      relations: ['vendor']
    });
  }

  async getProfile(id: number) {
    return this.getVendor(id);
  }
}