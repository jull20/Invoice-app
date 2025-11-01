import type { FormType, InvoiceType } from "../../../shared/types/invoice/invoice.type"

export type InvoiceFormType = {
    addNewInvoice: (newInvoice: InvoiceType)=>void,
    initialInvoice: FormType,
    closeModal: () => void
}
export type FormSavingModeType = 'pending' | 'draft' | undefined