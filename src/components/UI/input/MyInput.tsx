import { useContext } from "react";
import ThemeContext from "../../../context/themeContext";
import { getThemeContext } from "../../../utils/utilityFunctions";
import type { ThemeType } from "../../../types/themeType";

function MyInput(props: {[key:string]: any}) {
    const theme: ThemeType = getThemeContext();

    return (  
        <input className={`myInput myInput_theme_${theme}`} {...props} />
    );
}

export default MyInput;