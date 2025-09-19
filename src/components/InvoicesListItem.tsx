import { useNavigate } from "react-router";
import type { InvoiceType } from "../types/InvoiceType";
import { getThemeContext } from "../utils/utilityFunctions";
import { ArrowRightImgSvg } from "./UI/svgImgCode/svgImgCode";

type InvoiceListItemType = {
    invoiceData: InvoiceType,
    remove: (idInvoice: string) => void,
    edit: ()=>void
}

function InvoicesListItem({invoiceData, remove, edit}: InvoiceListItemType) {
    const theme = getThemeContext();
    const navigate = useNavigate();
    return (  
        <div className={`invoicesListItem invoicesListItem_theme_${theme}`}>
            <p>{invoiceData.id}</p>
            <p>{invoiceData.invoiceDate}</p>
            <p>{invoiceData.billTo.name}</p>
            <p>{invoiceData.items[0].price}</p>
            <p>{invoiceData.status}</p>
            <ArrowRightImgSvg/>
            <button onClick={() => navigate(`${invoiceData.id}`)}>To deatil</button>
        </div>
    );
}

export default InvoicesListItem;