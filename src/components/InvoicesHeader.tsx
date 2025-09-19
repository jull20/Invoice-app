import MyDropDown from "./UI/dropDown/MyDropDown";
import MyButton from "./UI/button/MyButton";
import { PlusImgSvg } from "./UI/svgImgCode/svgImgCode";
import { getThemeContext } from "../utils/utilityFunctions";
import type { ThemeType } from "../types/themeType";

function InvoicesHeader({onOpen}: {onOpen:()=>void}) {
    const theme: ThemeType = getThemeContext();

    // const [selectValue, setSelectValue] = useState<string>('')
    // const selectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //     setSelectValue(e.currentTarget.value)
    // }

    return (  
        <div className="invoicesHeader">
            <div className="invoicesHeader__text-block">
                <h1 className={`invoicesHeader__app-name invoicesHeader__app-name_theme_${theme}`}>Invoices</h1>
                <p className={`invoicesHeader__total-invoices invoicesHeader__total-invoices_theme_${theme}`}>
                    <span className="visibility">There are</span> 7 <span className="visibility">total</span> invoices
                </p>
            </div>
            <MyDropDown 
                dropDownName='Filter by status'
                dropDownMenu={[
                    {name: 'Draft',   value: 'draft'},
                    {name: 'Pending', value: 'pending'},
                    {name: 'Paid',    value: 'paid'},
                ]}
            />
            <MyButton onClick={onOpen}>
                <span>New Invoice</span>
                {/* <PlusImgSvg/> */}
            </MyButton>
        </div>
    );
}

export default InvoicesHeader;