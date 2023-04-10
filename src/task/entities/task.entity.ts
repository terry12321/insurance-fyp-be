import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('varchar', { length: 256 })
  cardId: string;
  @Column('varchar', { length: 256 })
  title: string;
  @Column('varchar', { length: 256 })
  color: string;
  @Column('varchar', { length: 256 })
  btnColor: string;
}
