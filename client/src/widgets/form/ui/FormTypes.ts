import type { InvoiceType } from "../../../shared/types/InvoiceType"

export type InvoiceFormType = {
    addNewInvoice: (newInvoice: InvoiceType)=>void,
    initialInvoice: InvoiceType,
    closeModal: () => void
}
export type ValuesType = Omit<InvoiceType, 'id' | 'status'>;
export type FormSavingModeType = 'pending' | 'draft' | undefined