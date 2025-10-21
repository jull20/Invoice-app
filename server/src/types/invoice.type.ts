export type InvoiceType = {
    id: string,
    status: StatusType,
    billFrom: AddressType,
    billTo: {
        name: string,
        email: string
    } & AddressType,
    invoiceDate: string,
    paymentTerms: number,
    projectDescription: string,
    items: ItemType[]
}

export type InvoiceType2 = {
    id: string,
    status: StatusType,
    billFrom: AddressType,
    billTo: {
        name: string,
        email: string
    } & AddressType,
    invoiceDate: string,
    paymentDue: number,
    projectDescription: string,
    amountDue: number,
    items: ItemType[]
}

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

export type AbbreviatedInvoiceType = {
    id: string,
    status: StatusType,
    name: string,
    invoiceDate: string,
}
export type NewInvoiceType = Omit<InvoiceType, 'id'>;