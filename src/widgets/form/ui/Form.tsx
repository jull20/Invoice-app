import "./form.scss"

import { ErrorMessage, Field, FieldArray, Form, Formik, useFormikContext } from "formik"
import { Button, FormField } from "../../../shared/ui";
import { getThemeContext } from "../../../shared/api";
import { ItemList } from "./ItemList";
import type { InvoiceType, ItemType } from "../../../shared/types/InvoiceType";
import { useState, type FormEvent, type SyntheticEvent } from "react";
import type { InvoiceFormType, ValuesType } from "./FormTypes";

// function useItems(): [ItemType[], (e: React.FormEvent)=>void, (removeId: number)=>void]
// {
//     const [items, setItems] = useState<ItemType[]>([]);

//     const emptyItem: ItemType = {
//         id:       0,
//         name:     '', 
//         quantity: 0,
//         price:    0,
//         total:    0
//     }

//     const addItem = (e: React.FormEvent) => {
//         e.preventDefault();
//         setItems([...items, {...emptyItem, id: Date.now()}]);
//     }
//     const removeItem = (removeId: number) => {
//         setItems(items.filter(item => item.id !== removeId))
//     }
//     const editItem = (e: React.ChangeEvent, itemId: string) => {
//         e.preventDefault();
//         setItems([...items, {...emptyItem, id: Date.now()}]);
//     }

//     return [items, addItem, removeItem];
// }

const validate = (values: ValuesType) => {
    const errors: any = {};

    if(!values.billTo.email){
        console.log('email is empty')
        errors['billTo.email'] = 'Required';
    }else if (!/.+@.+\..+/i.test(values.billTo.email)){
        errors['billTo.email'] = 'Invalid email address';
    }
    if(!values.billFrom.street)    errors['billFrom.street']   = 'Required'
    if(!values.billFrom.city)      errors['billFrom.city']     = 'Required'
    if(!values.billFrom.postCode)  errors['billFrom.postCode'] = 'Required'
    if(!values.billFrom.country)   errors['billFrom.country']  = 'Required'

    if(!values.billTo.name)        errors['billTo.name']     = 'Required'
    if(!values.billTo.street)      errors['billTo.street']   = 'Required'
    if(!values.billTo.city)        errors['billTo.city']     = 'Required'
    if(!values.billTo.postCode)    errors['billTo.postCode'] = 'Required'
    if(!values.billTo.country)     errors['billTo.country']  = 'Required'
    if(!values.invoiceDate)        errors.invoiceDate        = 'Required'
    if(!values.paymentTerms)       errors.paymentTerms       = 'Required'
    if(!values.projectDescription) errors.projectDescription = 'Required'
    console.log(errors)
    return errors;
}
const submit = (values: ValuesType) => {
    console.log(values)
}


const initialValues: ValuesType = {
    billFrom: {
        street: '',
        city: '',
        postCode: '',
        country: '',   
    },
    billTo: {
        name: '',
        email: '',
        street: '',
        city: '',
        postCode: '',
        country: '',
    },
    invoiceDate: '',
    paymentTerms: 1,
    projectDescription: '',
    items: []
}

