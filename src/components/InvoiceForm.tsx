import type { InvoiceType } from "../types/InvoiceType";
import MyInput from "./UI/input/MyInput";
import MyLabel from "./UI/label/MyLabel";
import MySelect from "./UI/select/MySelect";
import useInput from "../hooks/useInput";
import ItemList from "./ItemList";
import { getThemeContext } from "../utils/utilityFunctions";
import type { ThemeType } from "../types/themeType";
import MyButton from "./UI/button/MyButton";
import React, { useEffect, useId, useState } from "react";

type InvoiceFormType = {
    addNewInvoice: (newInvoice: InvoiceType)=>void,
    initialInvoice: InvoiceType
}


function InvoiceForm({addNewInvoice, initialInvoice}: InvoiceFormType) {
    const theme: ThemeType = getThemeContext();
    const [invoice, setInvoice] = useState<InvoiceType>(initialInvoice);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.currentTarget;
        setInvoice({ ...invoice, [name]: value });
    };
    const handleChangeFrom = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.currentTarget;
        setInvoice({ ...invoice, billFrom: { ...invoice.billFrom, [name]: value } });
    };
    const handleChangeTo = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.currentTarget;
        setInvoice({ ...invoice, billTo: { ...invoice.billTo, [name]: value } });
    };

    const addressFrom        = {value: invoice.billFrom.street,    onChange: handleChangeFrom};
    const cityFrom           = {value: invoice.billFrom.city,      onChange: handleChangeFrom};
    const postCodeFrom       = {value: invoice.billFrom.postCode,  onChange: handleChangeFrom};
    const countryFrom        = {value: invoice.billFrom.country,   onChange: handleChangeFrom};

    const clientName         = {value: invoice.billTo.name,        onChange: handleChangeTo};
    const clientEmail        = {value: invoice.billTo.email,       onChange: handleChangeTo};
    const addressTo          = {value: invoice.billTo.street,      onChange: handleChangeTo};
    const cityTo             = {value: invoice.billTo.city,        onChange: handleChangeTo};
    const postCodeTo         = {value: invoice.billTo.postCode,    onChange: handleChangeTo};
    const countryTo          = {value: invoice.billTo.country,     onChange: handleChangeTo};

    const invoiceDate        = {value: invoice.invoiceDate,        onChange: handleChange};
    const paymentTerms       = {value: invoice.paymentTerms,       onChange: handleChange};
    const projectDescription = {value: invoice.projectDescription, onChange: handleChange};


    const saveNewInvoice = (e:React.MouseEvent, status: 'paid' | 'pending' | 'draft') =>{
        e.preventDefault()
        addNewInvoice({...invoice, status: status})
    }

    const billFromInfoArr = [
        {
            labelClassname: 'addressFrom', labelName: 'Street Address',
            inputType:      'text', inputId: 'addressFrom', inputName: 'street', inputState: addressFrom
        },
        {
            labelClassname: 'cityFrom', labelName: 'Street City',
            inputType:      'text', inputId: 'cityFrom', inputName: 'city', inputState: cityFrom
        },
        {
            labelClassname: 'postCodeFrom', labelName: 'Post Code',
            inputType:      'text', inputId: 'postCodeFrom', inputName: 'postCode',  inputState: postCodeFrom
        },
        {
            labelClassname: 'countryFrom', labelName: 'Country',
            inputType:      'text', inputId: 'countryFrom', inputName: 'country', inputState: countryFrom
        },
    ]
    const billToInfoArr = [
        {
            labelClassname: 'fullName', labelName: 'Client’s Name',
            inputType:      'text', inputId: 'fullName', inputName: 'name', inputState: clientName
        },
        {
            labelClassname: 'email', labelName: 'Client’s Email',
            inputType:      'text', inputId: 'email', inputName: 'email', inputState: clientEmail
        },
        {
            labelClassname: 'addressTo', labelName: 'Street Address',
            inputType:      'text', inputId: 'addressTo', inputName: 'street', inputState: addressTo
        },
        {
            labelClassname: 'cityTo', labelName: 'City',
            inputType:      'text', inputId: 'cityTo', inputName: 'city', inputState: cityTo
        },
        {
            labelClassname: 'postCodeTo', labelName: 'Post Code',
            inputType:      'text', inputId: 'postCodeTo', inputName: 'postCode', inputState: postCodeTo
        },
        {
            labelClassname: 'countryTo', labelName: 'Country',
            inputType:      'text', inputId: 'countryTo', inputName: 'country', inputState: countryTo
        },
    ]

    return (  
        <form className={`invoiceForm invoiceForm_theme_${theme}`}>
            <fieldset className="invoiceForm__bill-from">
                <legend className="invoiceForm__partName">Bill From</legend>
                {
                    billFromInfoArr.map(data => 
                        <MyLabel 
                            key={data.labelClassname}
                            className={data.labelClassname} 
                            name={data.labelName}
                        >
                            <MyInput 
                                type={data.inputType} 
                                id={data.inputId} 
                                name={data.inputName}
                                {...data.inputState}    
                            />
                        </MyLabel>
                    )
                }
            </fieldset>
            <fieldset className="invoiceForm__bill-to">
                <legend className="invoiceForm__partName">Bill To</legend>
                {
                    billToInfoArr.map(data =>
                        <MyLabel 
                            key={data.labelClassname}
                            className={data.labelClassname} 
                            name={data.labelName}
                        >
                            <MyInput 
                                type={data.inputType} 
                                id={data.inputId} 
                                name={data.inputName}
                                {...data.inputState}
                            />
                        </MyLabel>
                    )
                }
            </fieldset>
            <fieldset className="invoiceForm__date-descripton">
                <MyLabel name="Invoice Date" className="invoiceDate">
                    <MyInput type='date' id='invoiceDate' name='invoiceDate' {...invoiceDate}/>
                </MyLabel>
                <MyLabel name="Payment Terms" className="">
                    <MySelect 
                        name='paymentTerms'
                        selectValue={paymentTerms.value}
                        selectChange={paymentTerms.onChange}
                        defaultValue={null}
                        options={[
                            {name: 'Net 1 Day',  value: '1'},
                            {name: 'Net 7 Day',  value: '7'},
                            {name: 'Net 14 Day', value: '14'},
                            {name: 'Net 30 Day', value: '30'},
                        ]}
                    />
                </MyLabel>
                <MyLabel name="Project Description" className="projectDescription">
                    <MyInput type='text' id='projectDescription' name='projectDescription' {...projectDescription}/>
                </MyLabel>
            </fieldset>
            <fieldset className="invoiceForm__itemList">
                <legend className="invoiceForm__partName-itemList">Item List</legend>
                <ItemList items={[]}/>
            </fieldset>
            
            <div>
                <MyButton onClick={(e:React.MouseEvent) => saveNewInvoice(e, 'pending')} >Save & Send</MyButton>
                <MyButton onClick={(e:React.MouseEvent) => saveNewInvoice(e, 'draft')} >Save as Draft</MyButton>
            </div>
        </form>
    );
}

export default InvoiceForm;