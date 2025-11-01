import { useEffect, useState } from "react";
import type { InvoiceContextType, InvoiceType } from "../../types";
import { getAll } from "../../api/fetch/fetch";
import { emptyInvoice } from "../../constants/emptyInvoice.constant";

export function useInvoice(): InvoiceContextType {
    const [storage, setStorage] = useState<InvoiceType[]>([]); // сюда приходят сокращенные данные
    // const [currInvoice, setCurrInvoice] = useState<InvoiceType>(emptyInvoice)
    useEffect(() => {
        console.log('')
        getAll((invoicesArr) => setStorage(invoicesArr))
    }, [])
    
    const add = (newInvoice: InvoiceType) => {
        setStorage([...storage, newInvoice]);
    }
    const remove = (id: string) => {
        setStorage(storage.filter((invoice) => invoice.id !== id))
    }
    const edit = (updateInvoice: InvoiceType) => {
        const kek =  storage.find((invoice) => invoice.id !== updateInvoice.id)
        for(let prop in kek){

        }
        // kek.push(updateInvoice)
        // setStorage(kek)
    }
    return {storage, add, remove, edit};
} 
