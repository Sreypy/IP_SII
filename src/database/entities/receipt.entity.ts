import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Receipt {
  @PrimaryGeneratedColumn()
  receiptId: number;

  @Column()
  name: string;

  @Column('float')
  amount: number;

  @Column()
  issuedAt: Date; 
}