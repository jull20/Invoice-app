import { ArrayNotEmpty, IsIn, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";
import type { StatusType } from "./invoice.type";


class Address{
    @IsString() @IsNotEmpty()
    name: string
    @IsString() @IsNotEmpty()
    email: string
    @IsString() @IsNotEmpty()
    street: string
    @IsString() @IsNotEmpty()
    city: string
    @IsString() @IsNotEmpty()
    postCode: string
    @IsString() @IsNotEmpty()
    country: string
}
class Item{
    @IsNumber() @IsNotEmpty()
    id: number
    @IsString() @IsNotEmpty()
    name: string
    @IsNumber() @IsNotEmpty()
    quantity: number
    @IsNumber() @IsNotEmpty()
    price: number
    @IsNumber() @IsNotEmpty()
    total: number
}

export class CreateInvoiceDTO{
    @IsNotEmpty()
    @IsIn(['pending', 'paid', 'draft'], {
        message: 'invalid status value'
    })
    status: StatusType;
    @ValidateNested()
    billFrom: Address
    @ValidateNested()
    billTo: {
        name: string,
        email: string
    } & Address
    @IsString() @IsNotEmpty()
    invoiceDate: string
    @IsString() @IsNotEmpty()
    paymentTerms: string
    @IsString() @IsNotEmpty()
    projectDescription: string
    @ArrayNotEmpty()
    @ValidateNested()
    items: Item[]
}   

