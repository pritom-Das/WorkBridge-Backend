import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'; 
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vendor } from './vendor.entity';
import { Service } from './service.entity';
import { CreateVendorDto } from './Dto/create_vendor.dto';
import { LoginVendorDto } from './Dto/update.dto'; // Ensure this path is correct
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';   
import { VendorProfile } from './vendor_profile.entity';

@Injectable()
export class VendorService {
  constructor(
    @InjectRepository(Vendor) private vendorRepo: Repository<Vendor>,
    @InjectRepository(Service) private serviceRepo: Repository<Service>,
    @InjectRepository(VendorProfile) private profileRepo: Repository<VendorProfile>,
    private jwtService: JwtService,   
  ) {}

  async createVendor(data: CreateVendorDto) {
    const existingVendor = await this.vendorRepo.findOne({ where: { email: data.email } });
    if (existingVendor) {
      throw new ConflictException('Vendor with this email already exists');
    }

    // 1. Hash Password
    const salt = await bcrypt.genSalt();
    const hased = await bcrypt.hash(data.password, salt);

    // 2. Create Vendor (User Account)
    const newVendor = this.vendorRepo.create({ 
      name: data.name, 
      email: data.email, 
      password: hased 
    });
    
    const savedVendor = await this.vendorRepo.save(newVendor);

    // 3. Create Profile (Address, Phone) linked to Vendor
    const newProfile = this.profileRepo.create({
      address: data.address,
      phone: data.phone,
      vendor: savedVendor, 
    });

    await this.profileRepo.save(newProfile);

    return savedVendor;
  }

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
    
    return {
      access_token: this.jwtService.sign(payload),
      vendor: vendor, 
    };
  }

  getAllVendors() {
    return this.vendorRepo.find({ relations: { services: true } });
  }

  // ⚠️ CRITICAL UPDATE HERE
  async getVendor(id: number) {
    const vendor = await this.vendorRepo.findOne({ 
      where: { id }, 
      relations: { 
        services: true,
        profile: true  // <--- This fetches the phone/address from the other table
      } 
    });
    
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
  //  Single Service by ID (UUID is a string)
  async getServiceById(id: string) {
    const service = await this.serviceRepo.findOne({ where: { id } });
    if (!service) {
      throw new NotFoundException('Service not found');
    }
    return service;
  }
 
  async updateService(id: string, data: Partial<Service>) { 
    await this.getServiceById(id); 
    await this.serviceRepo.update(id, data); 
    return this.getServiceById(id);
  }
}