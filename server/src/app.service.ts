import { Injectable } from '@nestjs/common';
import { InvoiceType, AbbreviatedInvoiceType, NewInvoiceType, ItemType } from './types/invoice.type';
import { isNewInvoice } from './types/invoice.typesGuards';
import { CreateInvoiceDTO } from './types/invoice.dto';

@Injectable()
export class InvoicesService {
  private invoicesStorage: InvoiceType[] = [];

  private generateId(){
    let id = '';
    do{
      for (let i = 0; i < 2; i++) {
        id += String.fromCharCode(
          Math.floor(Math.random() * 26) + 97,
        ).toUpperCase();
      }
      for(let i=0; i<4; i++){
        id += Math.floor(Math.random() * (9 - 0 + 1)) + 1;
      }
    }while(this.invoicesStorage.find(invoice => invoice.id === id) !== undefined)
    return id;
  }
  private countPaymentDue(start: string, paymentTerms: string){
    const startDate = new Date(start);
    const timeDifference = parseInt(paymentTerms) * 1000 * 60 * 60 * 24;
    const timeEnd = startDate.getTime() + timeDifference;
    const endDate = new Date(timeEnd)
    return endDate.toDateString()
  }
  private countAmountDue(items: ItemType[]){
    let amount: number = 0;
    items.forEach(item => amount += item.total);
    return amount;
  }
  // private getAbbreviatedInvoice(fullInvoice: InvoiceType){
  //   return {
  //     id: fullInvoice.id,
      
  //   }
  // }

  create(createInvoiceDTO: CreateInvoiceDTO): InvoiceType{
      let newInvoice: InvoiceType;
      const id         = this.generateId(),
            paymentDue = this.countPaymentDue(createInvoiceDTO.invoiceDate, createInvoiceDTO.paymentTerms),
            amountDue  = this.countAmountDue(createInvoiceDTO.items);
      newInvoice = {
        id:                 id,
        status:             createInvoiceDTO.status,
        billFrom:           createInvoiceDTO.billFrom,
        billTo:             createInvoiceDTO.billTo,
        invoiceDate:        createInvoiceDTO.invoiceDate,
        paymentTerms:       createInvoiceDTO.paymentTerms,
        paymentDue:         paymentDue,
        projectDescription: createInvoiceDTO.projectDescription,
        amountDue:          amountDue,
        items:              createInvoiceDTO.items
      }
      this.invoicesStorage.push(newInvoice);
      return newInvoice;
  }
  getAll(){
    if(this.invoicesStorage.length === 0){
      const test: InvoiceType = {
        id: "SC7584",
        status: 'draft',
        billFrom: {
          street: "Альпийский переулок",
          city: "Санкт-Петербург",
          postCode: "192286",
          country: "Россия"
        },
        billTo: {
          name: "Test Name",
          email: "qwe@mail.ru",
          street: "Альпийский переулок",
          city: "Санкт-Петербург",
          postCode: "192286",
          country: "Россия"
        },
        invoiceDate: "2025-10-17",
        paymentTerms: "14",
        paymentDue: "Fri Oct 31 2025",
        projectDescription: "Test Description",
        amountDue: 990,
        items: [
          {
            id: 1,
            name: "Test Item 1",
            quantity: 12,
            price: 12,
            total: 144
          },
          {
            id: 2,
            name: "Test Item 2",
            quantity: 13,
            price: 13,
            total: 169
          },
          {
            id: 3,
            name: "Test Item 3",
            quantity: 14,
            price: 14,
            total: 196
          },
          {
            id: 4,
            name: "Test Item 4",
            quantity: 15,
            price: 15,
            total: 225
          },
          {
            id: 5,
            name: "Test Item 5",
            quantity: 16,
            price: 16,
            total: 256
          }
        ]
    }
      for(let i=0; i<10; i++){
        this.invoicesStorage.push(test);
      }
    }
    // const invoices: AbbreviatedInvoiceType[] = [];
    // this.invoicesStorage.forEach(invoice => {
    //     let abbreviatedInvoice = {
    //         id: invoice.id,
    //         status: invoice.status
    //     };
    //     invoices.push(abbreviatedInvoice);
    // })
    // return invoices;
    return this.invoicesStorage;
  }
  getOne(id: string): InvoiceType | undefined{
    return this.invoicesStorage.find(invoice => invoice.id === id);
  }

}
