import { Injectable } from '@nestjs/common';
import { CreateServiceDto, UpdateProfileDto } from './Dto/vendor.dto'; 

@Injectable()
export class VendorService {
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
      email: 'vendor1@example.com', 
      contactNumber: '+1234567890',
      address: '123 Business St, City',
      description: 'Professional tech services',
      businessHours: {
        open: '09:00',
        close: '18:00',
      },
    },
    {
      id: '2',
      businessName: 'Creative Designs',
      email: 'vendor2@example.com',
      contactNumber: '+0987654321',
      address: '456 Creative Ave, Town',
      description: 'Creative design services',
      businessHours: {
        open: '10:00',
        close: '19:00',
      },
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
  
}
