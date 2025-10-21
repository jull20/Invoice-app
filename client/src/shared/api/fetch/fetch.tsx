import type { InvoiceType } from "../../types/InvoiceType";

const SERVER_URL = 'http://localhost:5000';

export function create(newInvoice: Omit<InvoiceType, 'id'>){
  fetch(SERVER_URL + '/api/invoices', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newInvoice)
  })
  .then(response => {
    if(response.ok) return response.text()
    else throw new Error('error')
  })
  .then(data => {
    console.log(data)
    //   setStorage([...storage, postForm])
    //   setShowPostForm(false)
    //   setPostForm(empty)
  })
  .catch(error => {
    console.log(error)
  })
}