export function InvoiceForm({addNewInvoice, initialInvoice}: InvoiceFormType){
    const theme = getThemeContext();
    // const [invoice, setInvoice] = useState<InvoiceType>(initialInvoice);
    // const [items, addItem, removeItem] = useItems();
    const billFrom_formFieldsInfo = [ 
        {
            fieldName: 'Street Address',
            fieldClass: 'streetFrom',
            fieldProps: {
                as:   '',
                type:'text',
                name: 'billFrom.street',
            }
        },
        {
            fieldName: 'City',
            fieldClass: 'cityFrom',
            fieldProps: {
                as:   '',
                type: 'text',
                name: 'billFrom.city',
            }
        },
        {
            fieldName: 'Post Code',
            fieldClass: 'postCodeFrom',
            fieldProps: {
                as:   '',
                type: 'text',
                name: 'billFrom.postCode',
            }
        },
        {
            fieldName: 'Country',
            fieldClass: 'countryFrom',
            fieldProps: {
                as:   '',
                type: 'text',
                name: 'billFrom.country',
            },
        }
    ]
    const billTo_formFieldsInfo = [
        {
            fieldName: 'Client’s Name',
            fieldClass: 'name',
            fieldProps: {
                as:   '',
                type:'text',
                name: 'billTo.name',
            }
        },
        {
            fieldName: 'Client’s Email',
            fieldClass: 'email',
            fieldProps: {
                as:   '',
                type:'email',
                name: 'billTo.email',
                placeholder: 'e.g. email@example.com'
            }
        },
        {
            fieldName: 'Street Address',
            fieldClass: 'streetTo',
            fieldProps: {
                as:   '',
                type:'text',
                name: 'billTo.street',
            }
        },
        {
            fieldName: 'City',
            fieldClass: 'cityTo',
            fieldProps: {
                as:   '',
                type: 'text',
                name: 'billTo.city',
            }
        },
        {
            fieldName: 'Post Code',
            fieldClass: 'postCodeTo',
            fieldProps: {
                as:   '',
                type: 'text',
                name: 'billTo.postCode',
            }
        },
        {
            fieldName: 'Country',
            fieldClass: 'countryTo',
            fieldProps: {
                as:   '',
                type: 'text',
                name: 'billTo.country',
            },
        },

    ]
    const dateDescripton_formFieldsInfo = [ 
        {
            fieldName: 'Invoice Date',
            fieldClass: 'invoiceDate',
            fieldProps: {
                as:   '',
                type: 'date',
                name: 'invoiceDate',
            }
        },
        {
            fieldName: 'Payment Terms',
            fieldClass: 'paymentTerms',
            fieldProps: {
                as:   'select',
                name: 'paymentTerms',
            },
            options: [
                {name: 'Net 1 Day',  value: 1},
                {name: 'Net 7 Day',  value: 7},
                {name: 'Net 14 Day', value: 14},
                {name: 'Net 30 Day', value: 30},
            ]
        },
        {
            fieldName: 'Project Description',
            fieldClass: 'projectDescription',
            fieldProps: {
                as:   '',
                type: 'text',
                name: 'projectDescription',
                placeholder: 'e.g. Graphic Design Service',
            }
        },
    ]
    const handleSubmit = (values: ValuesType, e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
        e.preventDefault();
        console.log(values)
        console.log(e.nativeEvent.submitter)
    }
    // onSubmit={(e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => handleSubmit(props.values, e)}
    return(
        <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={() => {console.log('kek')}}
        >
            {props => (
                <Form className={`invoiceForm invoiceForm_theme_${theme}`}>
                    <fieldset className="invoiceForm__bill-from">
                        <legend className="invoiceForm__partName">Bill From</legend>
                        { billFrom_formFieldsInfo.map(data => <FormField key={data.fieldClass} {...data}/>) }
                    </fieldset>
                    <fieldset className="invoiceForm__bill-to">
                        <legend className="invoiceForm__partName">Bill To</legend>
                        { billTo_formFieldsInfo.map(data => <FormField key={data.fieldClass} {...data}/>) }
                    </fieldset>
                    <fieldset className="invoiceForm__date-descripton">
                        { dateDescripton_formFieldsInfo.map(data => <FormField key={data.fieldClass} {...data}/> ) }
                    </fieldset>
                    <fieldset className="invoiceForm__itemList">
                        <legend className="invoiceForm__partName-itemList">Item List</legend>
                        <ItemList 
                            values={props.values}
                        />
                    </fieldset>
                    {/* <button type='submit'>Submit</button> */}
                    
                    <Button type='button' >Discard</Button>
                    <Button type='submit' value='pending'>Save & Send</Button>
                    <Button type='submit' value='draft'>Save as Draft</Button>
                </Form>
            )}
        </Formik>
    )
}















