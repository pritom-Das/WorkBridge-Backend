/* eslint-disable prettier/prettier */
import { Entity,Column, PrimaryGeneratedColumn,BeforeInsert } from "typeorm";
import { v4 as uuidv4 } from 'uuid';

@Entity("userInfo")
export class UserInfoEntity { 
    @PrimaryGeneratedColumn()
        id:string;
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
    @Column({type:'varchar', length:6})
    password:string;
    
    @BeforeInsert()
    generateId() {
        // Only set the ID if it hasn't been set already
        if (!this.id) {
            this.id = uuidv4();
        }
    }
}
