import { getThemeContext } from '../../../../../shared/contexts'
import type { InvoiceType } from '../../../../../shared/types'
import './paymentDue.scss'

export function PaymentDue({paymentDue}: Pick<InvoiceType, 'paymentDue'>){
    const theme = getThemeContext()
    return(
        <div className="invoicePage__paymentDue">
            <p className={`invoicePage__paymentDue-title invoicePage__paymentDue-title_theme_${theme}`}>
                Payment Due
            </p>
            <p className={`invoicePage__paymentDue-value invoicePage__paymentDue-value_theme_${theme}`}>
                {paymentDue}
            </p>
        </div>
    )
}