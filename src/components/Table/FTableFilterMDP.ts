import { MDP } from "../MDP";



export default class FTableFilterMDP implements MDP {
   
    label: string;
    dataSelectorKey: string | undefined;
    filterItems: any[] ;
    itemKey?: string;
    itemText?: string;
    booleanFilter?: boolean;
    enableHeaderFilter?: boolean;
    colorCodeData?: any;

    constructor(props: {
        label: string;
        dataSelectorKey: string ;
        filterItems?: any[];
        itemKey?: string;
        itemText?: string;
        booleanFilter?: boolean;
        enableHeaderFilter?: boolean;
        colorCodeData?: any;
    }) {
        this.label = props.label;
        this.dataSelectorKey = props.dataSelectorKey;
        this.filterItems = props.filterItems || [];
        this.itemKey = props.itemKey || "id";
        this.itemText = props.itemText || "name";
        this.booleanFilter = props.booleanFilter;
        this.enableHeaderFilter = props.enableHeaderFilter;
        this.colorCodeData = props.colorCodeData;
    }

    getMetaData(): object {
        return {
            label: this.label,
            dataSelectorKey: this.dataSelectorKey,
            filterItems: this.filterItems,
            itemKey: this.itemKey,
            itemText: this.itemText,
            booleanFilter: this.booleanFilter,
            enableHeaderFilter: this.enableHeaderFilter,
            colorCodeData: this.colorCodeData
        }
    }
}


export enum FilterType {
    Boolean="Boolean",
    Array="Array"
}


