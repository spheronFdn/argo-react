import { IProject } from "../../../../../../../../model/hooks.model";

export default interface IWebhookItemProps {
  id: any;
  type: string;
  name: string;
  framework: string;
  branch: string;
  workspace: string;
  packageManager: string;
  buildCommand: string;
  publishDirectory: string;
  protocol: string;
  selectedProject: IProject | null;
}
