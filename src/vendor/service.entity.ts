import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Vendor } from './vendor.entity';
import { OrderEntity } from "../Customer/Entity/order.entity";
import { ReviewEntity } from 'src/Customer/Entity/review.entity';
import { AdminEntity } from 'src/admin/Enteties/admin.entity';
@Entity()
export class Service {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

 
  @ManyToOne(() => AdminEntity, admin => admin.id, { nullable: true })
  @JoinColumn({ name: 'approvedById' })
  approvedBy: AdminEntity;
  
  @OneToMany(() => OrderEntity, (order) => order.service)
  orders: OrderEntity[];
  @OneToMany(() => ReviewEntity, (review) => review.service)
  reviews: ReviewEntity[];

}
