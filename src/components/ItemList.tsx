import React, { useState } from "react";
import type { ItemType } from "../types/InvoiceType";
import Item from "./Item";
import MyButton from "./UI/button/MyButton";
import { getThemeContext } from "../utils/utilityFunctions";
import type { ThemeType } from "../types/themeType";

const emptyItem: ItemType = {
    id:       0,
    name:     '', 
    quantity: 0,
    price:    0,
    total:    0
}

function ItemList({items}: {items: ItemType[]}) {
    const [itemList, setItemList] = useState<ItemType[]>(items)
    const theme: ThemeType = getThemeContext();
    
    const addItem = (e: React.FormEvent) => {
        e.preventDefault()
        setItemList([...itemList, {...emptyItem, id: Date.now()}]);
    }
    const removeItem = (removeId: number) => {
        setItemList(itemList.filter(item => item.id !== removeId))
    }
    
    return (  
        <div className="itemList">
            <p className={`itemList__header itemList__header_theme_${theme} itemList__header-itemName`}>Item Name</p>
            <p className={`itemList__header itemList__header_theme_${theme} itemList__header-quantity`}>Qty.</p>
            <p className={`itemList__header itemList__header_theme_${theme} itemList__header-price`}>Price</p>
            <p className={`itemList__header itemList__header_theme_${theme} itemList__header-totalPrice`}>Total</p>
            <div className="itemList__items">
                {
                    itemList.map((item) => 
                        <Item 
                            key={item.id} 
                            item={item} 
                            removeItem={() => removeItem(item.id)}
                        /> 
                    )
                }
            </div>
            <MyButton className={`addItem-btn addItem-btn_theme_${theme}`} onClick={addItem}>+ Add New Item</MyButton>
        </div>
    );
}

export default ItemList;