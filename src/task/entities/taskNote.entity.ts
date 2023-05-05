import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TaskNote {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('int')
  noteId: number;
  @Column('int')
  userId: number;
}
