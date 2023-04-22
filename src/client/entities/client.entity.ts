import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('varchar', { length: 256, nullable: true })
  profileImage: string;
  @Column('varchar', { length: 256 })
  name: string;
  @Column('varchar', { length: 256 })
  NRIC: string;
  @Column('varchar', { length: 256 })
  contactNo: string;
  @Column('varchar', { length: 256 })
  email: string;
  @Column('varchar', { length: 256 })
  address: string;
  @Column('varchar', { length: 256 })
  occupation: string;
}
