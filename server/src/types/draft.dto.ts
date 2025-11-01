import {
  ArrayNotEmpty,
  Equals,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import type { StatusType } from './invoice.type';

class Address {
    @IsString()
    name: string
    @IsString()
    email: string
    @IsString()
    street: string
    @IsString()
    city: string
    @IsString()
    postCode: string
    @IsString()
    country: string
}
class Item {
    @IsNumber()
    id: number
    @IsString()
    name: string
    @IsNumber()
    quantity: number
    @IsNumber()
    price: number
    @IsNumber()
    total: number
}

export class DraftDTO {
    @Equals('draft')
    status: StatusType;
    @ValidateNested()
    billFrom: Address
    @ValidateNested()
    billTo: {
        name: string,
        email: string
    } & Address
    @IsString()
    invoiceDate: string
    @IsString()
    paymentTerms: string
    @IsString()
    projectDescription: string
    @ArrayNotEmpty()
    @ValidateNested()
    items: Item[]
}   

