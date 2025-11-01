export type InvoiceType = {
    id: string, //
    status: StatusType,
    billFrom: AddressType,
    billTo: {
        name: string,
        email: string
    } & AddressType,
    invoiceDate: string,
    paymentTerms: string,
    paymentDue: string, //
    projectDescription: string,
    amountDue: number, //
    items: ItemType[]
}
export type FormType = Omit<InvoiceType, 'id'|'paymentDue'|'amountDue'>

type AddressType = {
    street: string,
    city: string,
    postCode: string,
    country: string
}

export type ItemType = {
    id: number,
    name: string, 
    quantity: number,
    price: number,
    total: number
}

export type StatusType = 'pending' | 'paid' | 'draft';

export type InvoiceContextType = {
    storage: InvoiceType [], 
    add: (newInvoice: InvoiceType) => void, 
    remove: (id: string) => void, 
    edit: (editInvoice: InvoiceType)=>void
}