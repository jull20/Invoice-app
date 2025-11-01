import { getThemeContext } from '../../../../../shared/contexts';
import type { InvoiceType } from '../../../../../shared/types';
import './invoiceDate.scss'

export function InvoiceDate ({invoiceDate}: Pick<InvoiceType, 'invoiceDate'>) {
    const theme = getThemeContext();
    return (
        <div className="invoicePage__date">
            <p className={`invoicePage__date-title invoicePage__date-title_theme_${theme}`}>
                Invoice Date
            </p>
            <p className={`invoicePage__date-value invoicePage__date-value_theme_${theme}`}>
                {invoiceDate}
            </p>
        </div>
    );
}
