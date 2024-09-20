import FFieldMDP from "../FFieldMDP";
import { RuleType } from "../formHook";
import GTextField from "./FTextField"

export class FTextFieldMDP implements FFieldMDP {
    componentName: string = "FTextField";
    label: string;
    dataSelectorKey: string;
    rules?: RuleType;

    constructor(props: {label: string;dataSelectorKey: string;rules?: RuleType}) {
        this.rules = props.rules;
        this.label = props.label;
        this.dataSelectorKey = props.dataSelectorKey;
    }
    getMetaData() {
        return {
            componentName: this.componentName,
            props: {
                label: this.label,
                dataSelectorKey: this.dataSelectorKey,
                rules: this.rules
            }
        }
    }
}