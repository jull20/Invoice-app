import { useLocation, useParams } from "react-router";
import "./invoice-page.scss"
import { useEffect, useState } from "react";
import type { InvoiceType } from "../../../../shared/types/invoice/invoice.type";
import { getOne } from "../../../../shared/api/fetch/fetch";
import { getInvoiceContext, getModalContext, getThemeContext } from "../../../../shared/contexts";
import { Address, BackButton, ControlPanel, Name, InvoiceDate, PaymentDue, Email, BillTo, TableOfItems } from "../components";
import { SideModal } from "../../../../shared/ui";
import { InvoiceForm } from "../../../../widgets/form";
import { emptyInvoice } from "../../../../shared/constants/emptyInvoice.constant";

export function InvoicePage() {
    const theme          = getThemeContext();
    const {id}           = useParams();
    const {sideModal}    = getModalContext();
    const [invoice, setInvoice] = useState<InvoiceType>(emptyInvoice);
    // const {storage, remove, edit} = getInvoiceContext();

    useEffect(() => {
        if(id) getOne(id, (invoice) => setInvoice(invoice))
    }, [])
    return (
        <section className="invoicePage" id="thisPlace">
            <BackButton />
            <ControlPanel 
                status={invoice.status ?? 'pending'}
                handleEdit={sideModal.open}
            />
            <div className={`invoicePage__info invoicePage__info_theme_${theme}`}>
                <Name 
                    id={invoice.id}
                    projectDescription={invoice.projectDescription}
                />
                <Address 
                    className="invoicePage__billFrom"
                    street=  {invoice.billTo.street  }
                    city=    {invoice.billTo.city    }
                    postCode={invoice.billTo.postCode}
                    country= {invoice.billTo.country }
                />
                <InvoiceDate invoiceDate={invoice.invoiceDate} />
                <PaymentDue paymentDue={invoice.paymentDue} />
                <BillTo 
                    name={invoice.billTo.name}
                    address={
                        <Address 
                            className="invoicePage__billTo"
                            street=  {invoice.billFrom.street}
                            city=    {invoice.billFrom.city}
                            postCode={invoice.billFrom.postCode}
                            country= {invoice.billFrom.country}
                        />
                    }
                />
                <Email email={invoice.billTo.email} />
                <TableOfItems 
                    items={invoice.items}
                    amountDue={invoice.amountDue}
                />
            </div>
            {
                sideModal.isVisible &&
                <SideModal isVisible={sideModal.isVisible} onClose={sideModal.close}>
                    <InvoiceForm 
                        type="edit" 
                        invoice={invoice} 
                        editInvoice={(invoice: InvoiceType) => setInvoice(invoice)} 
                        closeModal={sideModal.close}/> 
                </SideModal>
            }
        </section>
    );
}