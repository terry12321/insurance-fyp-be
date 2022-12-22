import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Authentication {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 256 })
  privateKey: string;

  @Column('varchar', { length: 256 })
  publicKey: string;
}
