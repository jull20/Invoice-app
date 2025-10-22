import type { ReactNode } from "react";
import { getThemeContext } from "../../api";
import type { ThemeType } from "../../types/ThemeTypes";
import './tableOfInvoiceItems.scss'

export function TableOfInvoiceItems ({children}: {children: ReactNode}) {
    const theme: ThemeType = getThemeContext();
    return (  
        <div className="table">
            <p className={`table__header table__header_theme_${theme} table__header-itemName`}>  Item Name</p>
            <p className={`table__header table__header_theme_${theme} table__header-quantity`}>  Qty.</p>
            <p className={`table__header table__header_theme_${theme} table__header-price`}>     Price</p>
            <p className={`table__header table__header_theme_${theme} table__header-totalPrice`}>Total</p>
            {children}
        </div>

    );
}
