import "./form.scss"
import { Form, Formik, type FormikHelpers, type FormikProps } from "formik"
import { Button, FormField } from "../../../shared/ui";
import { ItemList } from "./ItemList";
import type { FormType, InvoiceType, ItemType } from "../../../shared/types/invoice/invoice.type";
import { useEffect, useState, type ReactNode } from "react";
import { create, createDraft, update } from "../../../shared/api/fetch/fetch";
import { getThemeContext } from "../../../shared/contexts";
import { emptyFormValues } from "../../../shared/constants/emptyForm.constant";

// const validate = (values: ValuesType) => {
//     const errors: any = {};

//     if(!values.billTo.email){
//         errors.billTo = {...errors.billFrom, email:   'Required'};
//     }else if (!/.+@.+\..+/i.test(values.billTo.email)){
//         errors.billTo = {...errors.billFrom, email:   'Invalid email address'};
//     }
//     if(!values.billFrom.street)    errors.billFrom = {...errors.billFrom, street:   'Required'}
//     if(!values.billFrom.city)      errors.billFrom = {...errors.billFrom, city:     'Required'}
//     if(!values.billFrom.postCode)  errors.billFrom = {...errors.billFrom, postCode: 'Required'}
//     if(!values.billFrom.country)   errors.billFrom = {...errors.billFrom, country:  'Required'}

//     if(!values.billTo.name)        errors.billTo = {...errors.billTo, name:     'Required'}
//     if(!values.billTo.street)      errors.billTo = {...errors.billTo, street:   'Required'}
//     if(!values.billTo.city)        errors.billTo = {...errors.billTo, city:     'Required'}
//     if(!values.billTo.postCode)    errors.billTo = {...errors.billTo, postCode: 'Required'}
//     if(!values.billTo.country)     errors.billTo = {...errors.billTo, country:  'Required'}

//     if(!values.invoiceDate)        errors.invoiceDate        = 'Required'
//     if(!values.paymentTerms)       errors.paymentTerms       = 'Required'
//     if(!values.projectDescription) errors.projectDescription = 'Required'

//     type ErrorItemType = {[key in keyof ItemType]: string};
//     const itemsErrors: ErrorItemType[] = [];

//     if(!values.items.length){
//         errors.items = 'Can’t be empty'
//     }else{
//         values.items.forEach(item => {
//             let itemProp: keyof ItemType;
//             let itemErrors: ErrorItemType = {} as ErrorItemType;
//             for(itemProp in item){
//                 if(!item[`${itemProp}`] && itemProp != 'total'){
//                     itemErrors = {...itemErrors, [itemProp]: ' '};
//                 }
//             }
//             if(Object.keys(itemErrors).length > 0) itemsErrors.push(itemErrors);
//         })
//     }
//     if(itemsErrors.length > 0) errors.items = itemsErrors
//     // console.log(errors)
//     return errors;
// }

// const initialValues: ValuesType = {
//     billFrom: {
//         street: '',
//         city: '',
//         postCode: '',
//         country: '',   
//     },
//     billTo: {
//         name: '',
//         email: '',
//         street: '',
//         city: '',
//         postCode: '',
//         country: '',
//     },
//     invoiceDate: '',
//     paymentTerms: '',
//     projectDescription: '',
//     items: []
// }

// type NewFormType = {
//     type: 'new',
//     addInvoice: (invoice: InvoiceType) => void,
//     closeModal: () => void
// };
// type EditFormType = {
//     type: 'edit',
//     invoice: InvoiceType
//     editInvoice: () => void,
//     closeModal: () => void
// };
// function isNewForm(value: NewFormType | EditFormType): value is NewFormType
// {
//     return value.type === 'new' ? true : false;
// }


// function getNewUtils(props: NewFormType, resetForm: () => void){
//     const theme = getThemeContext();
//     const formTitle = 'New Invoice';
//     const {addInvoice, closeModal} = props;
//     const initialValues: ValuesType = {
//         billFrom: {
//             street: '',
//             city: '',
//             postCode: '',
//             country: '',   
//         },
//         billTo: {
//             name: '',
//             email: '',
//             street: '',
//             city: '',
//             postCode: '',
//             country: '',
//         },
//         invoiceDate: '',
//         paymentTerms: '',
//         projectDescription: '',
//         items: []
//     }
//     const [saveMode, setSaveMode] = useState<FormSavingModeType>(undefined);

