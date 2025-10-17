import { useEffect, useState } from "react";
import './home-page.scss'
import type { InvoiceType } from "../../../shared/types/InvoiceType";
import { InvoicesControlPanel } from "../../../widgets/invoicesControlPanel";
import { InvoicesList } from "../../../widgets/invoicesList";
import { Modal } from "../../../shared/ui";
import { InvoiceForm } from "../../../widgets/form";

function useInvoice():  [InvoiceType [], (newInvoice: InvoiceType) => void, (idInvoice: string) => void, ()=>void]{
    const [invoices, setInvoices] = useState<InvoiceType[]>(invoicesEl);

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

const emptyInvoice: InvoiceType = {
    id:     '',
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
    paymentTerms: '',
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



const invoicesEl: InvoiceType[] = [
    {
        id: 'XM9141',
        status: 'pending',
        billFrom: {
            street: '19 Union Terrace',
            city: 'London',
            postCode: 'E1 3EZ',
            country: 'United Kingdom'
        },
        billTo: {
            name: 'Alex Grim',
            email: 'alexgrim@mail.com',
            street: '84 Church Way',
            city: 'Bradford',
            postCode: 'BD1 9PB',
            country: 'United Kingdom'
        },
        invoiceDate: '21 Aug 2021',
        paymentTerms: '30',
        projectDescription: 'Graphic Design',
        items: [
            {
                id: 0,
                name: 'Banner Design', 
                quantity: 1,
                price: 156,
                total: 156
            }

        ]
    },
    {
        id: 'SL12178',
        status: 'paid',
        billFrom: {
            street: '19 Union Terrace',
            city: 'London',
            postCode: 'E1 3EZ',
            country: 'United Kingdom'
        },
        billTo: {
            name: 'Alex Grim',
            email: 'alexgrim@mail.com',
            street: '84 Church Way',
            city: 'Bradford',
            postCode: 'BD1 9PB',
            country: 'United Kingdom'
        },
        invoiceDate: '21 Aug 2021',
        paymentTerms: '30',
        projectDescription: 'Graphic Design',
        items: [
            {
                id: 0,
                name: 'Banner Design', 
                quantity: 1,
                price: 156,
                total: 156
            }

        ]

    },
        {
        id: 'KW1217',
        status: 'draft',
        billFrom: {
            street: '19 Union Terrace',
            city: 'London',
            postCode: 'E1 3EZ',
            country: 'United Kingdom'
        },
        billTo: {
            name: 'Alex Grim',
            email: 'alexgrim@mail.com',
            street: '84 Church Way',
            city: 'Bradford',
            postCode: 'BD1 9PB',
            country: 'United Kingdom'
        },
        invoiceDate: '21 Aug 2021',
        paymentTerms: '30',
        projectDescription: 'Graphic Design',
        items: [
            {
                id: 0,
                name: 'Banner Design', 
                quantity: 1,
                price: 156,
                total: 156
            }

        ]

    },
]