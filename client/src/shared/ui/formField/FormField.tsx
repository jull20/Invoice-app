import { ErrorMessage, Field } from "formik";
import "./formField.scss"
import { getThemeContext } from "../../contexts";

export function FormField({fieldName, fieldClass, fieldProps, options}: {fieldName:string, fieldClass:string, fieldProps: {[k:string]: any}, options?: {name:string, value:number}[]}) {
    const theme = getThemeContext();
    let rootInputClass = [`formField__input formField__input_theme_${theme}`] 
    if('className' in fieldProps){
        rootInputClass.push(fieldProps.className)
    }
    fieldProps = {...fieldProps, className: rootInputClass.join(' ')}
    
    return (
        <label className={`formField formField-${fieldClass}`}>
            <span className={`formField__name formField__name_theme_${theme}`}>{fieldName}</span>
            {
                fieldProps.as === 'select' && options 
                ? <Field {...fieldProps}>
                    {
                        options.map((option) => {
                            return <option key={option.value} value={option.value}>{option.name}</option>
                        })
                    }
                  </Field>
                : <Field {...fieldProps}/>
            }
            <ErrorMessage component='div' className="error" name={fieldProps.name}/>
        </label>
    );
}