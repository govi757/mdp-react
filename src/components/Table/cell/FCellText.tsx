import { selectValue } from "@/components/dataSelector";

const FCellText = (props: {dataSelectorKey: string;value: any}) => {
    return(
        selectValue(props.value,props.dataSelectorKey)
    )
}

export default FCellText;