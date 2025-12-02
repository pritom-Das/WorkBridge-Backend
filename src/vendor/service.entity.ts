import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Vendor } from './vendor.entity';
import { OrderEntity } from "../Customer/Entity/order.entity";
import { ReviewEntity } from 'src/Customer/Entity/review.entity';
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

  @ManyToOne(() => Vendor, (vendor) => vendor.services, { onDelete: 'CASCADE' })
  vendor: Vendor;

  @Column({ type: 'boolean', default: false })
  isApproved: boolean;
  
  @OneToMany(() => OrderEntity, (order) => order.service)
  orders: OrderEntity[];
  @OneToMany(() => ReviewEntity, (review) => review.service)
  reviews: ReviewEntity[];

}
