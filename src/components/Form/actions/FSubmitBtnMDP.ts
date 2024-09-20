import React from "react";
import { MDP } from "../../MDP";

export class FSubmitBtnMDP implements MDP {
    componentName: string = "FSubmitBtn";
    onSubmit: () => void;
    constructor(props: {onSubmit: () => void}) {
        this.onSubmit = props.onSubmit;
    }
    getMetaData() {
        return {
            componentName: this.componentName,
            props:{
                onSubmit: this.onSubmit
            }
        }
    };
}