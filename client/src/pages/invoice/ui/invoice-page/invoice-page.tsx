import { useNavigate, useParams } from "react-router";
import "./invoice-page.scss"
import { useEffect, useState } from "react";
import type { InvoiceType } from "../../../../shared/types/invoice/invoice.type";
import { deleteOne, getOne, update } from "../../../../shared/api/fetch/fetch";
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
    const {removeFromStorage, editStorage} = getInvoiceContext();
    const navigate = useNavigate();

    useEffect(() => {
        if(id) getOne(id, (invoice) => setInvoice(invoice))
    }, [])

    const handleEdit = (invoice: InvoiceType) => {
        editStorage({
            name:       invoice.billTo.name,
            id:         invoice.id,
            status:     invoice.status,
            paymentDue: invoice.paymentDue,
            amountDue:  invoice.amountDue,
        });
        setInvoice(invoice);
    }
    const handleRemove = () => {
        deleteOne(invoice.id, removeFromStorage);
        navigate('/')
    }
    const handleEditStatus = () => {
        update({ id: invoice.id, status: "paid" }, handleEdit);
    }
    return (
        <section className="invoicePage" id="thisPlace">
            <BackButton />
            <ControlPanel 
                status={invoice.status ?? 'pending'}
                edit={sideModal.open}
                remove={handleRemove}
                markAsPaid={handleEditStatus}
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
                        editInvoice={handleEdit} 
                        closeModal={sideModal.close}/> 
                </SideModal>
            }
        </section>
    );
}