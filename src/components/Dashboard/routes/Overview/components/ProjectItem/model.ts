import { IDomain, IProject } from "../../../../../../model/hooks.model";

export default interface IProjectItemProps {
  type: string;
  projectName: string | null;
  latestDeployment: string | null;
  domains: IDomain[] | null;
  subdomains: IDomain[] | null;
  hnsDomains: IDomain[] | null;
  hnsSubdomains: IDomain[] | null;
  githubUrl: string | null;
  updateTime: string | null;
  repo: IProject | null;
  index: number;
}
