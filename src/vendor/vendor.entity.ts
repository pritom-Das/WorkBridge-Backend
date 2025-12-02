import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Service } from './service.entity';
import { VendorProfile } from './vendor_profile.entity';

@Entity()
export class Vendor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  isApproved: boolean;

  @OneToOne(() => VendorProfile, (profile) => profile.vendor,{cascade:true})
  @JoinColumn()
  profile: VendorProfile;

  @OneToMany(() => Service, (service) => service.vendor,{cascade:true})
  services: Service[];
 
}
