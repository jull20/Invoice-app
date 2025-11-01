import type { FormType } from "../types";

export const emptyFormValues: FormType = {
    status: 'pending',
    billFrom: {
        street: '',
        city: '',
        postCode: '',
        country: '',   
    },
    billTo: {
        name: '',
        email: '',
        street: '',
        city: '',
        postCode: '',
        country: '',
    },
    invoiceDate: '',
    paymentTerms: '',
    projectDescription: '',
    items: []
}