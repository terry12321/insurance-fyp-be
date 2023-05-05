import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ClientUser {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('int')
  clientId: number;
  @Column('int')
  userId: number;
}
