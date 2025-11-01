import { useState } from "react";
import type { DropDownType } from "./DropDownType";
import { Button } from "../button/Button";
import "./dropDown.scss"
import { getThemeContext } from "../../contexts";

export function DropDown({dropDownName, dropDownMenu}: DropDownType) {
    const theme = getThemeContext()
    const [isVisible, setIsVisible] = useState<boolean>(false);

    return (  
        <div className="dropDown">
            <Button 
                style="none"
                className={`dropDown-btn dropDown-btn_${theme}`}
                data-menu-visible={isVisible}
                onClick={() => setIsVisible(!isVisible)}
            >
                {dropDownName}
            </Button>
            <div className={`dropDown__menu dropDown__menu_theme_${theme}`}  data-menu-visible={isVisible}>
                {
                    dropDownMenu.map(({name, value}) => 
                        <div key={name+'_key'}>
                            <input value={value} type="checkbox" id={name} name={name} />
                            <label htmlFor={name}>{name}</label>
                        </div>
                    )
                }
            </div>
        </div>
    );
}
