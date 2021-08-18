import { IDeployment } from "../../../../../../model/hooks.model";

export default interface IDeploymentItemProps {
  index: number;
  type: string;
  deployment: IDeployment | null;
}
