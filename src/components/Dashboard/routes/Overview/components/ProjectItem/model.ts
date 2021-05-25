import {
  IDomain,
  IRepository,
  ISubdomain,
} from "../../../../../../model/hooks.model";

export default interface IProjectItemProps {
  type: string;
  projectName: string | null;
  latestDeployment: string | null;
  domains: IDomain[] | null;
  subdomains: ISubdomain[] | null;
  githubUrl: string | null;
  updateTime: string | null;
  repo: IRepository | null;
  index: number;
}
