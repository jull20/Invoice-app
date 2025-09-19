import { useState } from "react";
import InvoicesHeader from "../components/InvoicesHeader";
import InvoicesList from "../components/InvoicesList";
import type { InvoiceType } from "../types/InvoiceType";
import MyModal from "../components/UI/modal/MyModal";
import InvoiceForm from "../components/InvoiceForm";


function useInvoice():  [InvoiceType[], (newInvoice: InvoiceType) => void, (idInvoice: string) => void, ()=>void]{
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


export default function Invoices(){
    const [invoices, addInvoice, removeInvoice, editInvoice] = useInvoice();
    const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);

    return(
        <section className="invoices">
            <InvoicesHeader onOpen={() => setModalIsVisible(true)}/>
            <InvoicesList 
                invoices={invoices}
                remove={removeInvoice}
                edit={editInvoice}
              />
            <MyModal isVisible={modalIsVisible} onClose={() => setModalIsVisible(false)}>
                <InvoiceForm addNewInvoice={addInvoice} initialInvoice={emptyInvoice}/>
            </MyModal>
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

    }
]