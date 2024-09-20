import { MDP } from "../MDP";
import { generateElementFromMetaData } from "../mdpHook";
import { useErrorHanlder } from "./formHook";
import React from 'react';
const FFormC = (props: {value: any;onInput: (val: any)=>void;fieldMetaDataList: any[];actionMetaDataList: any[];}) => {
    const [errors,validateField,submitForm] = useErrorHanlder();
    const handleValueChange = (value: string, fieldProps: any) =>{
        const valObject = props.value ||{};
        valObject[fieldProps.dataSelectorKey] = value;
        validateField(valObject,fieldProps.rules,fieldProps.dataSelectorKey)
        props.onInput({...valObject})
    }
    
    const handleSubmitButtonClick = (fieldMetaData: any)=> {
        submitForm(props.value,props.fieldMetaDataList,(status: boolean) => {
            console.log(status,"Status");
            if(status===true) {
                fieldMetaData.props.onSubmit();
            }
            
        })
    }
    return(
        <div>
            {
                props.fieldMetaDataList.map(fieldMetaData=> {
                    return (
                       generateElementFromMetaData({
                        componentClassMetaData: fieldMetaData,
                        onInput: (val: string) => {handleValueChange(val, fieldMetaData.props)},
                        value: props.value?props.value[fieldMetaData.props.dataSelectorKey]:'',
                        extraProps: {key: fieldMetaData.props.dataSelectorKey,errorText: errors[fieldMetaData.props.dataSelectorKey]}
                       })
                    )
                })
            }

            {
                props.actionMetaDataList.map((fieldMetaData, index)=> {
                    return (
                        generateElementFromMetaData({
                            componentClassMetaData: fieldMetaData,
                            extraProps: {key: index,onSubmit:() => handleSubmitButtonClick(fieldMetaData)}
                           })
                    )
                })
            }
        </div>
    )    
}

export default FFormC;