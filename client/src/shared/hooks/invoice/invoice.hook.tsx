import { useEffect, useState } from "react";
import type { InvoiceContextType } from "../../types";
import { getAll } from "../../api/fetch/fetch";
import type { AbbreviatedInvoiceType } from "../../types/invoice/invoice.type";

export function useInvoice(): InvoiceContextType {
    const [storage, setStorage] = useState<AbbreviatedInvoiceType[]>([]); // сюда приходят сокращенные данные
    useEffect(() => {
        getAll((invoicesArr) => setStorage(invoicesArr))
    }, [])
    
    const addToStorage = (newInvoice: AbbreviatedInvoiceType) => {
        setStorage([...storage, newInvoice]);
    }
    const removeFromStorage = (id: string) => {
        setStorage(storage.filter((invoice) => invoice.id !== id))
    }
    const editStorage = (updateInvoice: AbbreviatedInvoiceType) => {
        const invoiceForEdit = storage.find((invoice) => invoice.id === updateInvoice.id);
        let prop: keyof AbbreviatedInvoiceType;
        if(invoiceForEdit){
            for(prop in invoiceForEdit){
                if(invoiceForEdit[prop] !== updateInvoice[prop]){
                    Object.defineProperty(invoiceForEdit, prop, {value: updateInvoice[prop]})
                }
            }
        }
    }
    return {storage, addToStorage, removeFromStorage, editStorage};
} 
