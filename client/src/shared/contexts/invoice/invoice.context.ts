import { createContext, useContext } from "react";
import type { InvoiceContextType } from "../../types";

export const InvoiceContext = createContext<InvoiceContextType | null>(null);

export function getInvoiceContext(){
    const context = useContext(InvoiceContext);
    if(context) return context;
    else throw new Error('bad invoice context')
}