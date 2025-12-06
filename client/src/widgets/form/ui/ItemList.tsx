import { Button, TableHeader } from "../../../shared/ui";
import Item from "./Item";
import { FieldArray } from "formik";
import './itemList.scss'
import type { FormType } from "../../../shared/types";

export function ItemList({values}: {values: FormType}) {
    // console.log(values)
    return (  
        <div className="itemList">
            <TableHeader className="itemList__table-header"/>
            <FieldArray
                name="items"
                render={arrayHelpers => (
                <>
                    <div className="itemList__table-items">
                        {
                            values.items.map((item, index) => (
                                <Item 
                                    key={item.id}
                                    index={index}
                                    removeItem={() => arrayHelpers.remove(index)}
                                />
                        ))}
                    </div>
                    <Button 
                        style="chameleon"
                        type="button" 
                        className='addItemBtn itemList__table-footer'
                        onClick={() => arrayHelpers.push({name: '', quantity: '', price: '', total: ''})}
                    >
                        + Add New Item
                    </Button>
                </>
                )}
            />
        </div>
    );
}
