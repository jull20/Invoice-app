import { useNavigate } from "react-router";
import { getThemeContext } from "../../../shared/api";
import { ArrowRightImgSvg, Status } from "../../../shared/ui";
import "./invoicesListItem.scss"
import type { InvoiceType } from "../../../shared/types/InvoiceType";

export function InvoicesListItem({invoiceData}: {invoiceData: InvoiceType}) {
    const theme = getThemeContext();
    const navigate = useNavigate();
    return (  
        <div 
            className={`invoicesListItem invoicesListItem_theme_${theme}`}
            onClick={() => navigate(`${invoiceData.id}`)}
        >
            <p className={`invoicesListItem__id invoicesListItem__id_theme_${theme}`}>
                <span>#</span>{invoiceData.id}
            </p>
            <p className={`invoicesListItem__invoiceDate invoicesListItem__invoiceDate_theme_${theme}`}>
                Due  {invoiceData.invoiceDate}
            </p>
            <p className={`invoicesListItem__client-name invoicesListItem__client-name_theme_${theme}`}>
                {invoiceData.billTo.name}
                </p>
            <p className={`invoicesListItem__price invoicesListItem__price_theme_${theme}`}>
                £ {invoiceData.items[0]?.price ?? 0}
            </p>
            <div className="invoicesListItem__status"><Status statusType={invoiceData.status} /></div>
            <div className="invoicesListItem__arrow"><ArrowRightImgSvg/></div>
        </div>
    );
}
