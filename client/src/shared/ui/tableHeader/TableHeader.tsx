import { getThemeContext } from "../../api";
import type { ThemeType } from "../../types/ThemeTypes";

export function TableHeader ({className}: {className: string}) {
    const theme: ThemeType = getThemeContext();
    return (  
        <div className={className}>
            <p className={`${className}-item_theme_${theme} ${className}-item ${className}-item-name`}>     Item Name</p>
            <p className={`${className}-item_theme_${theme} ${className}-item ${className}-item-quantity`}> QTY.</p>
            <p className={`${className}-item_theme_${theme} ${className}-item ${className}-item-price`}>    Price</p>
            <p className={`${className}-item_theme_${theme} ${className}-item ${className}-item-total`}>    Total</p>
        </div>
    );
}
