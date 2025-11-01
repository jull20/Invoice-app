import { type JSX } from "react";
import type { ThemeType } from "../../types/theme/theme.type";
import "./label.scss"
import { getThemeContext } from "../../contexts";

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