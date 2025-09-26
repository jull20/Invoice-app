import { useState, type JSX } from "react";
import type { ThemeType } from "../../shared/types/ThemeTypes";
import { MoonImgSvg, SunImgSvg } from "../../shared/ui";

function getCachedTheme(){
  const cachedTheme = sessionStorage.getItem('theme')
  if(cachedTheme && cachedTheme === 'light' || cachedTheme === 'dark') return cachedTheme;
  else null;
}

export function useTheme(): [ThemeType, (currTheme: ThemeType)=>void, (currTheme: ThemeType)=>JSX.Element]
{
  const [theme, setTheme] = useState<ThemeType>(getCachedTheme() ?? 'light');

  const changeTheme = (currTheme: ThemeType) => {
    let newTheme: ThemeType = currTheme === 'light' ? 'dark' : 'light';
    sessionStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  }
  const changeThemeBtnImg = (currTheme: ThemeType) => {
    return(
      currTheme === 'light'
      ? <MoonImgSvg />
      : <SunImgSvg />
    )
  }
  return [theme, changeTheme, changeThemeBtnImg];
}
