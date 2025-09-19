import { useContext } from "react";
import ThemeContext from "../../../context/themeContext";

type MySelectType = {
    options: {
        name: string,
        value: string
    }[],
    defaultValue: string | null,
    selectValue: string,
    selectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    name: string
}

function MySelect({options, defaultValue, selectValue, selectChange, name}: MySelectType) {
    const themeContext = useContext(ThemeContext);
    if(!themeContext) return;

    return (  
        <select 
            className={`mySelect mySelect_theme_${themeContext.theme}`}
            name={name}
            value={selectValue}
            onChange={selectChange}
        >
            { defaultValue && <option value="" disabled>{defaultValue}</option>}
            {
                options.map(({name, value}) => 
                    <option key={name + '_key'} value={value}>{name}</option>
                )
            }
        </select>
    );
}

export default MySelect;