//     const discardForm = () => {
//         resetForm();
//         closeModal();
//     }
//     const handlePreSubmit = (e: SyntheticEvent<HTMLFormElement, SubmitEvent>, props: FormikProps<ValuesType>) => {
//         e.preventDefault()
//         const submitter = e.nativeEvent.submitter
//         if(submitter instanceof HTMLButtonElement && (submitter.value === 'pending' || submitter.value === 'draft')){
//             setSaveMode(submitter.value)
//             props.submitForm()
//         }
//     }   
//     const handleSubmit = (values: ValuesType, formikHelpers: FormikHelpers<ValuesType>) => {
//         if(saveMode) {
//             create({...values, status: saveMode}, (invoice: InvoiceType) => addInvoice(invoice))
//         }
//         discardForm();
//     }
//     const ButtonGroup = () => {
//         return(
//             <div className={`invoiceForm__controlBtn invoiceForm__controlBtn_theme_${theme}`}>
//                 <Button type='button' style="light"  onClick={discardForm}>Discard</Button>
//                 <Button type='submit' value='pending' style="purple">Save & Send</Button>
//                 <Button type='submit' value='draft'   style="dark">Save as Draft</Button>
//             </div>
//         )
//     }
// }

// export function InvoiceForm(props: NewFormType | EditFormType){
//     const theme = getThemeContext();
//     const billFrom_formFieldsInfo = [ 
//         {
//             fieldName: 'Street Address',
//             fieldClass: 'streetFrom',
//             fieldProps: {
//                 as:   '',
//                 type:'text',
//                 name: 'billFrom.street',
//             }
//         },
//         {
//             fieldName: 'City',
//             fieldClass: 'cityFrom',
//             fieldProps: {
//                 as:   '',
//                 type: 'text',
//                 name: 'billFrom.city',
//             }
//         },
//         {
//             fieldName: 'Post Code',
//             fieldClass: 'postCodeFrom',
//             fieldProps: {
//                 as:   '',
//                 type: 'text',
//                 name: 'billFrom.postCode',
//             }
//         },
//         {
//             fieldName: 'Country',
//             fieldClass: 'countryFrom',
//             fieldProps: {
//                 as:   '',
//                 type: 'text',
//                 name: 'billFrom.country',
//             },
//         }
//     ]
//     const billTo_formFieldsInfo = [
//         {
//             fieldName: 'Client’s Name',
//             fieldClass: 'name',
//             fieldProps: {
//                 as:   '',
//                 type:'text',
//                 name: 'billTo.name',
//             }
//         },
//         {
//             fieldName: 'Client’s Email',
//             fieldClass: 'email',
//             fieldProps: {
//                 as:   '',
//                 type:'email',
//                 name: 'billTo.email',
//                 placeholder: 'e.g. email@example.com'
//             }
//         },
//         {
//             fieldName: 'Street Address',
//             fieldClass: 'streetTo',
//             fieldProps: {
//                 as:   '',
//                 type:'text',
//                 name: 'billTo.street',
//             }
//         },
//         {
//             fieldName: 'City',
//             fieldClass: 'cityTo',
//             fieldProps: {
//                 as:   '',
//                 type: 'text',
//                 name: 'billTo.city',
//             }
//         },
//         {
//             fieldName: 'Post Code',
//             fieldClass: 'postCodeTo',
//             fieldProps: {
//                 as:   '',
//                 type: 'text',
//                 name: 'billTo.postCode',
//             }
//         },
//         {
//             fieldName: 'Country',
//             fieldClass: 'countryTo',
//             fieldProps: {
//                 as:   '',
//                 type: 'text',
//                 name: 'billTo.country',
//             },
//         },

//     ]
//     const dateDescripton_formFieldsInfo = [ 
//         {
//             fieldName: 'Invoice Date',
//             fieldClass: 'invoiceDate',
//             fieldProps: {
//                 as:   '',
//                 type: 'date',
//                 name: 'invoiceDate',
//             }
//         },
//         {
//             fieldName: 'Payment Terms',
//             fieldClass: 'paymentTerms',
//             fieldProps: {
//                 as:   'select',
//                 name: 'paymentTerms',
//             },
//             options: [
//                 {name: 'Net 1 Day',  value: 1},
//                 {name: 'Net 7 Day',  value: 7},
//                 {name: 'Net 14 Day', value: 14},
//                 {name: 'Net 30 Day', value: 30},
//             ]
//         },
//         {
//             fieldName: 'Project Description',
//             fieldClass: 'projectDescription',
//             fieldProps: {
//                 as:   '',
//                 type: 'text',
//                 name: 'projectDescription',
//                 placeholder: 'e.g. Graphic Design Service',
//             }
//         },
//     ]
//     const formik = useFormik({
//         initialValues: initialValues,
//         onSubmit: () => console.log('submit'),
//         validate: validate
//     })

