import { useLocation, useNavigate } from "react-router";
import { ArrowLeftImgSvg, Button, Status, TableOfInvoiceItems } from "../../../shared/ui";
import "./invoice-page.scss"
import { getThemeContext } from "../../../shared/api";
import { useEffect, useState } from "react";
import type { InvoiceType } from "../../../shared/types/InvoiceType";
import { getOne } from "../../../shared/api/fetch/fetch";

type AddressType = {
    className: string,
    street: string,
    city: string,
    postCode: string,
    country: string,
}

function Address({className, street, city, postCode, country}: AddressType){
    const rootClass = `invoice-${className}`
    return(
        <div className={rootClass}>
            <div className="invoiceBillTo__street">{street}</div>
            <div className="invoiceBillTo__city">{city}</div>
            <div className="invoiceBillTo__postCard">{postCode}</div>
            <div className="invoiceBillTo__country">{country}</div>
        </div>
    )
}

export function InvoicePage() {
    const theme = getThemeContext();
    const navigate = useNavigate();
    const location = useLocation();
    const [invoice, setInvoice] = useState<InvoiceType>();
    useEffect(() => {
        getOne(location.pathname.slice(1), (invoice) => setInvoice(invoice))
    }, [])

    return (
        <section className="invoiceDetail">
            <div className="invoiceDetail__backBtn">
                <Button type='button' style="none" onClick={() => navigate('/')}><>
                    <ArrowLeftImgSvg/>
                    Go Back
                </></Button>
            </div>
            <div className={`controlPanel controlPanel_theme_${theme}`}>
                <div className="controlPanel__status">
                    <p className="controlPanel__status-title">Status</p>
                    <Status statusType={invoice?.status ?? 'pending'} />
                </div>
                <div className="controlPanel__controlBtns">
                    <Button type='button' style="chameleon">Edit        </Button>
                    <Button type='button' style='red'      >Delete      </Button>
                    <Button type='button' style="purple"   >Mark as Paid</Button>
                </div>
            </div>
            <div className={`invoiceDetail__info invoiceDetail__info_theme_${theme}`}>
                <div className="invoice-id">{invoice?.id}</div>
                <div className="invoice-projectDescription">{invoice?.projectDescription}</div>
                <Address 
                    className="billTo"
                    street={invoice?.billTo.street ?? ''}
                    city={invoice?.billTo.city ?? ''}
                    postCode={invoice?.billTo.postCode ?? ''}
                    country={invoice?.billTo.country ?? ''}
                />
                <div className="invoice-date">{invoice?.invoiceDate}</div>
                <div className="invoice-paymentDue">{invoice?.paymentDue}</div>
                <div className="invoice-name">{invoice?.billTo.name}</div>
                <Address 
                    className="billFrom"
                    street={invoice?.billFrom.street ?? ''}
                    city={invoice?.billFrom.city ?? ''}
                    postCode={invoice?.billFrom.postCode ?? ''}
                    country={invoice?.billFrom.country ?? ''}
                />
                <div className="invoice-email">{invoice?.billTo.email}</div>

                <div className={`invoiceDetail__items invoiceDetail__items_theme${theme}`} >
                    <TableOfInvoiceItems>
                        <div className="table__items">
                            {
                                invoice?.items.map((item, index) => 
                                    <div className="table__item" key={index}>
                                        {item.name} {item.quantity} {item.price} {item.total}
                                    </div>
                                )
                            }
                        </div>
                    </TableOfInvoiceItems>
                </div>
                <div className="invoice-amount">{invoice?.amountDue}</div>
                
            </div>
        </section>
    );
}


// id: 'XM9141',
// status: 'pending',
// billFrom: {
//     street: '19 Union Terrace',
//     city: 'London',
//     postCode: 'E1 3EZ',
//     country: 'United Kingdom'
// },
// billTo: {
//     name: 'Alex Grim',
//     email: 'alexgrim@mail.com',
//     street: '84 Church Way',
//     city: 'Bradford',
//     postCode: 'BD1 9PB',
//     country: 'United Kingdom'
// },
// invoiceDate: '21 Aug 2021',
// paymentTerms: '30',
// projectDescription: 'Graphic Design',
// items: [
//     {
//         id: 0,
//         name: 'Banner Design', 
//         quantity: 1,
//         price: 156,
//         total: 156
//     }
// ]