import type { ReactNode } from "react"
import type { InvoiceType } from "../../../../../shared/types"
import { getThemeContext } from "../../../../../shared/contexts"
import './billTo.scss'

export function BillTo({name, address}: Pick<InvoiceType['billTo'], 'name'> & {address: ReactNode}){
    const theme = getThemeContext();
    return(
        <div className="invoicePage__billTo-name-wrapper">
            <p className={`invoicePage__billTo-title invoicePage__billTo-title_theme_${theme}`}>Bill To</p>
            <div className={`invoicePage__name invoicePage__name_theme_${theme}`}>{name}</div>
            {address}
        </div>
    )
}