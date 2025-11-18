import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('vendor')
export class VendorEntity {
    @PrimaryGeneratedColumn({unsigned:true})
    id: number;

    @Column({ type: 'varchar', length: 100 })
    fullName: string;

    @Column({ type: 'int', unsigned: true })
    age: number;

    @Column({ type: 'varchar', default: 'inactive',})
    status: 'active' | 'inactive';

}