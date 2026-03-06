import {IsDateString, IsNumber, IsOptional, IsString, Min} from 'class-validator';

export class UpdateReceiptDto {
    @IsDateString()
    @IsOptional()
    issuedAt?: string;
    
    @IsString()
    @IsOptional()
    name?: string;

    @IsNumber()
    @Min(0)
    @IsOptional()
    price?: number;
}