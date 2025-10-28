import "./item.scss"
import React, { useEffect, useState } from "react";
import { Button, DeleteImgSvg, FormField } from "../../../shared/ui";
import { useFormikContext,} from "formik";
import type { ValuesType } from "./FormTypes";

function Item({index, removeItem}: {index: number, removeItem: ()=>void}) {
    const formikContext = useFormikContext<ValuesType>();
    const nameField:    string = `items[${index}].name`,
          quantityField:string = `items[${index}].quantity`,
          priceField:   string = `items[${index}].price`,
          totalField:   string = `items[${index}].total`;

    const [total, setTotal] = useState({quan: 0, price: 0})

    const changeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTotal({...total, quan: parseFloat(e.currentTarget.value)})
        formikContext.setFieldValue(quantityField, parseFloat(e.currentTarget.value), false)
    }
    const changePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTotal({...total, price: parseFloat(e.currentTarget.value)})
        formikContext.setFieldValue(priceField, parseFloat(e.currentTarget.value), false)
    }
    useEffect(() => {
        const totalPrice = (total.price*total.quan)
        formikContext.setFieldValue(totalField, totalPrice);
    }, [total])

    const items_formFieldsInfo = [ 
    {
        fieldName: 'Item Name',
        fieldClass: 'itemName',
        fieldProps: {
            as:   '',
            type:'text',
            name: nameField,
        }
    },
    {
        fieldName: 'Qty.',
        fieldClass: 'quantity',
        fieldProps: {
            as:   '',
            type: 'number' ,
            name: quantityField,
            min: '0',
            step: '1',
            placeholder: '0',
            onChange: changeQuantity
        }
    },
    {
        fieldName: 'Price',
        fieldClass: 'price',
        fieldProps: {
            as:   '',
            type: 'number' ,
            name: priceField,
            min:  "0.01" ,
            step: "0.01",
            placeholder: '0',
            onChange: changePrice
        }
    },
    {
        fieldName: 'Total',
        fieldClass: 'total',
        fieldProps: {
            as:   '',
            type: 'number',
            name: totalField,
            disabled: true,
        }
    },
]
    
    return (
        <div className="item">
            {
                items_formFieldsInfo.map(data => <FormField key={data.fieldClass} {...data}/>)
            }
            <Button style="none" className='removeItem-btn' onClick={removeItem}>
                <DeleteImgSvg />
            </Button>
        </div>
    );
}

export default Item;