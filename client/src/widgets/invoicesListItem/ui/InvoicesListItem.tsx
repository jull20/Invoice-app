import { useNavigate } from "react-router";
import { ArrowRightImgSvg, Status } from "../../../shared/ui";
import "./invoicesListItem.scss"
import type { AbbreviatedInvoiceType } from "../../../shared/types/invoice/invoice.type";
import { getThemeContext } from "../../../shared/contexts";

export function InvoicesListItem({invoiceData}: {invoiceData: AbbreviatedInvoiceType}) {
    const theme = getThemeContext();
    const navigate = useNavigate();
    const {id, paymentDue, name, amountDue, status} = invoiceData;
    return (  
        <div 
            className={`invoicesListItem invoicesListItem_theme_${theme}`}
            onClick={() => navigate(`${id}`)}
        >
            <p className={`invoicesListItem__id invoicesListItem__id_theme_${theme}`}>
                <span>#</span>{id}
            </p>
            <p className={`invoicesListItem__invoiceDate invoicesListItem__invoiceDate_theme_${theme}`}>
                Due  {paymentDue}
            </p>
            <p className={`invoicesListItem__client-name invoicesListItem__client-name_theme_${theme}`}>
                {name}
                </p>
            <p className={`invoicesListItem__price invoicesListItem__price_theme_${theme}`}>
                £ {amountDue ?? 0}
            </p>
            <div className="invoicesListItem__status"><Status statusType={status} /></div>
            <div className="invoicesListItem__arrow"><ArrowRightImgSvg/></div>
        </div>
    );
}
