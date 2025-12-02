import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Vendor } from './vendor.entity';
import { OrderEntity } from "../Customer/Entity/order.entitiy";
import { Review } from 'src/Customer/Entity/review.entity';
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
  @OneToMany(() => Review, (review) => review.service)
  reviews: Review[];

}
