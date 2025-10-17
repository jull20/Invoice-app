import "./form.scss"
import { ErrorMessage, Field, FieldArray, Form, Formik, useFormikContext, type FormikHelpers, type FormikProps } from "formik"
import { Button, FormField } from "../../../shared/ui";
import { getThemeContext } from "../../../shared/api";
import { ItemList } from "./ItemList";
import type { InvoiceType, ItemType } from "../../../shared/types/InvoiceType";
import { useState, type FormEvent, type SyntheticEvent } from "react";
import type { FormSavingModeType, InvoiceFormType, ValuesType } from "./FormTypes";

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
        errors.billTo = {...errors.billFrom, email:   'Required'};
    }else if (!/.+@.+\..+/i.test(values.billTo.email)){
        errors.billTo = {...errors.billFrom, email:   'Invalid email address'};
    }
    if(!values.billFrom.street)    errors.billFrom = {...errors.billFrom, street:   'Required'}
    if(!values.billFrom.city)      errors.billFrom = {...errors.billFrom, city:     'Required'}
    if(!values.billFrom.postCode)  errors.billFrom = {...errors.billFrom, postCode: 'Required'}
    if(!values.billFrom.country)   errors.billFrom = {...errors.billFrom, country:  'Required'}

    if(!values.billTo.name)        errors.billTo = {...errors.billTo, name:     'Required'}
    if(!values.billTo.street)      errors.billTo = {...errors.billTo, street:   'Required'}
    if(!values.billTo.city)        errors.billTo = {...errors.billTo, city:     'Required'}
    if(!values.billTo.postCode)    errors.billTo = {...errors.billTo, postCode: 'Required'}
    if(!values.billTo.country)     errors.billTo = {...errors.billTo, country:  'Required'}

    if(!values.invoiceDate)        errors.invoiceDate        = 'Required'
    if(!values.paymentTerms)       errors.paymentTerms       = 'Required'
    if(!values.projectDescription) errors.projectDescription = 'Required'

    type ErrorItemType = {[key in keyof ItemType]: string};
    const itemsErrors: ErrorItemType[] = [];

    if(!values.items.length){
        errors.items = 'Can’t be empty'
    }else{
        values.items.forEach(item => {
            let itemProp: keyof ItemType;
            let itemErrors: ErrorItemType = {} as ErrorItemType;
            for(itemProp in item){
                if(!item[`${itemProp}`] && itemProp != 'total'){
                    itemErrors = {...itemErrors, [itemProp]: ' '};
                }
            }
            if(Object.keys(itemErrors).length > 0) itemsErrors.push(itemErrors);
        })
    }
    if(itemsErrors.length > 0) errors.items = itemsErrors

    console.log(errors)
    return errors;
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

export function InvoiceForm({addNewInvoice, initialInvoice, closeModal}: InvoiceFormType){
    const theme = getThemeContext();
    const formType = 'New Invoice';

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

    const [saveMode, setSaveMode] = useState<FormSavingModeType>(undefined);

    const discardForm = (resetForm: ()=>void) => {
        resetForm();
        closeModal();
    }
    const handlePreSubmit = (e: SyntheticEvent<HTMLFormElement, SubmitEvent>, props: FormikProps<ValuesType>) => {
        e.preventDefault()
        const submitter = e.nativeEvent.submitter
        if(submitter instanceof HTMLButtonElement && (submitter.value === 'pending' || submitter.value === 'draft')){
            setSaveMode(submitter.value)
            props.submitForm()
        }
    }   
    const handleSubmit = (values: ValuesType, formikHelpers: FormikHelpers<ValuesType>) => {
        addNewInvoice({...values, status: saveMode, id: '12345'})
        discardForm(formikHelpers.resetForm);
    }

    // onSubmit={(e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => handleSubmit(props.values, e)}
    return(
        <div className='invoiceForm'>
            <h2 className="invoiceForm_form-type">{formType}</h2>
            <Formik
                initialValues={initialValues}
                validate={validate}
                onSubmit={handleSubmit}
            >
                {props => (
                    <form onSubmit={(e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => handlePreSubmit(e, props)} className={`invoiceForm__form invoiceForm__form_theme_${theme}`}>
                        <div className="invoiceForm__fields">
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
                                {!Array.isArray(props.errors.items) && <div className="error">{props.errors.items}</div>}
                                <ItemList 
                                    values={props.values}
                                />
                            </fieldset>
                        </div>
                        <div className={`invoiceForm__controlBtn invoiceForm__controlBtn_theme_${theme}`}>
                            <Button type='button' style="light"  onClick={() => discardForm(props.resetForm)}>Discard</Button>
                            <Button type='submit' value='pending' style="purple">Save & Send</Button>
                            <Button type='submit' value='draft'   style="dark">Save as Draft</Button>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    )
}