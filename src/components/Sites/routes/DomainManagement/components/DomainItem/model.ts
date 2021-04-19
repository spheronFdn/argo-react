export default interface IDeploymentItemProps {
  index: number;
  type: string;
  domainId: string;
  domain: string;
  transactionId: string;
  isSubdomain: boolean;
  autoDns: boolean;
  uuid: string;
  ownerVerified: boolean;
}
