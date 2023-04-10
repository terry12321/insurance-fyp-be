import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('varchar', { length: 256 })
  cardId: string;
  @Column('varchar', { length: 256 })
  date: string;
  @Column('text')
  content: string;
}
