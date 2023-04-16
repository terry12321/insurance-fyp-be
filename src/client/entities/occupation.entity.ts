import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Occupation {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('varchar', { length: 256 })
  occupation: string;
}
