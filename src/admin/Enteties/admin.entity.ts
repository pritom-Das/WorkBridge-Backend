import { BeforeInsert, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as bcrypt from 'bcrypt';

import { UUID } from "typeorm/driver/mongodb/bson.typings.js";
import { v4 as uuidv4 } from "uuid";

@Entity("admin")
export class AdminEntity {
     @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'varchar', default: 'admin' }) 
  role: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

   @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

 @ManyToOne(() => AdminEntity, (admin) => admin.createdAdmins, { nullable: true })
  createdBy: AdminEntity;

  // One super admin can create many admins
  @OneToMany(() => AdminEntity, (admin) => admin.createdBy)
  createdAdmins: AdminEntity[];




}