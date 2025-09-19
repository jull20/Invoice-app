import { useState, type JSX } from "react";
import type { ThemeType } from "../types/themeType";
import { MoonImgSvg, SunImgSvg } from "../components/UI/svgImgCode/svgImgCode";

export default function useTheme(initialValue: ThemeType): [ThemeType, (currTheme: ThemeType)=>void, (currTheme: ThemeType)=>JSX.Element]
{
  const [theme, setTheme] = useState<ThemeType>(initialValue);

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
