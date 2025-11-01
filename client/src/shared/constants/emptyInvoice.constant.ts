import type { InvoiceType } from "../types";

export const emptyInvoice: InvoiceType = {
    id: 'string',
    status: 'pending',
    billFrom: {
        city: '',
        country: '',
        postCode: '',
        street: '',
    },
    billTo: {
        name:  '',
        email: '',
        city: '',
        country: '',
        postCode: '',
        street: '',
    },
    invoiceDate: '',
    paymentTerms: '',
    paymentDue: '',
    projectDescription: '',
    amountDue: 0,
    items: []
}