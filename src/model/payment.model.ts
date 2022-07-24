export interface IPaymentModel {
  projectName: string;
  deploymentId: string;
  buildTime: string;
  protocol: string;
  providerFee: number;
  finalArgoFee: number;
  token: string;
  createdAt: string;
  updatedAt: string;
}
