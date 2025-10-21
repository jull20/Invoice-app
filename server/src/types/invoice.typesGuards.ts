import { InvoiceType } from "./invoice.type";

export function isNewInvoice(value: unknown): value is Omit<InvoiceType, 'id'> {

    return true;
}