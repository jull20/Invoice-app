import type { AddressType } from "./address.type";
import { getThemeContext } from "../../../../../shared/contexts";

export function Address({className, street, city, postCode, country}: AddressType){
    const theme = getThemeContext();
    return(
        <div className={className}>
            <div className={`${className}-street   ${className}-street_theme_${theme}`}>{street}</div>
            <div className={`${className}-city     ${className}-city_theme_${theme}`}>{city}</div>
            <div className={`${className}-postCard ${className}-postCard_theme_${theme}`}>{postCode}</div>
            <div className={`${className}-country  ${className}-country_theme_${theme}`}>{country}</div>
        </div>
    )
}