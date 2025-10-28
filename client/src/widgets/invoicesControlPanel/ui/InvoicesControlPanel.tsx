import { getThemeContext } from "../../../shared/api";
import type { ThemeType } from "../../../shared/types/ThemeTypes";
import { Button, PlusImgSvg } from "../../../shared/ui";
import { DropDown } from "../../../shared/ui/dropDown/DropDown";
import "./invoicesControlPanel.scss"

export function InvoicesControlPanel({invoicesQuan, onOpen}: {invoicesQuan: number, onOpen:()=>void}) {
    const theme: ThemeType = getThemeContext();
    return (  
        <div className="invoicesControlPanel">
            <div className="invoicesControlPanel__text-block">
                <h1 className={`invoicesControlPanel__app-name invoicesControlPanel__app-name_theme_${theme}`}>Invoices</h1>
                <p className={`invoicesControlPanel__total-invoices invoicesControlPanel__total-invoices_theme_${theme}`}>
                    {
                        invoicesQuan
                        ? <> <span className="visibility">There are</span> {invoicesQuan} <span className="visibility">total</span> invoices</>
                        : <span>No invoices</span>
                    }
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
            <Button
                className='newBtn'
                style="purple"
                type='button'
                onClick={onOpen}>
                <div className="invoicesControlPanel__button-content">
                    <div className="invoicesControlPanel__button-img">
                        <PlusImgSvg/>
                    </div>
                    <p className="invoicesControlPanel__button-name">New <span className="visibility">Invoice</span></p>
                </div>
            </Button>
        </div>
    );
}
