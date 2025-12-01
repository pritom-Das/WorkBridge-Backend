import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Service } from './service.entity';

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

  @OneToMany(() => Service, (service) => service.vendor)
  services: Service[];
}
