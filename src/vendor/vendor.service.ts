import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'; 
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, MoreThanOrEqual, Repository } from 'typeorm';
import { Vendor } from './vendor.entity';
import { Service } from './service.entity'; 
import { CreateVendorDto } from './Dto/create_vendor.dto';
import * as bcrypt from 'bcrypt';
import { VendorProfile } from './vendor_profile.entity';
import { CreateProfileDto } from './Dto/create_profile.dto';
import { UpdateProfileDto } from './Dto/update_profile.dto';
import { LoginVendorDto } from './Dto/update.dto';
import { JwtService } from '@nestjs/jwt';
import { PusherService } from 'src/Notification/pusher.service';

@Injectable()
export class VendorService { 
  constructor(
    private jwtService: JwtService ,
    @InjectRepository(Vendor) private vendorRepo: Repository<Vendor>,
   @InjectRepository(Service)private serviceRepo: Repository<Service>,
  
   @InjectRepository(VendorProfile)
  private profileRepo: Repository<VendorProfile>,
    private readonly pusherService: PusherService,
)
   {}

  async createVendor(data:CreateVendorDto){
  const existingVendor= await this.vendorRepo.findOne({where:{email:data.email}});
  if(existingVendor){
    throw new ConflictException('Vendor with this email already exists');
  }
  const salt = await bcrypt.genSalt();
  const hased = await bcrypt.hash(data.password, salt);
  const vendor=this.vendorRepo.create({...data,password:hased});
  return this.vendorRepo.save(vendor);
  }

  getAllVendors(){
    return this.vendorRepo.find({relations:{services:true}});
  }

  async getVendor(id:number){
    const vendor= await this.vendorRepo.findOne({where:{id},relations:{services:true}});
    if(!vendor){
      throw new NotFoundException('Vendor not found');
    }
    return vendor;
  }

  async updateVendor(id:number, data:Partial<CreateVendorDto>){
  const vendor= await this.getVendor(id);
  Object.assign(vendor,data);
  return this.vendorRepo.save(vendor);
  }

  async approveVendor(id:number){
    const vendor= await this.getVendor(id);
    vendor.isApproved=true;
    return this.vendorRepo.save(vendor);
  }
  async deleteVendor(id:number){
    const vendor= await this.getVendor(id);
    return this.vendorRepo.remove(vendor);
  }
  // async createService(vendorId:number, data:Partial<Service>){
  //   const vendor= await this.getVendor(vendorId);
  //   const service=this.serviceRepo.create({...data,vendor});
  //   return this.serviceRepo.save(service);
  // }

  async createService(vendorId: number, data: Partial<Service>) {
  const vendor = await this.getVendor(vendorId);
  const service = this.serviceRepo.create({ ...data, vendor });
  
  // Save to DB
  const savedService = await this.serviceRepo.save(service);

  // Trigger Real-time Notification
  try {
    await this.pusherService.trigger('admin-channel', 'new-service', {
      message: `New service: ${savedService.title}`,
      vendorName: vendor.name,
    });
  } catch (err) {
    console.error("Pusher trigger failed, but service was saved:", err);
  }

  return savedService;
}

  async getServicesByVendor(vendorId:number){
  return this.serviceRepo.find({where:{vendor:{id:vendorId}},
  relations:['vendor']});
  }
  
  async createProfile(vendorId: number, body: CreateProfileDto) {
  const vendor = await this.getVendor(vendorId);

  const existing = await this.profileRepo.findOne({
    where: { vendor: { id: vendorId } },
  });

  if (existing) {
    throw new BadRequestException('Profile already exists');
  }

  const profile = this.profileRepo.create({
    ...body,
    vendor,
  });

  return this.profileRepo.save(profile);
}

 async getProfile(vendorId: number) {
  const profile = await this.profileRepo.findOne({
    where: { vendor: { id: vendorId } },
    relations: ['vendor'],
  });

  if (!profile) throw new NotFoundException('Profile not found');
  return profile;
}
 
async updateProfile(vendorId: number, body: UpdateProfileDto) {
  const profile = await this.getProfile(vendorId);

  Object.assign(profile, body);
  return this.profileRepo.save(profile);
}
//JWT
 async loginVendor(dto: LoginVendorDto) {
  const vendor = await this.vendorRepo.findOne({ where: { email: dto.email } });

  if (!vendor) {
    throw new NotFoundException('Vendor not found');
  }

  const match = await bcrypt.compare(dto.password, vendor.password);

  if (!match) {
    throw new UnauthorizedException('Invalid credentials');
  }

  const payload = { id: vendor.id, role: 'vendor' };

  return {
    access_token: await this.jwtService.signAsync(payload),
   role: 'vendor'
  };
}




}