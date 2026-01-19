import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from 'typeorm'; // Remove JoinColumn from import if not used elsewhere
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

  // ⚠️ CHANGE HERE: Remove @JoinColumn()
  // The Vendor is the "Inverse" side. It does not hold the Foreign Key.
  @OneToOne(() => VendorProfile, (profile) => profile.vendor, { cascade: true })
  profile: VendorProfile;

  @OneToMany(() => Service, (service) => service.vendor, { cascade: true })
  services: Service[];
}