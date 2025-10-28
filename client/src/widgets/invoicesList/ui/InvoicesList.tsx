import type { InvoiceType } from "../../../shared/types/InvoiceType";
import { InvoicesListItem } from "../../invoicesListItem/ui/InvoicesListItem";
import { NotificationAboutEmpty } from "../../notificationAboutEmpty";
import "./invoicesList.scss"

export function InvoicesList({invoices}: {invoices: InvoiceType[]}) {
    if(invoices.length === 0) return <NotificationAboutEmpty/>
    return (  
        <div className="invoicesList">
            {
                invoices.map((invoice) => 
                    <InvoicesListItem invoiceData={invoice}/>
                )
            }
        </div>
    );
}

export default InvoicesList;