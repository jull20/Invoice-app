import { useLocation, useNavigate } from "react-router";
import { ArrowLeftImgSvg, Button, Status, TableHeader } from "../../../shared/ui";
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
    const theme = getThemeContext();
    return(
        <div className={className}>
            <div className={`${className}-street   ${className}-street_theme_${theme}`}>{street}</div>
            <div className={`${className}-city     ${className}-city_theme_${theme}`}>{city}</div>
            <div className={`${className}-postCard ${className}-postCard_theme_${theme}`}>{postCode}</div>
            <div className={`${className}-country  ${className}-country_theme_${theme}`}>{country}</div>
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

    const handleEdit = () => {

    }

    return (
        <section className="invoiceDetail">
            <div className="invoiceDetail__backBtn">
                <Button type='button' style="none" onClick={() => navigate('/')}>
                    <div>
                        <ArrowLeftImgSvg/>
                        Go Back
                    </div>
                </Button>
            </div>
            <div className={`controlPanel controlPanel_theme_${theme}`}>
                <div className="controlPanel__status">
                    <p className="controlPanel__status-title">Status</p>
                    <Status statusType={invoice?.status ?? 'pending'} />
                </div>
                <div className="controlPanel__controlBtns">
                    <Button type='button' style="chameleon" onClick={handleEdit} >Edit</Button>
                    <Button type='button' style='red'      >Delete      </Button>
                    <Button type='button' style="purple"   >Mark as Paid</Button>
                </div>
            </div>

            <div className={`invoiceDetail__info invoiceDetail__info_theme_${theme}`}>
                <div className="invoiceDetail__id-description-wrapper">
                    <p className={`invoiceDetail__id invoiceDetail__id_theme_${theme}`}><span>#</span>{invoice?.id}</p>
                    <p className={`invoiceDetail__projectDescription invoiceDetail__projectDescription_theme_${theme}`}>{invoice?.projectDescription}</p>
                </div>
                <Address 
                    className="invoiceDetail__billFrom"
                    street={invoice?.billTo.street ?? ''}
                    city={invoice?.billTo.city ?? ''}
                    postCode={invoice?.billTo.postCode ?? ''}
                    country={invoice?.billTo.country ?? ''}
                />
                <div className="invoiceDetail__date">
                    <p className={`invoiceDetail__date-title invoiceDetail__date-title_theme_${theme}`}>Invoice Date</p>
                    <p className={`invoiceDetail__date-value invoiceDetail__date-value_theme_${theme}`}>{invoice?.invoiceDate}</p>
                </div>
                <div className="invoiceDetail__paymentDue">
                    <p className={`invoiceDetail__paymentDue-title invoiceDetail__paymentDue-title_theme_${theme}`}>Payment Due</p>
                    <p className={`invoiceDetail__paymentDue-value invoiceDetail__paymentDue-value_theme_${theme}`}>{invoice?.paymentDue}</p>
                </div>

                <div className="invoiceDetail__billTo-name-wrapper">
                    <p className={`invoiceDetail__billTo-title invoiceDetail__billTo-title_theme_${theme}`}>Bill To</p>
                    <div className={`invoiceDetail__name invoiceDetail__name_theme_${theme}`}>{invoice?.billTo.name}</div>
                    <Address 
                        className="invoiceDetail__billTo"
                        street={invoice?.billFrom.street ?? ''}
                        city={invoice?.billFrom.city ?? ''}
                        postCode={invoice?.billFrom.postCode ?? ''}
                        country={invoice?.billFrom.country ?? ''}
                    />
                </div>
                <div className="invoiceDetail__email">
                    <p className={`invoiceDetail__email-title invoiceDetail__email-title_theme_${theme}`}>Sent to</p>
                    <p className={`invoiceDetail__email-value invoiceDetail__email-value_theme_${theme}`}>{invoice?.billTo.email}</p>
                </div>

                <div className='invoiceDetail__items' >
                    <div className={`invoiceDetail__table invoiceDetail__table_theme_${theme}`}>
                        <TableHeader className="invoiceDetail__table-header"/>
                        <div className="invoiceDetail__table-items">
                            {
                                invoice?.items.map((item, index) => {
                                    return(
                                        <div className={`invoiceDetail__table-item invoiceDetail__table-item_theme_${theme}`} key={index}>
                                            <p className="invoiceDetail__table-item-name">{item.name}</p> 
                                            <p className="invoiceDetail__table-item-quantity">{item.quantity}</p> 
                                            <p className="invoiceDetail__table-item-price">£ {(item.price).toFixed(2)}</p> 
                                            <p className="invoiceDetail__table-item-total">£ {(item.total).toFixed(2)}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className={`invoiceDetail__amount invoiceDetail__amount_theme_${theme}`}>
                        <span className="invoiceDetail__amount-title">Amount Due</span>
                        <span className="invoiceDetail__amount-value">£ {invoice?.amountDue.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </section>
    );
}