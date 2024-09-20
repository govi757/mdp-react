import { MDP } from "../MDP";
import { RuleType } from "./formHook";


export default interface FFieldMDP extends MDP {
  dataSelectorKey: string
  label: string;
  rules?: RuleType;
  hidden?: boolean;
}