// export function Form({addNewInvoice, initialInvoice}: InvoiceFormType) {
//     const theme: ThemeType = getThemeContext();

//     const [invoice, setInvoice] = useState<InvoiceType>(initialInvoice);
//     const [items, addItem, removeItem] = useItems();

//     const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//         const { name, value } = event.currentTarget;
//         setInvoice({ ...invoice, [name]: value });
//     };
//     const handleChangeFrom = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//         const { name, value } = event.currentTarget;
//         setInvoice({ ...invoice, billFrom: { ...invoice.billFrom, [name]: value } });
//     };
//     const handleChangeTo = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//         const { name, value } = event.currentTarget;
//         setInvoice({ ...invoice, billTo_formFieldsInfo: { ...invoice.billTo_formFieldsInfo, [name]: value } });
//     };
//     const saveNewInvoice = (e:React.MouseEvent, status: 'paid' | 'pending' | 'draft') =>{
//         e.preventDefault()
//         let newInvoice = {...invoice, status: status, items: [...items]}
//         console.log(newInvoice)
//         if(validate(newInvoice)){
//             // addNewInvoice({...invoice, status: status})
//         }
//     }


//     const invoiceDate        = {value: invoice.invoiceDate,        onChange: handleChange};
//     const projectDescription = {value: invoice.projectDescription, onChange: handleChange};

//     const billFrom_formFieldsInfo = [ 
//         {
//             fieldName: 'Street Address',
//             inputProps: {
//                 type: 'text',
//                 id: 'streetAddressFrom',
//                 name: 'street',
//                 value: invoice.billFrom.street,
//                 onChange: handleChangeFrom
//             }
//         },
//         {
//             fieldName: 'City',
//             inputProps: {
//                 type: 'text',
//                 id: 'cityFrom',
//                 name: 'city',
//                 value: invoice.billFrom.city,
//                 onChange: handleChangeFrom
//             }
//         },
//         {
//             fieldName: 'Post Code',
//             inputProps: {
//                 type: 'text',
//                 id: 'postCodeFrom',
//                 name: 'postCode',
//                 value: invoice.billFrom.postCode,
//                 onChange: handleChangeFrom
//             }
//         },
//         {
//             fieldName: 'Country',
//             inputProps: {
//                 type: 'text',
//                 id:   'countryFrom',
//                 name: 'country',
//                 value: invoice.billFrom.country,
//                 onChange: handleChangeFrom
//             },

//         },
//         // {
//         //     labelClassname: 'addressFrom', labelName: 'Street Address', inputType: 'text', inputId: 'addressFrom',
//         //     inputName: 'street', inputState: {value: invoice.billFrom.street, onChange: handleChangeFrom}
//         // },
//         // {
//         //     labelClassname: 'cityFrom', labelName: 'City',
//         //     inputType:      'text', inputId: 'cityFrom', inputName: 'city', inputState: {value: invoice.billFrom.city, onChange: handleChangeFrom}
//         // },
//         // {
//         //     labelClassname: 'postCodeFrom', labelName: 'Post Code',
//         //     inputType:      'text', inputId: 'postCodeFrom', inputName: 'postCode',  inputState: {value: invoice.billFrom.postCode, onChange: handleChangeFrom}
//         // },
//         // {
//         //     labelClassname: 'countryFrom', labelName: 'Country',
//         //     inputType:      'text', inputId: 'countryFrom', inputName: 'country', inputState: {value: invoice.billFrom.country, onChange: handleChangeFrom}
//         // },
//     ]
//     const billTo_formFieldsInfo = [
//         {
//             labelClassname: 'fullName', labelName: 'Client’s Name',
//             inputType:      'text', inputId: 'fullName', inputName: 'name', inputState: {value: invoice.billTo_formFieldsInfo.name, onChange: handleChangeTo}
//         },
//         {
//             labelClassname: 'email', labelName: 'Client’s Email',
//             inputType:      'text', inputId: 'email', inputName: 'email', inputState: {value: invoice.billTo_formFieldsInfo.email, onChange: handleChangeTo}
//         },
//         {
//             labelClassname: 'addressTo', labelName: 'Street Address',
//             inputType:      'text', inputId: 'addressTo', inputName: 'street', inputState: {value: invoice.billTo_formFieldsInfo.street, onChange: handleChangeTo}
//         },
//         {
//             labelClassname: 'cityTo', labelName: 'City',
//             inputType:      'text', inputId: 'cityTo', inputName: 'city', inputState: {value: invoice.billTo_formFieldsInfo.city, onChange: handleChangeTo}
//         },
//         {
//             labelClassname: 'postCodeTo', labelName: 'Post Code',
//             inputType:      'text', inputId: 'postCodeTo', inputName: 'postCode', inputState: {value: invoice.billTo_formFieldsInfo.postCode, onChange: handleChangeTo}
//         },
//         {
//             labelClassname: 'countryTo', labelName: 'Country',
//             inputType:      'text', inputId: 'countryTo', inputName: 'country', inputState: {value: invoice.billTo_formFieldsInfo.country, onChange: handleChangeTo}
//         },
//     ]

