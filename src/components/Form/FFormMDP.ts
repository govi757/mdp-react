import React from "react"
import FForm from "./FForm"
import { MDP } from "../MDP";
import FFieldMDP from "./FFieldMDP";

export class FFormMDP implements MDP{
    componentName: string = "FForm";

    fieldMDPList: FFieldMDP[] = [];
    actionMDPList: MDP[] = [];
    getMetaData() {
        return {
            componentName: this.componentName,
            props: {
                fieldMetaDataList: this.fieldMDPList.map(item => item.getMetaData()),
                actionMetaDataList: this.actionMDPList.map(item => item.getMetaData()),
            }
            
        }
    }
    addAction(action: MDP) {
        this.actionMDPList.push(action);
        return this;
    }

    addField(field: FFieldMDP) {
        this.fieldMDPList.push(field);
        return this;
    }
}