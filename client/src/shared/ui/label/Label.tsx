import { type JSX } from "react";
import { getThemeContext } from "../../api";
import type { ThemeType } from "../../types/ThemeTypes";
import "./label.scss"

export function Label({name, children, className=''}: {name:string, children: JSX.Element, className?: string}) {
    const theme: ThemeType = getThemeContext();
    
    return (  
        <label className={`label ${className}`}>
            <span className={`label__name label__name_theme_${theme}`}>{name}</span>
            {children}
        </label>
    );
}

export default Label;