//     return (  
//         <form className={`invoiceForm invoiceForm_theme_${theme}`}>
//             <fieldset className="invoiceForm__bill-from">
//                 <legend className="invoiceForm__partName">Bill From</legend>
//                 {
//                     billFrom_formFieldsInfo.map(data =>
//                         <FormField 
//                             name={data.fieldName}
//                             inputProps={data.inputProps}
//                         />
//                         // <Label 
//                         //     key={data.labelClassname}
//                         //     className={data.labelClassname} 
//                         //     name={data.labelName}
//                         // >
//                         //     <Input 
//                         //         type={data.inputType} 
//                         //         id={data.inputId} 
//                         //         name={data.inputName}
//                         //         {...data.inputState}    
//                         //     />
//                         // </Label>
//                     )
//                 }
//             </fieldset>
//             <fieldset className="invoiceForm__bill-to">
//                 <legend className="invoiceForm__partName">Bill To</legend>
//                 {
//                     billTo_formFieldsInfo.map(data =>
//                         <Label 
//                             key={data.labelClassname}
//                             className={data.labelClassname} 
//                             name={data.labelName}
//                         >
//                             <Input 
//                                 type={data.inputType} 
//                                 id={data.inputId} 
//                                 name={data.inputName}
//                                 {...data.inputState}
//                             />
//                         </Label>
//                     )
//                 }
//             </fieldset>
//             <fieldset className="invoiceForm__date-descripton">
//                 <Label name="Invoice Date" className="invoiceDate">
//                     <Input type='date' id='invoiceDate' name='invoiceDate' {...invoiceDate}/>
//                 </Label>
//                 <Label name="Payment Terms">
//                     <Select 
//                         name='paymentTerms'
//                         selectValue={invoice.paymentTerms}
//                         selectChange={handleChange}
//                         defaultValue={null}
//                         options={[
//                             {name: 'Net 1 Day',  value: '1'},
//                             {name: 'Net 7 Day',  value: '7'},
//                             {name: 'Net 14 Day', value: '14'},
//                             {name: 'Net 30 Day', value: '30'},
//                         ]}
//                     />
//                 </Label>
//                 <Label name="Project Description" className="projectDescription">
//                     <Input type='text' id='projectDescription' name='projectDescription' {...projectDescription}/>
//                 </Label>
//             </fieldset>
//             <fieldset className="invoiceForm__itemList">
//                 <legend className="invoiceForm__partName-itemList">Item List</legend>
//                 <ItemList 
//                     items={items}
//                     add={addItem}
//                     remove={removeItem}
//                 />
//             </fieldset>
            
//             <div>
//                 <Button onClick={(e:React.MouseEvent) => saveNewInvoice(e, 'pending')} >Save & Send</Button>
//                 <Button onClick={(e:React.MouseEvent) => saveNewInvoice(e, 'draft')} >Save as Draft</Button>
//             </div>
//         </form>
//     );
// }



