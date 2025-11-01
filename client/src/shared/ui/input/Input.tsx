import { getThemeContext } from "../../contexts";
import type { ThemeType } from "../../types/theme/theme.type";
import "./input.scss"

export function Input(props: {[key:string]: any}) {
    const theme: ThemeType = getThemeContext();
    let rootClass = [`input input_theme_${theme}`] 
    if('className' in props){
        rootClass.push(props.className)
    }
    let propsWithClass = {...props, className: rootClass.join(' ')}
        
    return (  
        <input {...propsWithClass} />
    );
}

export default Input;