//     if(isNewForm(props)){
//         getNewUtils(props, formik.resetForm)
//     }else{
//         // formTitle = `Edit #${props.invoice.id}`;
//         // closeModal = props.closeModal;
//         // initialValues = props.invoice;
//     }


//     const [saveMode, setSaveMode] = useState<FormSavingModeType>(undefined);

//     const discardForm = (resetForm: ()=>void) => {
//         resetForm();
//         closeModal();
//     }
//     const handlePreSubmit = (e: SyntheticEvent<HTMLFormElement, SubmitEvent>, props: FormikProps<ValuesType>) => {
//         e.preventDefault()
//         const submitter = e.nativeEvent.submitter
//         if(submitter instanceof HTMLButtonElement && (submitter.value === 'pending' || submitter.value === 'draft')){
//             setSaveMode(submitter.value)
//             props.submitForm()
//         }
//     }   
//     const handleSubmit = (values: ValuesType, formikHelpers: FormikHelpers<ValuesType>) => {
//         if(saveMode) {
//             create({...values, status: saveMode}, (invoice: InvoiceType) => addNewInvoice(invoice))
//         }
//         discardForm(formikHelpers.resetForm);
//     }

//     const saveAsDraft = () => {

//     }
//     const saveSend = () => {

//     }
    
//     return(
//         <div className='invoiceForm'>
//             {/* <h2 className="invoiceForm_form-type">{formTitle}</h2> */}
//             <Formik
//                 initialValues={initialValues}
//                 validate={validate}
//                 onSubmit={handleSubmit}
//             >
//                 <form onSubmit={(e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => handlePreSubmit(e, props)} className={`invoiceForm__form invoiceForm__form_theme_${theme}`}>
//                     <div className="invoiceForm__fields">
//                         <fieldset className="invoiceForm__bill-from">
//                             <legend className="invoiceForm__partName">Bill From</legend>
//                             { billFrom_formFieldsInfo.map(data => <FormField key={data.fieldClass} {...data}/>) }
//                         </fieldset>
//                         <fieldset className="invoiceForm__bill-to">
//                             <legend className="invoiceForm__partName">Bill To</legend>
//                             { billTo_formFieldsInfo.map(data => <FormField key={data.fieldClass} {...data}/>) }
//                         </fieldset>
//                         <fieldset className="invoiceForm__date-descripton">
//                             { dateDescripton_formFieldsInfo.map(data => <FormField key={data.fieldClass} {...data}/> ) }
//                         </fieldset>
//                         <fieldset className="invoiceForm__itemList">
//                             <legend className="invoiceForm__partName-itemList">Item List</legend>
//                             {!Array.isArray(formik.errors.items) && <div className="error">{formik.errors.items}</div>}
//                             <ItemList 
//                                 values={formik.values}
//                             />
//                         </fieldset>
//                     </div>
//                     <div className={`invoiceForm__controlBtn invoiceForm__controlBtn_theme_${theme}`}>
//                         <Button type='button' style="light"  onClick={() => discardForm(props.resetForm)}>Discard</Button>
//                         <Button type='button' value='pending' style="purple">Save & Send</Button>
//                         <Button type='button' value='draft'   style="dark">Save as Draft</Button>
//                     </div>
//                 </form>
//             </Formik>
//         </div>
//     )
// }



const validate = (values: FormType) => {
    const errors: any = {};
    console.log(values.status);

    if(values.status === 'draft'){
        if(values.billTo.email && !/.+@.+\..+/i.test(values.billTo.email)){
            errors.billTo = {...errors.billFrom, email:   'Invalid email address'};
        }
        // console.log(errors)
    }else if(values.status === 'pending'){
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
        // console.log(errors)
    }
    return errors;

}

