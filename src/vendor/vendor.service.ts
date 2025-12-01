import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'; 
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, MoreThanOrEqual, Repository } from 'typeorm';
import { Vendor } from './vendor.entity';
import { Service } from './service.entity';
import { CreateVendorDto } from './Dto/create_vendor.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class VendorService {
  constructor(@InjectRepository(Vendor) private vendorRepo: Repository<Vendor>,
   @InjectRepository(Service)private serviceRepo: Repository<Service>,) {}

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
  async createService(vendorId:number, data:Partial<Service>){
    const vendor= await this.getVendor(vendorId);
    const service=this.serviceRepo.create({...data,vendor});
    return this.serviceRepo.save(service);
  }
  async getServicesByVendor(vendorId:number){
  return this.serviceRepo.find({where:{vendor:{id:vendorId}},
  relations:['vendor']});
  }




}