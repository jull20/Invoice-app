import { Injectable } from '@nestjs/common';
import { InvoiceType, AbbreviatedInvoiceType, NewInvoiceType } from './types/invoice.type';
import { isNewInvoice } from './types/invoice.typesGuards';
import { CreateInvoiceDTO } from './types/invoice.dto';

@Injectable()
export class InvoicesService {
  private invoicesStorage: InvoiceType[] = [];

  private generateId(){

  }
  private getAbbreviatedInvoice(fullInvoice: InvoiceType){
    return {
      id: fullInvoice.id,
      
    }
  }

  create(createInvoiceDTO: CreateInvoiceDTO): string{
      this.generateId()
      const id = 'XM5436';
      this.invoicesStorage.push({...createInvoiceDTO, id: id});
      return id;
  }
  getAll(){
    // const invoices: AbbreviatedInvoiceType[] = [];
    // this.invoicesStorage.forEach(invoice => {
    //     let abbreviatedInvoice = {
    //         id: invoice.id,
    //         status: invoice.status
    //     };
    //     invoices.push(abbreviatedInvoice);
    // })
    // return invoices;
    return this.invoicesStorage
  }
  getInvoiceById(){}

}
