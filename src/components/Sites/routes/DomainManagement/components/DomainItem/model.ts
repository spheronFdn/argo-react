export default interface IDeploymentItemProps {
  index: number;
  type: string;
  domainId: string;
  domain: string;
  link: string;
  isSubdomain: boolean;
  autoDns: boolean;
  uuid: string;
  ownerVerified: boolean;
  isHandshake: boolean;
  domainType: string;
}
