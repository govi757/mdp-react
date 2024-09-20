import { MDP } from "@/components/MDP";

export default class FCellTextMDP implements MDP {
    
    dataSelectorKey: string | undefined;
    constructor({
        dataSelectorKey
    }: {  dataSelectorKey?: string }) {
        this.dataSelectorKey = dataSelectorKey;
    }
    componentName: string = "FCellText";
    getMetaData(): object {
        return {
            componentName: this.componentName,
            props: {
                dataSelectorKey: this.dataSelectorKey,
            }
        }
    }

}