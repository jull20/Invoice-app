import "./itemList.scss"
import type { ThemeType } from "../../../shared/types/ThemeTypes";
import { getThemeContext } from "../../../shared/api";
import { Button } from "../../../shared/ui";
import Item from "./Item";
import { FieldArray } from "formik";
import type { ValuesType } from "./FormTypes";

export function ItemList({values}: {values: ValuesType}) {
    const theme: ThemeType = getThemeContext();
    return (  
        <div className="itemList">
            <p className={`itemList__header itemList__header_theme_${theme} itemList__header-itemName`}>  Item Name</p>
            <p className={`itemList__header itemList__header_theme_${theme} itemList__header-quantity`}>  Qty.</p>
            <p className={`itemList__header itemList__header_theme_${theme} itemList__header-price`}>     Price</p>
            <p className={`itemList__header itemList__header_theme_${theme} itemList__header-totalPrice`}>Total</p>
            <FieldArray
                name="items"
                render={arrayHelpers => (
                <>
                    <div className="itemList__items">
                        {
                            values.items.map((item, index) => (
                                <Item 
                                    key={index}
                                    index={index}
                                    removeItem={() => arrayHelpers.remove(index)}
                                />
                        ))}
                    </div>
                    <Button type="button" className={`addItem-btn addItem-btn_theme_${theme}`} onClick={() => arrayHelpers.push({name: '', quantity: '', price: '', total: ''})}>+ Add New Item</Button>
                </>
                )}
            />
        </div>

    );
}
