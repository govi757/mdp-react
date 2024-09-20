import React from "react";
import { MDP } from "../MDP";
import FDataTable from "./FDataTable";
import FColumnMDP from "./FColumnMDP";
import FTableFilterMDP from "./FTableFilterMDP";

export default class FDataTableMDP implements MDP {
    componentName: string = "FDataTable";
    columnList: FColumnMDP[] = [];
    columnFilterList: FTableFilterMDP[] = [];
    actionList: FTableActionField[] = [];
    itemKey?: string;
    onActionClick?: (actionKey: string,dataList?: any)=>void
    constructor(props: {itemKey?: string;onActionClick?: (actionKey: string)=>void}) {
        this.itemKey = props.itemKey;
        this.onActionClick = props.onActionClick;
    }

    addAction(action: FTableActionField) {
        this.actionList.push(action);
        return this;
    }

    addColumn(action: FColumnMDP) {
        this.columnList.push(action);
        return this;
    }

    getMetaData() {
        return {
            componentName: this.componentName,
            props: {
                columnList: this.columnList.map(item => item.getMetaData()),
                columnFilterList: this.columnFilterList.map(item => item.getMetaData()),
                actionList: this.actionList,
                itemKey: this.itemKey,
                onActionClick: this.onActionClick
            }
        }
    }   

    static getBuilderMetaData() {
        return {
            columnList: FColumnMDP.getBuilderMetaData()
        }
    }

    

}


export interface FTableActionField {
    type: ActionType;
    key: string;
    onClick: (item?: any, index?: number) => any;
    label: string;
    disabled?: boolean;
    confirmation?: boolean;
    singleSelect?: boolean;
    noSelect?: boolean;
    condition?: boolean;
  }

  export enum ActionType {
    ADD = "ADD",
    DELETE = "DELETE",
    EDIT = "EDIT",
    OTHERS = "OTHERS",
    INFO = "INFO",
    REFRESH = "REFRESH",
  }
  