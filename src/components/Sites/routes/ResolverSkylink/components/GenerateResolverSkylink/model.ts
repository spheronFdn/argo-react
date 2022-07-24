import { IResolverSkylink } from "../../../../../../model/hooks.model";

export default interface IGenerateResolverSkylinkProps {
  type: string;
  resolver?: IResolverSkylink;
  close: () => void;
}
