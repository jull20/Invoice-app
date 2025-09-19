import { useContext, type JSX } from "react";
import ThemeContext from "../../../context/themeContext";

function MyLabel({name, children, className=''}: {name:string, children: JSX.Element, className?: string}) {
    const themeContext = useContext(ThemeContext);
    if(!themeContext) return;

    return (  
        <label className={`myLabel ${className}`}>
            <span className={`myLabel__name myLabel__name_theme_${themeContext.theme}`}>{name}</span>
            {children}
        </label>
    );
}

export default MyLabel;