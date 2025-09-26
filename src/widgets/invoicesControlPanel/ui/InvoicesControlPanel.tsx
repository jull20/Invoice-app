import { getThemeContext } from "../../../shared/api";
import type { ThemeType } from "../../../shared/types/ThemeTypes";
import { Button, PlusImgSvg } from "../../../shared/ui";
import { DropDown } from "../../../shared/ui/dropDown/DropDown";
import "./invoicesControlPanel.scss"

export function InvoicesControlPanel({onOpen}: {onOpen:()=>void}) {
    const theme: ThemeType = getThemeContext();

    // const [selectValue, setSelectValue] = useState<string>('')
    // const selectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //     setSelectValue(e.currentTarget.value)
    // }

    return (  
        <div className="invoicesControlPanel">
            <div className="invoicesControlPanel__text-block">
                <h1 className={`invoicesControlPanel__app-name invoicesControlPanel__app-name_theme_${theme}`}>Invoices</h1>
                <p className={`invoicesControlPanel__total-invoices invoicesControlPanel__total-invoices_theme_${theme}`}>
                    <span className="visibility">There are</span> 7 <span className="visibility">total</span> invoices
                </p>
            </div>
            <DropDown 
                dropDownName='Filter by status'
                dropDownMenu={[
                    {name: 'Draft',   value: 'draft'},
                    {name: 'Pending', value: 'pending'},
                    {name: 'Paid',    value: 'paid'},
                ]}
            />
            <Button onClick={onOpen}>
                <>
                    <span>New Invoice</span>
                    <PlusImgSvg/>
                </>
            </Button>
        </div>
    );
}
