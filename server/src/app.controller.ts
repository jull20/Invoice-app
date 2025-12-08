import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, Res } from '@nestjs/common';
import { type Response } from 'express';
import { InvoicesService } from './app.service';
import { FormInvoiceDTO, InvoiceDTO, InvoiceUpdateDTO } from './types/invoice.dto';
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
  // @Post('draft') createDraft(@Body() darftDTO: DraftDTO) {
  //   console.log(darftDTO);
  //   return this.invoiceService.createDraft(darftDTO);
  // }
  @Get('invoices') getAll() {
    try{
      return this.invoiceService.getAll();
    }catch(error){
      console.log(error)
      // throw new HttpException(
      //   {
      //     status: HttpStatus.BAD_REQUEST,
      //     error: 'Custom message: BAD_REQUEST'
      //   },  
      //   HttpStatus.BAD_REQUEST, { cause: error }
      // )
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
  @Put('invoices') update(@Body() invoiceUpdateDTO: InvoiceUpdateDTO){
    try{
      return this.invoiceService.update(invoiceUpdateDTO);
    }catch(error){
      console.log(error) 
      // throw new HttpException(
      //   {
      //     status: HttpStatus.BAD_REQUEST,
      //     error: 'Custom message: BAD_REQUEST'
      //   },  
      //   HttpStatus.BAD_REQUEST, { cause: error }
      // )
    }
  }
  @Delete('invoices/:id') delete(@Param('id') id: string){
    try{
      return this.invoiceService.delete(id);
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





  @Get('vm') getVMs(@Query('search')search: string, @Query('offset')offset: string, @Query('limit')limit: string){
    const arr: {id: string, name: string, description: string}[] = [];
    const start = (parseInt(limit)*parseInt(offset))
    const end = parseInt(limit)*(parseInt(offset)+1)
    if(search){
      return [{id: `${999}`, name: `${search}`, description: `description ${999}`}]
    }
    
    // console.log(start, end)
    if(end > 150000) return ;
    for(let i=start; i<end; i++){
      arr.push({id: `${i}`, name: `name ${i}`, description: `description ${i}`})
    }
    // console.log(arr.length)
    setTimeout(() => {
      
    }, 1000)
    return arr
  }
  @Get('vm/:id') getVM(@Param('id') id: string){
    return {
      id: id,
      name: 'VM name ' + id, 
      description: 'VM description ' + id,
      groups:[
        {id: '1', name: 'name 1', description: 'description 1'},
        {id: '2', name: 'name 2', description: 'description 2'},
        {id: '3', name: 'name 3', description: 'description 3'},
        {id: '4', name: 'name 4', description: 'description 4'},
        {id: '5', name: 'name 5', description: 'description 5'},
        {id: '6', name: 'name 6', description: 'description 6'},
        {id: '7', name: 'name 7', description: 'description 7'},
        {id: '8', name: 'name 8', description: 'description 8'},
        {id: '9', name: 'name 9', description: 'description 9'},
        {id: '10', name: 'name 10', description: 'description 10'},
        {id: '11', name: 'name 11', description: 'description 11'},
        {id: '12', name: 'name 12', description: 'description 12'},
        {id: '13', name: 'name 13', description: 'description 13'},
        {id: '14', name: 'name 14', description: 'description 14'},
        {id: '15', name: 'name 15', description: 'description 15'},
        {id: '16', name: 'name 16', description: 'description 16'},
        {id: '17', name: 'name 17', description: 'description 17'},
        {id: '18', name: 'name 18', description: 'description 18'},
        {id: '19', name: 'name 19', description: 'description 19'},
        {id: '20', name: 'name 20', description: 'description 20'},
        {id: '21', name: 'name 21', description: 'description 21'},
        {id: '22', name: 'name 22', description: 'description 22'},
        {id: '23', name: 'name 23', description: 'description 23'},
      ]
    }
  }
  @Get('group') getGroups(@Query('offset')offset: string, @Query('limit')limit: string){
    const arr: {id: string, name: string, description: string, compliance_profile:string[], inventory_profiles:string[], vms: {id:string, name:string}[]}[] = [];
    const start = (parseInt(limit)*parseInt(offset))
    const end = parseInt(limit)*(parseInt(offset)+1)
    for(let i=start; i<end; i++){
      arr.push({
          id: `${i}`,
          name: `Group name ${i}`,
          description: `Group description ${i}`,
          compliance_profile:['compliance name 1', 'compliance name 2', 'compliance name 3', 'compliance name 4', 'compliance name 5', 'compliance name 6', 'compliance name 7','compliance name 8','compliance name 9'],
          inventory_profiles: ['inventory name 1', 'inventory name 2', 'inventory name 6', 'inventory name 4'],
          vms:[
              {id: '1', name: 'name 1'},
              {id: '2', name: 'name 2'},
              {id: '3', name: 'name 3'},
          ]
      })
    }
    return arr;
  }
  @Get('group/:id') getGroup(@Param('id') id: string){
    return {
      id: id,
      name: 'Group ' + id,
      description: 'description ' + id,
      compliance_profile:[
        'compliance name 1', 
        'compliance name 2', 
        'compliance name 3', 
        'compliance name 4', 
        'compliance name 5', 
        'compliance name 6', 
        'compliance name 7',
        'compliance name 8',
        'compliance name 9', 
        'compliance name 10', 
        'compliance name 11', 
        'compliance name 12', 
        'compliance name 13', 
        'compliance name 14', 
        'compliance name 15',
        'compliance name 16',
        'compliance name 17',
        'compliance name 18', 
        'compliance name 19', 
        'compliance name 20', 
        'compliance name 21', 
        'compliance name 22', 
        'compliance name 23', 
        'compliance name 24',
        'compliance name 25',
        'compliance name 26', 
        'compliance name 28', 
        'compliance name 29', 
        'compliance name 30', 
        'compliance name 31', 
        'compliance name 32', 
        'compliance name 33',
        'compliance name 34',
        'compliance name 35'
      ],
      inventory_profiles: ['inventory name 1', 'inventory name 2', 'inventory name 6', 'inventory name 4'],
      vms:[
          {id: '1', name: 'name 1'},
          {id: '2', name: 'name 2'},
          {id: '3', name: 'name 3'},
          {id: '4', name: 'name 4'},
          {id: '5', name: 'name 5'},
          {id: '6', name: 'name 6'},
          {id: '7', name: 'name 7'},
          {id: '8', name: 'name 8'},
          {id: '9', name: 'name 9'},
          {id: '10', name: 'name 10'},
          {id: '11', name: 'name 11'},
          {id: '12', name: 'name 12'},
          {id: '13', name: 'name 13'},
          {id: '14', name: 'name 14'},
          {id: '15', name: 'name 15'},
          {id: '16', name: 'name 16'},
          {id: '17', name: 'name 17'},
          {id: '18', name: 'name 18'},
          {id: '19', name: 'name 19'},
          {id: '20', name: 'name 20'},
          {id: '21', name: 'name 21'},
          {id: '22', name: 'name 22'},
          {id: '23', name: 'name 23'},
          {id: '24', name: 'name 24'},
          {id: '25', name: 'name 25'},
          {id: '26', name: 'name 26'},
          {id: '27', name: 'name 27'},

          {id: '28', name: 'name 28'},
          {id: '29', name: 'name 29'},
          {id: '30', name: 'name 30'},
          {id: '31', name: 'name 31'},
          {id: '32', name: 'name 32'},
          {id: '33', name: 'name 33'},
          {id: '34', name: 'name 34'},
          {id: '35', name: 'name 35'},
          {id: '36', name: 'name 36'},
          {id: '37', name: 'name 37'},
          {id: '38', name: 'name 38'},
          {id: '39', name: 'name 39'},
          {id: '40', name: 'name 40'},
          {id: '41', name: 'name 41'},
          {id: '42', name: 'name 42'},
          {id: '43', name: 'name 43'},
          {id: '44', name: 'name 44'},
          {id: '45', name: 'name 45'},
          {id: '46', name: 'name 46'},
          {id: '47', name: 'name 47'},
          {id: '48', name: 'name 48'},
          {id: '49', name: 'name 49'},
          {id: '50', name: 'name 50'},
          {id: '51', name: 'name 51'},
          {id: '52', name: 'name 52'},
          {id: '53', name: 'name 53'},
          {id: '54', name: 'name 54'},
          {id: '55', name: 'name 55'},
      ]
    }
  }

  @Get('vm/:id/agent') getAgent(@Res() response: Response){
    // return response.status
    // response.status(HttpStatus.NOT_FOUND).send({});
    response.status(HttpStatus.OK).send(testAgent);
  } 
  @Post('vm/:id/agent') createAgent(@Body() body: any){
    return {
        compliance: {
          enabled: true,
          interval: '* * * ',
          timeout: 7777
        },
        inventory: {
            dirs_skip: ['var/lib', 'var/logs'],
            enabled: false,
            interval: '* * ',
            timeout: 123
        },
        oauth:{
          client_id: 'id client',
          client_secret: '1233456456'
        }
    }
  } 
}


const testAgent = {
    compliance: {
        enabled: true,
        interval: '* * * * *',
        timeout: 7200000000000
    },
    host: {
        architecture: 'amd64',
        hostname: 'spb99-at',
        ip: ['127.0.0.1', '10.56.0.0'],
        os: {
            kernel_version: '5.65.0',
            name: 'debian', 
            type: 'linux',
            version: 'version'
        }
    },
    inventory: {
        dirs_skip: ['var/lib', 'var/logs'],
        enabled: true,
        interval: '* * * * *',
        timeout: 7200000000000
    },
    last_ping: '2025-10-31 15:36:21',
    version: '1.0.0'
}