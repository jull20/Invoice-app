import { Injectable, Res } from '@nestjs/common';
import { InvoiceType, AbbreviatedInvoiceType, NewInvoiceType, ItemType } from './types/invoice.type';
import { isNewInvoice } from './types/invoice.typesGuards';
import { FormInvoiceDTO, InvoiceDTO, InvoiceUpdateDTO } from './types/invoice.dto';
import { DraftDTO } from './types/draft.dto';

@Injectable()
export class InvoicesService {
  private invoicesStorage: InvoiceType[] = [];

  constructor(){
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
            id: '1',
            name: "Test Item 1",
            quantity: 12,
            price: 12,
            total: 144
          },
          {
            id: '2',
            name: "Test Item 2",
            quantity: 13,
            price: 13,
            total: 169
          },
          {
            id: '3',
            name: "Test Item 3",
            quantity: 14,
            price: 14,
            total: 196
          },
          {
            id: '4',
            name: "Test Item 4",
            quantity: 15,
            price: 15,
            total: 225
          },
          {
            id: '5',
            name: "Test Item 5",
            quantity: 16,
            price: 16,
            total: 256
          }
        ]
    }
    for(let i=0; i<4; i++){
      this.invoicesStorage.push({...test, id: this.generateId()});
      
    }  
  }

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
  private getAbbreviatedInvoice(invoice: InvoiceType): AbbreviatedInvoiceType{
    return {
      id: invoice.id,
      paymentDue: invoice.paymentDue,
      name: invoice.billTo.name,
      amountDue: invoice.amountDue,
      status: invoice.status
    }
  }
  private addIdToItems(items: ItemType[]){
    console.log('===============addIdToItems===============')
    console.log(items)
    const itemsWithId: ItemType[] = items.map(item => {
      const id: string = String(Date.now().toString(32) + Math.random().toString(16)).replace(/\./g, '');
      return {...item, id: item.id ?? id}
    });
    return itemsWithId;
  }


  create(createInvoiceDTO: FormInvoiceDTO): AbbreviatedInvoiceType{
      const id         = this.generateId(),
            paymentDue = this.countPaymentDue(createInvoiceDTO.invoiceDate, createInvoiceDTO.paymentTerms),
            amountDue  = this.countAmountDue(createInvoiceDTO.items),
            items      = this.addIdToItems(createInvoiceDTO.items)
      const newInvoice: InvoiceType = {
        id:                 id,
        status:             createInvoiceDTO.status,
        billFrom:           createInvoiceDTO.billFrom,
        billTo:             createInvoiceDTO.billTo,
        invoiceDate:        createInvoiceDTO.invoiceDate,
        paymentTerms:       createInvoiceDTO.paymentTerms,
        paymentDue:         paymentDue,
        projectDescription: createInvoiceDTO.projectDescription,
        amountDue:          amountDue,
        items:              items
      }
      this.invoicesStorage.push(newInvoice);
      return this.getAbbreviatedInvoice(newInvoice);
  }
  getAll(): AbbreviatedInvoiceType[]{
    const invoices: AbbreviatedInvoiceType[] = this.invoicesStorage.map(invoice => {
      return this.getAbbreviatedInvoice(invoice);
    })
    return invoices;
  }
  getOne(id: string): InvoiceType | undefined{
    return this.invoicesStorage.find(invoice => invoice.id === id);
  }
  update(invoiceUpdateDTO: InvoiceUpdateDTO){
    const invoiceForEdit: InvoiceType | undefined = this.invoicesStorage.find(invoice => invoice.id === invoiceUpdateDTO.id)

    function updateFields<T>(invoice: T, changedFields: T){
      for(let prop in changedFields){
          if(typeof invoice[prop] === 'object' && typeof changedFields[prop] === 'object'){
              if(prop === 'items'){
                invoice[prop] = changedFields[prop];
                continue;
              }
              updateFields(invoice[prop], changedFields[prop]);
          }
          else if(invoice[prop] !== changedFields[prop]){
              invoice[prop] = changedFields[prop];
          }
      }
    }
    if(invoiceForEdit){
      updateFields(invoiceForEdit, invoiceUpdateDTO);
      invoiceForEdit.items      = this.addIdToItems(invoiceForEdit.items);       
      invoiceForEdit.amountDue  = this.countAmountDue(invoiceForEdit.items);       
      invoiceForEdit.paymentDue = this.countPaymentDue(invoiceForEdit.invoiceDate, invoiceForEdit.paymentTerms);       
    }
    return invoiceForEdit
  }
  delete(id: string){
    this.invoicesStorage = this.invoicesStorage.filter(invoice => invoice.id !== id);
  }

  // createDraft(draftDTO: DraftDTO): InvoiceType  {
  //   let newInvoice: InvoiceType;
  //   const id         = this.generateId(),
  //         paymentDue = draftDTO.invoiceDate && draftDTO.paymentTerms ? this.countPaymentDue(draftDTO.invoiceDate, draftDTO.paymentTerms) : '',
  //         amountDue  = draftDTO.items ? this.countAmountDue(draftDTO.items) : 0;
  //   newInvoice = {
  //     id:                 id,
  //     status:             draftDTO.status,
  //     billFrom:           draftDTO.billFrom,
  //     billTo:             draftDTO.billTo,
  //     invoiceDate:        draftDTO.invoiceDate,
  //     paymentTerms:       draftDTO.paymentTerms,
  //     paymentDue:         paymentDue,
  //     projectDescription: draftDTO.projectDescription,
  //     amountDue:          amountDue,
  //     items:              draftDTO.items
  //   }
  //   this.invoicesStorage.push(newInvoice);
  //   return newInvoice;
  // }
}

