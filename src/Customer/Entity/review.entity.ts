import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { CustomerInfoEntity } from './customerInfo.entity';
import { Service } from '../../vendor/service.entity';

@Entity('reviews')
export class ReviewEntity {
  @PrimaryGeneratedColumn('uuid')//change it
  id: string; 

  @ManyToOne(() =>  CustomerInfoEntity, (customer) => customer.reviews)
  customer: CustomerInfoEntity;

<<<<<<< HEAD
  @ManyToOne(() => Service, (service) => service.reviews, { onDelete: 'CASCADE' })//{ onDelete: 'CASCADE' }) delete if error happens
=======
  @ManyToOne(() => Service, (service) => service.reviews, { onDelete: 'CASCADE' })
>>>>>>> vendor
  service: Service;

  @Column({ type: 'int' })
  rating: number; // 1–5

  @Column({ type: 'text', nullable: true })
  comment: string;

  @CreateDateColumn()
  createdAt: Date;
}
