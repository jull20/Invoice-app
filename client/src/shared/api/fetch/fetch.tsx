import type { FormType, InvoiceType } from "../../types/invoice/invoice.type";

const SERVER_URL = 'http://localhost:8080';


function isInvocieType(value: unknown): value is InvoiceType{
  if(typeof value === 'object' && value){
    const invoiceKeys: (keyof InvoiceType)[] = ["id", "status", "billFrom", "billTo", "invoiceDate", "paymentTerms", "paymentDue", "projectDescription", "amountDue", "items"]
    for(let i=0; i<invoiceKeys.length; i++){
      if(invoiceKeys[i] in value === false) return false;
    }
    return true;
  }
  else return false;
} 


export function create(newInvoice: FormType, createInvoice: (invoice: InvoiceType) => void){
  // console.log(newInvoice)
  fetch(SERVER_URL + '/api/invoices', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newInvoice)
  })
  .then(response => {
    if(response.ok) return response.json()
    else throw new Error(`Create Fail: ${response.status} ${response.statusText}`)
  })
  .then(data => {
    if(isInvocieType(data)){
      createInvoice(data)
    }
  })
  .catch(error => {
    console.log(error)
  })
}

export function createDraft(newDraft: FormType, createInvoice: (draft: InvoiceType) => void){
  fetch(SERVER_URL + '/api/draft', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newDraft)
  })
  .then(response => {
    if(response.ok) return response.json()
    else throw new Error(`Create Fail: ${response.status} ${response.statusText}`)
  })
  .then(data => {
    if(isInvocieType(data)){
      createInvoice(data)
    }
    // console.log(data)
  })
  .catch(error => {
    console.log(error)
  })
}

export function getAll(getInvoices: (invoices: InvoiceType[]) => void){
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
    if(isInvocieType(data)){
      getInvoice(data)
    }
  })
  .catch(error => console.log(error))
}

export function update(editInvoice: InvoiceType, edit: (editInvoice: InvoiceType) => void){
  fetch(SERVER_URL + '/api/invoices', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(editInvoice)
  })
  .then(res => {
    if(res.ok) return res.json()
    else throw new Error(`Create Fail: ${res.status} ${res.statusText}`)
  })
  .then(data => {
    if(isInvocieType(data)){
      edit(data)
    }
  })
  .catch(error => {
    console.log(error)
  })
}