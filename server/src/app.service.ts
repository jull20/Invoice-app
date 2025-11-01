import { Injectable, Res } from '@nestjs/common';
import { InvoiceType, AbbreviatedInvoiceType, NewInvoiceType, ItemType } from './types/invoice.type';
import { isNewInvoice } from './types/invoice.typesGuards';
import { FormInvoiceDTO, InvoiceDTO } from './types/invoice.dto';
import { DraftDTO } from './types/draft.dto';

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

  create(createInvoiceDTO: FormInvoiceDTO): InvoiceType{
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
  createDraft(draftDTO: DraftDTO): InvoiceType  {
    let newInvoice: InvoiceType;
    const id         = this.generateId(),
          paymentDue = draftDTO.invoiceDate && draftDTO.paymentTerms ? this.countPaymentDue(draftDTO.invoiceDate, draftDTO.paymentTerms) : '',
          amountDue  = draftDTO.items ? this.countAmountDue(draftDTO.items) : 0;
    newInvoice = {
      id:                 id,
      status:             draftDTO.status,
      billFrom:           draftDTO.billFrom,
      billTo:             draftDTO.billTo,
      invoiceDate:        draftDTO.invoiceDate,
      paymentTerms:       draftDTO.paymentTerms,
      paymentDue:         paymentDue,
      projectDescription: draftDTO.projectDescription,
      amountDue:          amountDue,
      items:              draftDTO.items
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
          street: "19 Union Terrace",
          city: "London",
          postCode: "E1 3EZ",
          country: "United Kingdom"
        },
        billTo: {
          name: "Test Name",
          email: "qwe@mail.ru",
          street: "19 Union Terrace",
          city: "London",
          postCode: "E1 3EZ",
          country: "United Kingdom"
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
      for(let i=0; i<1; i++){
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
  update(invoiceDTO: InvoiceDTO){
    const invoiceForEdit: InvoiceType | undefined = this.invoicesStorage.find(invoice => invoice.id === invoiceDTO.id)
    if(invoiceForEdit){
      for(let prop in invoiceForEdit){
        if(invoiceForEdit[prop] !== invoiceDTO[prop]){
          invoiceForEdit[prop] = invoiceDTO[prop];
        }
      }
    }
    return invoiceForEdit
  }
  delete(){

  }
}
