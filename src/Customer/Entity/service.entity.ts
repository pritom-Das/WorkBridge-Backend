/* eslint-disable prettier/prettier */
import { BeforeInsert, Entity,Column, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
@Entity('services')
export class ServiceEntity {
     @PrimaryGeneratedColumn()
            id:string;
    @Column()
    serviceName:string;
    @Column({ type: 'enum', enum: ['Education', 'Design & Creative', 'IT Services', 'Home Services', 'Repair & Maintenance'] })
    category:'Education' | 'Design & Creative' | 'IT Services' | 'Home Services' | 'Repair & Maintenance'
    @Column()
    description:string
    @Column({ type: 'int', unsigned: true })
    price:number
    @Column({ type: 'enum', enum: ['active','inactive'] })
    status:'active' | 'inactive'
    @Column({ type: 'float' })
    rating:number
    @BeforeInsert()
        generateId() {
        // Only set the ID if it hasn't been set already
        if (!this.id) {
        this.id = uuidv4();
        }
    }
}
