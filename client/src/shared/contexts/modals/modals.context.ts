import { createContext, useContext } from "react";
import type { ModalsContextType } from "../../types";

export const ModalsContext = createContext<ModalsContextType | null>(null);

export function getModalContext(){
    const context = useContext(ModalsContext);
    if(context) return context
    else throw new Error('bad modal context')
}