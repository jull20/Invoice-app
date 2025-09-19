import type { JSX } from "react";
import type { ThemeType } from "./themeType";

export type ThemeContextType = {
    theme: ThemeType;
    changeTheme: (currTheme: ThemeType) => void;
    changeThemeBtnImg: (currTheme: ThemeType) => JSX.Element;
}