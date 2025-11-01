import { useState, type JSX } from "react";
import type { ThemeContextType, ThemeType } from "../../types/theme/theme.type";
import { MoonImgSvg, SunImgSvg } from "../../ui";

function getCachedTheme(){
  const cachedTheme = sessionStorage.getItem('theme')
  if(cachedTheme && cachedTheme === 'light' || cachedTheme === 'dark') return cachedTheme;
  else null;
}

export function useTheme(): ThemeContextType
{
  const [theme, setTheme] = useState<ThemeType>(getCachedTheme() ?? 'light');

  const changeTheme = (currTheme: ThemeType) => {
    let newTheme: ThemeType = currTheme === 'light' ? 'dark' : 'light';
    sessionStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  }
  const getThemeImg = () => {
    return(
      theme === 'light'
      ? <MoonImgSvg />
      : <SunImgSvg />
    )
  }
  return {theme, changeTheme, getThemeImg};
}
