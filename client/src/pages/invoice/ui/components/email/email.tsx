import { getThemeContext } from "../../../../../shared/contexts"
import type { InvoiceType } from "../../../../../shared/types";
import './email.scss'

export function Email({email}: Pick<InvoiceType['billTo'], 'email'>){
    const theme = getThemeContext();
    return(
        <div className="invoicePage__email">
            <p className={`invoicePage__email-title invoicePage__email-title_theme_${theme}`}>
                Sent to
            </p>
            <p className={`invoicePage__email-value invoicePage__email-value_theme_${theme}`}>
                {email}
            </p>
        </div>        
    )
}