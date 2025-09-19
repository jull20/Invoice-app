import { useEffect, useState } from "react";
import useInput from "../hooks/useInput";
import MyInput from "./UI/input/MyInput";
import { DeleteImgSvg } from "./UI/svgImgCode/svgImgCode";
import type { ItemType } from "../types/InvoiceType";
import MyButton from "./UI/button/MyButton";
import { getThemeContext } from "../utils/utilityFunctions";
import type { ThemeType } from "../types/themeType";

function isEmptyItem(item: ItemType){
    if(item['name'] === '' || item['price'] === 0 || item['quantity'] === 0){
        return true
    }
    return false
}

function Item({item, removeItem}: {item: ItemType, removeItem: ()=>void}) {
    const theme: ThemeType = getThemeContext();

    let [initialName, initialQuantity, initialPrice] = '';
    if(!isEmptyItem(item)){
        initialName = item.name;
        initialQuantity = item.quantity.toString();
        initialPrice = item.price.toString();
    }

    const itemName = useInput(initialName);
    const quantity = useInput(initialQuantity);
    const price    = useInput(initialQuantity);

    const [totalPrice, setTotalPrice] = useState<string>('')
    useEffect(() => {
        let newTotalPrice = (parseInt(quantity.value) * parseInt(price.value));
        setTotalPrice(isNaN(newTotalPrice) ? '' : newTotalPrice.toString());
    }, [quantity, price]);

    return (
        <div className="item">
            <MyInput type='text' id={`item__itemName-${item.id}`} {...itemName}/>
            <MyInput type='text' id={`item__quantity-${item.id}`} {...quantity}/>
            <MyInput type='text' id={`item__price-${item.id}`}    {...price}/>
            <p className={`item__totalPrice item__totalPrice_theme_${theme}`}>{totalPrice}</p>
            <MyButton className='removeItem-btn' onClick={removeItem}>
                <DeleteImgSvg />
            </MyButton>
        </div>
    );
}

export default Item;