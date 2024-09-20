import React from 'react';
import { Input } from "@mui/material";
import TextField from '@mui/material/TextField';
import { useMemo } from "react";

const FTextField = (props: 
    {
    value: any,
    onInput:(val: string)=>void;
    label: string;
    dataSelectorKey: string;
    errorText?: string;
}) => {
    console.log("Rendering text field")
    return (
        <div >
            <TextField
            size="small"
            value={props.value}
            label={props.label}
            onInput={(val: any) => props.onInput(val.target.value)}
            helperText={props.errorText}
            error={!!props.errorText}
            sx={{py:1}}
            />
        </div>
    )
}

export default FTextField;