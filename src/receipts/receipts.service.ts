import { Injectable } from '@nestjs/common';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { UpdateReceiptDto } from './dto/update-receipt.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Receipt } from '../database/entities/receipt.entity';

@Injectable()
export class ReceiptsService {
  constructor(
    @InjectRepository(Receipt)
    private readonly receiptRepo: Repository<Receipt>,
  ) {}

  findAll() {
    // Implement logic
    return this.receiptRepo.find();
  }

  findOne(id: string) {
    // Implement logic
    return {};
  }

  create(dto: CreateReceiptDto) {
    // Implement logic
    const receipt = this.receiptRepo.create({
    issuedAt: new Date(dto.issuedAt),
    name: dto.name,
    amount: dto.amount,
  });

  return this.receiptRepo.save(receipt);
  }

  update(id: string, dto: UpdateReceiptDto) {
    // Implement logic
    return {};
  }

  remove(id: string) {
    // Implement logic
    return this.receiptRepo.delete(id).then(() => ({ message: "Deleted receipt with id: " + id }));
  }
}