import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserFile {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('int')
  userId: number;
  @Column('varchar', { length: 256 })
  name: string;
  @Column('varchar', { length: 256 })
  path: string;
}
