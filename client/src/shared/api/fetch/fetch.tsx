import type { AbbreviatedInvoiceType, FormType, InvoiceType } from "../../types/invoice/invoice.type";

const SERVER_URL = import.meta.env.VITE_API_URL;


function isInvoiceType(value: unknown): value is InvoiceType{
  if(typeof value === 'object' && value){
    const invoiceKeys: (keyof InvoiceType)[] = ["id", "status", "billFrom", "billTo", "invoiceDate", "paymentTerms", "paymentDue", "projectDescription", "amountDue", "items"]
    for(let i=0; i<invoiceKeys.length; i++){
      if(invoiceKeys[i] in value === false) return false;
    }
    return true;
  }
  else return false;
} 

const initRequest = (method: 'PUT'|'POST'|'GET'|'DELETE', body: Partial<InvoiceType>) => {
  return {
    method: method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  }
}

export function create(newInvoice: FormType, createInvoice: (invoice: AbbreviatedInvoiceType) => void){
  // console.log(newInvoice)
  fetch(SERVER_URL + '/api/invoices', initRequest('POST', newInvoice))
  .then(response => {
    if(response.ok) return response.json()
    else throw new Error(`Create Fail: ${response.status} ${response.statusText}`)
  })
  .then(data => {
    console.log(data)
    createInvoice(data)
    // if(isInvoiceType(data)){
    // }
  })
  .catch(error => console.log(error))
}

export function createDraft(newDraft: FormType, createInvoice: (draft: InvoiceType) => void){
  fetch(SERVER_URL + '/api/draft', initRequest('POST', newDraft))
  .then(response => {
    if(response.ok) return response.json()
    else throw new Error(`Create Fail: ${response.status} ${response.statusText}`)
  })
  .then(data => {
    if(isInvoiceType(data)){
      createInvoice(data)
    }
    // console.log(data)
  })
  .catch(error => {
    console.log(error)
  })
}

export function getAll(getInvoices: (invoices: AbbreviatedInvoiceType[]) => void){
  fetch(SERVER_URL + '/api/invoices')
  .then(res => {
    if(res.ok) return res.json()
    else throw new Error(`GetAll Fail: ${res.status} ${res.statusText}`)
  })
  .then(data => {
    // console.log(data)
    getInvoices(data)
  })
}

export function getOne(invoiceId: string, getInvoice: (invoice: InvoiceType) => void){
  fetch(SERVER_URL + `/api/invoices/${invoiceId}`)
  .then(res => {
    if(res.ok) return res.json()
    else throw new Error(`GetOne Fail: ${res.status} ${res.statusText}`)
  })
  .then(data => {
    // console.log(data)
    if(isInvoiceType(data)){
      getInvoice(data)
    }
  })
  .catch(error => console.log(error))
}

export function update(changedFields: Partial<InvoiceType>, edit: (editInvoice: InvoiceType) => void){
  console.log('update', changedFields)
  fetch(SERVER_URL + '/api/invoices', initRequest('PUT', changedFields))
  .then(res => {
    if(res.ok) return res.json()
    else throw new Error(`Update Fail: ${res.status} ${res.statusText}`)
  })
  .then(data => {
    edit(data)
  })
  .catch(error => console.log(error))
}

export function deleteOne(invoiceId: string, remove: (id:string) => void){
  fetch(SERVER_URL + `/api/invoices/${invoiceId}`, {method: 'DELETE'})
  .then(response => {
    if(response.ok) {
      console.log('DELETE success')
      remove(invoiceId);
    }
    else throw new Error(`Create Fail: ${response.status} ${response.statusText}`)
  })
  .catch(error => console.log(error))
}