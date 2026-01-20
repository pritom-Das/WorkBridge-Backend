import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';
import { CustomerInfoEntity } from './customerInfo.entity';
import { Service } from '../../vendor/service.entity';

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

    @ManyToOne(() => CustomerInfoEntity, (customer) => customer.orders)
    customer: CustomerInfoEntity;


    @ManyToOne(() => Service, (service) => service.orders)//{ onDelete: 'CASCADE' }) delete if error happens
    service: Service;
 

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalPrice: number;

  @CreateDateColumn()
  createdAt: Date;
}

