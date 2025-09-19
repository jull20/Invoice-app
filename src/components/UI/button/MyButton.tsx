import type { MyButtonType } from "../../../types/myButtonType";

export default function MyButton({children, ...props}: MyButtonType){
    return <button {...props}>{children}</button>
}