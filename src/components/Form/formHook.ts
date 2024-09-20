import { useState } from "react"

export const useErrorHanlder = () => {
    const [errors, setErrors] = useState({});

    const validateField: any = (valObject: any, rules: RuleType, dataSelectorKey: string) => {

        if (rules) {
            const error = validationRules[rules]?.(valObject[dataSelectorKey]);
            if (error === true) {
                setErrors((prevErrors) => ({ ...prevErrors, [dataSelectorKey]: undefined }))
            } else {
                setErrors((prevErrors) => ({ ...prevErrors, [dataSelectorKey]: error }))
            }
        }
    }

    const submitForm: any = async (valObject: any,fieldMetaDataList: any[], cb: (val: boolean)=>void) => {
        let errorObj = {};
        fieldMetaDataList.forEach((fieldMetaData: any) => {

            if (fieldMetaData.props.rules) {
                const error: any = validationRules[fieldMetaData.props.rules]?.(valObject[fieldMetaData.props.dataSelectorKey]);
                
                if (error !== true) {
                    errorObj = {...errorObj, [fieldMetaData.props.dataSelectorKey]: error}
                }
            }
        })
        setErrors({...errorObj});
        if(Object.keys(errorObj).length===0) {
            cb(true)
        } else {
            cb(false)
        }
    }

    return [errors, validateField,submitForm];
}


export const validationRules: any = {
    email: (value: any) => {
        if (value) {
            return /^\S+@\S+\.\S+$/.test(value) ? true : 'Invalid email'
        } else {
            return "Required"
        }
    },
    password: (value: any) => value.length < 8 ? 'Password must be at least 8 characters' : null,
    required: (value: any) => !!value ? true : 'The field is required',
}

export enum RuleType {
    email = "email",
    password = "password",
    required = "required"
}
