import type { JSX } from "react";

export type ThemeType = 'light' | 'dark';

export type ThemeContextType = {
    theme: ThemeType;
    changeTheme: (currTheme: ThemeType) => void;
    changeThemeBtnImg: (currTheme: ThemeType) => JSX.Element;
}