import type { ButtonType } from "./ButtonType";
import "./button.scss"

export function Button({children, ...props}: ButtonType){
    return <button {...props}>{children}</button>;
}