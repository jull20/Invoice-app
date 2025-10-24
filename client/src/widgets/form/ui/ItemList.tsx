import { Button, TableHeader } from "../../../shared/ui";
import Item from "./Item";
import { FieldArray } from "formik";
import type { ValuesType } from "./FormTypes";
import './itemList.scss'

export function ItemList({values}: {values: ValuesType}) {
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
                                    key={index}
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
