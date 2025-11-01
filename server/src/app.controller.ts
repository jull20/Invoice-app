import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { InvoicesService } from './app.service';
import { FormInvoiceDTO, InvoiceDTO } from './types/invoice.dto';
import { DraftDTO } from './types/draft.dto';

@Controller('api')
export class InvoicesController {
  constructor(private readonly invoiceService: InvoicesService) {}
  @Post('invoices') create(@Body() createInvoiceDTO: FormInvoiceDTO) {
    try{
      return this.invoiceService.create(createInvoiceDTO);
    }catch(error){
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Custom message: BAD_REQUEST'
        },  
        HttpStatus.BAD_REQUEST, { cause: error }
      )
    }
  }
  @Post('draft') createDraft(@Body() darftDTO: DraftDTO) {
    console.log(darftDTO);
    return this.invoiceService.createDraft(darftDTO);
  }
  @Get('invoices') getAll() {
    try{
      return this.invoiceService.getAll();
    }catch(error){
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Custom message: BAD_REQUEST'
        },  
        HttpStatus.BAD_REQUEST, { cause: error }
      )
    }
  }
  @Get('invoices/:id') getOne(@Param('id') id: string) {
    try{
      return this.invoiceService.getOne(id);
    }catch(error){
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Custom message: BAD_REQUEST'
        },  
        HttpStatus.BAD_REQUEST, { cause: error }
      )
    }
  }
  @Put('invoices') update(@Body() invoiceDTO: InvoiceDTO){
    try{
      return this.invoiceService.update(invoiceDTO);
    }catch(error){
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Custom message: BAD_REQUEST'
        },  
        HttpStatus.BAD_REQUEST, { cause: error }
      )
    }
  }
  @Delete('invoices/:id') delete(){
    try{
      return this.invoiceService.delete();
    }catch(error){
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Custom message: BAD_REQUEST'
        },  
        HttpStatus.BAD_REQUEST, { cause: error }
      )
    }
  }
}
