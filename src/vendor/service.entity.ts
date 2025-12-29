import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Vendor } from './vendor.entity';
import { AdminEntity } from 'src/admin/Enteties/admin.entity';

@Entity()
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column('decimal')
  price: number;

  @Column({ type: 'boolean', default: false })
  isApproved: boolean;

  @ManyToOne(() => Vendor, (vendor) => vendor.services, { onDelete: 'CASCADE' })
  vendor: Vendor;

 @ManyToOne(() => AdminEntity, { nullable: true })
  approvedBy: AdminEntity;
}
