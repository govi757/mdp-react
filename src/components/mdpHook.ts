import React, { useEffect, useState } from "react"
import { MDP } from "./MDP";
import FDataTable from "./Table/FDataTable";
import FFormC from "./Form/FForm";
import FTextField from "./Form/fields/FTextField";
import FSubmitBtn from "./Form/actions/FSubmitBtn";
import FCellText from "./Table/cell/FCellText";

import FBtn from "./Form/actions/FBtn";



export const useMetaData:(props: {mdpClass: MDP, defaultInput?: any;onInput?: (val: any)=>void;extraProps?: any}) => [element: React.ReactElement, input:any,setInput: any] = (props) => {
    console.log(props.defaultInput,props.mdpClass,"defaultInput")
    const [input, setInput] = useState(props.defaultInput);

    // useEffect(() => {
    //     setInput(props.defaultInput)
    // },[props.defaultInput])


    return [generateElementFromMetaData({
        componentClassMetaData: props.mdpClass.getMetaData(),
        onInput: (val: any) => {
            setInput(val);
            props.onInput&&props.onInput(val)
        },
        value: input,
        extraProps:props.extraProps
    }), input,setInput]
}



// export const useMetaDataFromComponentDetails:(props: {componentDetails: {name: string;id: string;metaData: string}, defaultInput?: any;onInput?: (val: any)=>void;extraProps?: any}) => [element: React.ReactElement, input:any] = (props) => {
//     const [input, setInput] = useState(props.defaultInput);

//     console.log(props.componentDetails.metaData,"props.componentDetails.metaData")
//     return [generateElementFromMetaData({
//         componentClassMetaData: JSON.parse((props.componentDetails.metaData)||"{}"),
//         onInput: (val: any) => {
//             setInput(val);
//             props.onInput&&props.onInput(val)
//         },
//         value: input,
//         extraProps:props.extraProps
//     }), input]
// }



export const generateElementFromMetaData = ({componentClassMetaData, value, onInput,extraProps }:{
    componentClassMetaData: any;
    value?: any;
    onInput?: any;
    extraProps?: object;
})=> {
    return React.createElement((ComponentNameMap[componentClassMetaData.componentName] as any),{
        ...componentClassMetaData.props,
        value: value,
        onInput:onInput,
        ...extraProps
    })
}


// export const ComponentNameMap: Map<string, React.ElementType> = new Map([
//     ["FDataTable",FDataTable],
//     ["FForm",FFormC],
// ]);
const ComponentNameMap: any = {
    "FDataTable": FDataTable,
    "FForm": FFormC,
    "FTextField": FTextField,
    "FSubmitBtn": FSubmitBtn,
    "FCellText":FCellText,
    "FBtn":FBtn,
}

export interface IMetaDataHook {
    element: React.ReactElement,
    input?:any;
}