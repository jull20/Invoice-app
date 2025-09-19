import { useContext, useState } from "react";
import MyButton from "../button/MyButton";
import ThemeContext from "../../../context/themeContext";

type MyDropDownType = {
    dropDownName: string, 
    dropDownMenu: {
        name: string,
        value: string
    }[]
}

function MyDropDown({dropDownName, dropDownMenu}: MyDropDownType) {
    const themeContext = useContext(ThemeContext)
    if(!themeContext) return;
    const [isVisible, setIsVisible] = useState<boolean>(false);

    return (  
        <div className="dropDown">
            <MyButton 
                className={`dropDown-btn dropDown-btn_${themeContext.theme}`}
                data-menu-visible={isVisible}
                onClick={() => setIsVisible(!isVisible)}
            >
                {dropDownName}
            </MyButton>
            <div className={`dropDown__menu dropDown__menu_theme_${themeContext.theme}`}  data-menu-visible={isVisible}>
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

export default MyDropDown;