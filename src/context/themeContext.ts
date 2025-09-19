import { createContext } from "react";
import type { ThemeContextType } from "../types/themeContextType";

const ThemeContext = createContext<ThemeContextType | null>(null);

export default ThemeContext;