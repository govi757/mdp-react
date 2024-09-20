import { Button } from "@mui/material"
import React from 'react';
const FSubmitBtn = (props: {onSubmit: () => void}) => {
    return <Button onClick={props.onSubmit}>Submit</Button>
}

export default FSubmitBtn;