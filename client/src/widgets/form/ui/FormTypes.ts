import type { FormType, InvoiceType } from "../../../shared/types/InvoiceType"

export type InvoiceFormType = {
    addNewInvoice: (newInvoice: InvoiceType)=>void,
    initialInvoice: FormType,
    closeModal: () => void
}
export type ValuesType = Omit<FormType, 'status'>;
export type FormSavingModeType = 'pending' | 'draft' | undefined