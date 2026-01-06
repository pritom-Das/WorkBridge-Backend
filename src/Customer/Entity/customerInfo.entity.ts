/* eslint-disable prettier/prettier */
import { Entity,Column, PrimaryColumn,BeforeInsert, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import { OrderEntity } from "./order.entity";
import { ReviewEntity } from "./review.entity";
@Entity("customerInfo")
export class CustomerInfoEntity { 
    @PrimaryGeneratedColumn()//uuid
        id:string;
    //  @BeforeInsert()
    // generateId() {
    //     if (!this.id) {
    //         this.id = uuidv4();
    //     }
    // }

    @Column({ default: true })
        isActive: boolean;
    @Column({ nullable: true, type: 'varchar' })
    name:string;
    @Column()
    email:string;
    @Column({ type: 'enum', enum: ['male', 'female', 'other'] })
    gender:'male' | 'female' | 'other';
    @Column({ type: 'bigint', unsigned: true })
    phoneNumber:number;
    @Column({ type: 'enum', enum: ['customer', 'vendor'] })
    role:'customer' | 'vendor';
    @Column({type:'varchar'})
    password:string;
    @Column({nullable:true})
    address:string;

    @OneToMany(() => OrderEntity, (order) => order.customer,{ cascade: true })
    orders: OrderEntity[];

    @OneToMany(() => ReviewEntity, (review) => review.customer,{ cascade: true })
    reviews: ReviewEntity[];

}
