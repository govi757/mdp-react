import { Button } from "@mui/material"
import React from 'react';

const FBtn = (props: {onClick: () => void;label: string}) => {
    return <Button onClick={props.onClick}>{props.label||"Submit"}</Button>
}
export default FBtn;