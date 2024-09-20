import React from "react";
import { MDP } from "../../MDP";

export class FBtnMDP implements MDP {
    componentName: string = "FBtn";
    onClick: () => void;
    label: string;
    constructor(props: {onClick: () => void;label: string;}) {
        this.onClick = props.onClick;
        this.label = props.label;
    }
    getMetaData() {
        return {
            componentName: this.componentName,
            props:{
                onClick: this.onClick,
                label:this.label
            }
        }
    };
}