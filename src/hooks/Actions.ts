import { IModalModel, IOrganization } from "../model/hooks.model";

export default class Actions {
  static TOGGLE_MODAL = "[Actions] TOGGLE_MODAL";
  static FETCH_USER = "[Actions] FETCH_USER";
  static SET_SELECTED_ORG = "[Actions] SET_SELECTED_ORG";
  static SET_USER_LOADING = "[Actions] SET_USER_LOADING";
}
export const actionInitialValue = {
  toggleModal: (modal: IModalModel) => {},
  fetchUser: () => {},
  setSelectedOrganization: (organization: IOrganization) => {},
};
