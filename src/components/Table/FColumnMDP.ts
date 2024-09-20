import { FTextFieldMDP } from "../Form/fields/FTextFieldMDP";
import { MDP } from "../MDP";
import FCellTextMDP from "./cell/FCellTextMDP";

export default class FColumnMDP implements MDP {
    label: string;
    dataSelectorKey: string;
    columnCellMDP?: MDP;

    constructor(props: {label: string;dataSelectorKey: string;columnCellMDP?: MDP;}) {
        this.label = props.label;
        this.dataSelectorKey = props.dataSelectorKey;
        this.columnCellMDP = props.columnCellMDP||new FCellTextMDP({dataSelectorKey: this.dataSelectorKey})
    }
    getMetaData() {
        return {
            label: this.label,
            dataSelectorKey: this.dataSelectorKey,
            columnCellMetaData: this.columnCellMDP?.getMetaData(),
        }
    }

    static getBuilderMetaData() {
        return {
            label: new FTextFieldMDP({label: "Label",dataSelectorKey:"label"}),
            dataSelectorKey: new FTextFieldMDP({label: "Data Selector Key",dataSelectorKey:"dataSelectorKey"}),
            sagar: new FTextFieldMDP({label: "Data Selector Key",dataSelectorKey:"dataSelectorKey"}),
            // columnCellMetaData: this.columnCellMDP?.getMetaData(),
        }
    }
}