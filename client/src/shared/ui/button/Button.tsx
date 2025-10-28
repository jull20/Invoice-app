import { getThemeContext } from "../../api";
import type { ButtonType } from "./ButtonType";
import "./button.scss"

export function Button({children, style, ...props}: ButtonType){
    const theme = getThemeContext();
    let rootClass = ['customBtn']; 
    let num = 0;
    switch(style){
        case 'purple':
            num = 1;
            break;
        case 'dark':
            num = 2;
            break;
        case 'light':
            num = 3;
            break;
        case 'red':
            num = 4;
            break;                        
        case 'chameleon':
            num = 5;
            break;
        case 'none':
            num = 6;
            break;                     
    }
    if(num!=0) rootClass.push(`button-${num} button-${num}_theme_${theme}`);

    if('className' in props && typeof props.className === 'string'){
        rootClass.push(props.className);
    }
    props = {...props, className: rootClass.join(' ')};
    return <button {...props}>{children}</button>;
}