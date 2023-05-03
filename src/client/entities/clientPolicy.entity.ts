import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ClientPolicy {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('int')
  clientId: number;
  @Column('varchar', { length: 256 })
  name: string;
  @Column('int')
  premium: number;
  @Column('int')
  coverage: number;
}
