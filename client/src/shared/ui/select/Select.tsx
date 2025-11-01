import { getThemeContext } from "../../contexts";
import type { SelectType } from "./SelectType";
import "./select.scss"

export function Select({options, defaultValue, selectValue, selectChange, name}: SelectType) {
    const theme = getThemeContext();

    return (  
        <select 
            className={`select select_theme_${theme}`}
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
