import type { InvoiceType } from "../../../shared/types/InvoiceType"

export type InvoiceFormType = {
    addNewInvoice: (newInvoice: InvoiceType)=>void,
    initialInvoice: InvoiceType
}
export type ValuesType = Omit<InvoiceType, 'id' | 'status'>;
// {
//     streetFrom: string;
//     cityFrom: string;
//     postCodeFrom: string;
//     countryFrom: string;
//     name: string;
//     email: string;
//     streetTo: string;
//     cityTo: string;
//     postCodeTo: string;
//     countryTo: string;
//     invoiceDate: string;
//     paymentTerms: number;
//     projectDescription: string;
//     items: {name: string, quantity: string, price: string, total: string}[]
// }