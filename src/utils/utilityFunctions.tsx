import { useContext } from "react";
import ThemeContext from "../context/themeContext";
import type { ThemeType } from "../types/themeType";
import type { InvoiceType } from "../types/InvoiceType";

export function getCachedTheme(){
  const cachedTheme = sessionStorage.getItem('theme')
  if(cachedTheme && cachedTheme === 'light' || cachedTheme === 'dark') return cachedTheme;
  else null;
}

export function getThemeContext(): ThemeType{
    const themeContext = useContext(ThemeContext);
    if(themeContext !== null) return themeContext.theme
    return 'light';
}


export class Invoice{
  invoice: InvoiceType;

  constructor(_invoice: InvoiceType){
    this.invoice = _invoice
  }

  getAmount(){
    let amount = 0;
      for(let i=0; i<this.invoice.items.length; i++){
        let currItem = this.invoice.items[i];
        amount += (currItem.quantity * currItem.price)
      }
      return amount;
  }

  getPaymentDue(){

  }
}