import { useEffect, useState } from "react";
import './home-page.scss'
import type { FormType, InvoiceType } from "../../../shared/types/InvoiceType";
import { InvoicesControlPanel } from "../../../widgets/invoicesControlPanel";
import { InvoicesList } from "../../../widgets/invoicesList";
import { Modal } from "../../../shared/ui";
import { InvoiceForm } from "../../../widgets/form";
import { getAll } from "../../../shared/api/fetch/fetch";

function useInvoice():  [InvoiceType [], (newInvoice: InvoiceType) => void, (idInvoice: string) => void, ()=>void]{
    const [invoices, setInvoices] = useState<InvoiceType[]>([]);

    useEffect(() => {
        getAll((invoicesArr) => setInvoices(invoicesArr))
    }, [])

    const addInvoice    = (newInvoice: InvoiceType) => {
        setInvoices([...invoices, newInvoice]);
    }
    const removeInvoice = (idInvoice: string) => {
        setInvoices(invoices.filter((invoice) => invoice.id !== idInvoice))
    }
    const editInvoice   = () => {
        
    }
    return [invoices, addInvoice, removeInvoice, editInvoice];
} 

const emptyInvoice: FormType = {
    status: 'draft',
    billFrom: {
        street:   '',
        city:     '',
        postCode: '',
        country:  ''
    },
    billTo: {
        name:     '',
        email:    '',
        street:   '',
        city:     '',
        postCode: '',
        country:  ''
    },
    invoiceDate:  '',
    paymentTerms: 0,
    projectDescription: '',
    items: []
}


export function HomePage(){
    const [invoices, addInvoice, removeInvoice, editInvoice] = useInvoice();
    const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);

    return(
        <section className="invoices">
            <InvoicesControlPanel invoicesQuan={invoices.length} onOpen={() => setModalIsVisible(true)}/>
            <InvoicesList 
                invoices={invoices}
            />
            
            <Modal isVisible={modalIsVisible} onClose={() => setModalIsVisible(false)}>
                <InvoiceForm addNewInvoice={addInvoice} initialInvoice={emptyInvoice} closeModal={() => setModalIsVisible(false)}/>
            </Modal>
        </section>
    )
}