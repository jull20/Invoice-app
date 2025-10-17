import { createContext, useContext } from "react";
import type { ThemeContextType, ThemeType } from "../../types/ThemeTypes";

export const ThemeContext = createContext<ThemeContextType | null>(null);

export function getThemeContext(): ThemeType{
    const themeContext = useContext(ThemeContext);
    if(themeContext !== null) return themeContext.theme
    return 'light';
}
