import { getThemeContext } from '../../../../../shared/contexts'
import type { InvoiceType } from '../../../../../shared/types';
import { TableHeader } from '../../../../../shared/ui'
import './tableOfItems.scss'

export function TableOfItems({items, amountDue}: Pick<InvoiceType, 'items' | 'amountDue'>){
    const theme = getThemeContext();
    return (
        <div className='invoicePage__items' >
            <div className={`invoicePage__table invoicePage__table_theme_${theme}`}>
                <TableHeader className="invoicePage__table-header"/>
                <div className="invoicePage__table-items">
                    {
                        items.map((item, index) => {
                            return(
                                <div className={`invoicePage__table-item invoicePage__table-item_theme_${theme}`} key={index}>
                                    <p className="invoicePage__table-item-name">{item.name}</p> 
                                    <p className="invoicePage__table-item-quantity">{item.quantity}</p> 
                                    <p className="invoicePage__table-item-price">£ {(item.price).toFixed(2)}</p> 
                                    <p className="invoicePage__table-item-total">£ {(item.total).toFixed(2)}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className={`invoicePage__amount invoicePage__amount_theme_${theme}`}>
                <span className="invoicePage__amount-title">Amount Due</span>
                <span className="invoicePage__amount-value">£ {amountDue.toFixed(2)}</span>
            </div>
        </div>
    )
}