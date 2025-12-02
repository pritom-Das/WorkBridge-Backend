import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Vendor } from './vendor.entity';

@Entity()
export class VendorProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  address: string;

  @Column({ length: 20 })
  phone: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToOne(() => Vendor, (vendor) => vendor.profile, { onDelete: 'CASCADE' })
  @JoinColumn() 
  vendor: Vendor;
}
