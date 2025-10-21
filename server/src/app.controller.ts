import { Body, Controller, Get, Post } from '@nestjs/common';
import { InvoicesService } from './app.service';
import { CreateInvoiceDTO } from './types/invoice.dto';

@Controller('api')
export class InvoicesController {
  constructor(private readonly invoiceService: InvoicesService) {}
  @Post('invoices') create(@Body() createInvoiceDTO: CreateInvoiceDTO){
    console.log(createInvoiceDTO)
    // return 'Invoice created successfully'
    return this.invoiceService.create(createInvoiceDTO);
  }

  @Get('invoices') getAll(){
    return this.invoiceService.getAll();
  }

}
