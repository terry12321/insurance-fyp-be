import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('varchar', { length: 256 })
  firstName: string;
  @Column('varchar', { length: 256 })
  lastName: string;
  @Column('varchar', { length: 256 })
  email: string;
  @Column('varchar', { length: 256 })
  password: string;
  @Column('text', { nullable: true })
  imageUrl: string;
}