type NewFormType = {
    type: 'new',
    addInvoice: (invoice: InvoiceType) => void,
    closeModal: () => void
};
type EditFormType = {
    type: 'edit',
    invoice: InvoiceType
    editInvoice: (editInvoice: InvoiceType) => void,
    closeModal: () => void
};
function isNewForm(value: NewFormType | EditFormType): value is NewFormType
{
    return value.type === 'new';
}
type FormUtilsType = {
    formTitle: string, 
    initialValues: FormType, 
    handleSubmit: (values: FormType, formikHelpers: FormikHelpers<FormType>) => void, 
    ButtonGroup: (props: FormikProps<FormType>) => ReactNode
}


function getUtilitiesToCreate(props: NewFormType): FormUtilsType {
    const formTitle = 'New Invoice';
    const {addInvoice, closeModal} = props;
    const initialValues: FormType = emptyFormValues;
    const discardForm = (resetForm: () => void) => {
        resetForm();
        closeModal();
    }
    const handleSubmit = (values: FormType, formikHelpers: FormikHelpers<FormType>) => {
        console.log('form is submiting')
        create(values, addInvoice)
        discardForm(formikHelpers.resetForm);
    }
    const saveAsDraft =  async (value: FormType, props: FormikProps<FormType>) => {
        console.log('try save as draft');
        await props.setValues({...value, status: 'draft'});
        props.submitForm();
    }
    const saveSend = async (value: FormType, props: FormikProps<FormType>) => {
        console.log('try save as pending');
        await props.setValues({...value, status: 'pending'});
        props.submitForm();
    }
    const ButtonGroup = (props: FormikProps<FormType>) => {
        return(
            <>
                <Button type='button' style="light"  onClick={() => discardForm(props.resetForm)}    >Discard</Button>
                <Button type='button' style="purple" onClick={() => saveSend(props.values, props)}   >Save & Send</Button>
                <Button type='button' style="dark"   onClick={() => saveAsDraft(props.values, props)}>Save as Draft</Button>
            </>
        )
    }
    return {formTitle, initialValues, handleSubmit, ButtonGroup}
}

function getEditingUtilities(props: EditFormType): FormUtilsType {
    const formTitle = `Edit #${props.invoice.id}`;
    const initialValues: FormType = {
        status: props.invoice.status,
        billFrom: {
            street:   props.invoice.billFrom.street,
            city:     props.invoice.billFrom.city,
            postCode: props.invoice.billFrom.postCode,
            country:  props.invoice.billFrom.country,   
        },
        billTo: {
            name:     props.invoice.billTo.name,
            email:    props.invoice.billTo.email,
            street:   props.invoice.billTo.street,
            city:     props.invoice.billTo.city,
            postCode: props.invoice.billTo.postCode,
            country:  props.invoice.billTo.country,
        },
        invoiceDate:  props.invoice.invoiceDate,
        paymentTerms: props.invoice.paymentTerms,
        projectDescription: props.invoice.projectDescription,
        items: props.invoice.items
    }
    const {editInvoice, closeModal} = props;
    const discardForm = (resetForm: () => void) => {
        resetForm();
        closeModal();
    }
    const handleSubmit = (values: FormType, formikHelpers: FormikHelpers<FormType>) => {
        // сравнить values с initialValues и создать список измененных полей DTO
        console.log('form is submiting')
        update(
            {
                ...values, 
                id: props.invoice.id, 
                amountDue: props.invoice.amountDue,
                paymentDue: props.invoice.paymentDue
            }, 
            editInvoice
        )
        discardForm(formikHelpers.resetForm);
    }
    const ButtonGroup = (props: FormikProps<FormType>) => {
        return(
            <>
                <Button type='button' style="light"  onClick={() => discardForm(props.resetForm)}>Cancel</Button>
                <Button type='submit' style="purple" >Save Changes</Button>
            </>
        )
    }
    return {formTitle, initialValues, handleSubmit, ButtonGroup}
}


export function InvoiceForm(props: NewFormType | EditFormType){
    const theme = getThemeContext();
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
    const {formTitle, initialValues, handleSubmit, ButtonGroup} = isNewForm(props) ? getUtilitiesToCreate(props) : getEditingUtilities(props);
    return(
        <div className='invoiceForm'>
            <h2 className="invoiceForm_form-type">{formTitle}</h2>
            <Formik
                initialValues={initialValues}
                validate={validate}
                onSubmit={handleSubmit}
            >
                {props => (
                    <Form className={`invoiceForm__form invoiceForm__form_theme_${theme}`}>
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
                            <ButtonGroup {...props}/>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}