import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';
import { CustomerInfoEntity } from './customerInfo.entity';
import { Service } from '../../vendor/service.entity';

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

    @ManyToOne(() => CustomerInfoEntity, (customer) => customer.orders)
    customer: CustomerInfoEntity;


<<<<<<< HEAD
    @ManyToOne(() => Service, (service) => service.orders, { onDelete: 'CASCADE' })//{ onDelete: 'CASCADE' }) delete if error happens
=======
    @ManyToOne(() => Service, (service) => service.orders, { onDelete: 'CASCADE' })
>>>>>>> vendor
    service: Service;
 

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalPrice: number;

  @CreateDateColumn()
  createdAt: Date;
}

