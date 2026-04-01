import { Injectable } from '@nestjs/common';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { UpdateReceiptDto } from './dto/update-receipt.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Receipt } from '../database/entities/receipt.entity';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class ReceiptsService {
  constructor(
    @InjectRepository(Receipt)
    private readonly receiptRepo: Repository<Receipt>,
    private readonly notificationsService: NotificationsService,

  ) {}

  findAll() {
    // Implement logic
    return this.receiptRepo.find();
  }

  findOne(id: string) {
    // Implement logic
    return {};
  }

  async create(dto: CreateReceiptDto) {
  const receipt = this.receiptRepo.create({
    issuedAt: new Date(dto.issuedAt),
    name: dto.name,
    amount: dto.amount,
  });

  // Save first
  const saved = await this.receiptRepo.save(receipt);

  // Then notify
  this.notificationsService.notify('receipt_created', {
    receiptId: saved.receiptId,
    amount: saved.amount,
  });

  // Finally return
  return saved;
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