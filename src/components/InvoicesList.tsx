import type { InvoiceType } from "../types/InvoiceType";
import InvoicesListItem from "./InvoicesListItem";

type InvoiceListType = {
    invoices: InvoiceType[],
    remove: (idInvoice: string) => void,
    edit: ()=>void
}

function InvoicesList({invoices, remove, edit}: InvoiceListType) {
    if(invoices.length === 0) return <img src="illustration-empty.svg" alt="" />;
    return (  
        <div className="invoiceList">
            {
                invoices.map((invoice) => 
                    <InvoicesListItem invoiceData={invoice} remove={remove} edit={edit}/>
                )
            }
        </div>
    );
}

export default InvoicesList;