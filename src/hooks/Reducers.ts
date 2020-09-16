import { ApiService } from "../services";
import { IUserResponse } from "../model/service.model";
import Actions from "./Actions";
import { IModalModel, IOrganization } from "../model/hooks.model";

const Reducers = (dispatch: any) => ({
  toggleModal: (modal: IModalModel) => {
    dispatch({ type: Actions.TOGGLE_MODAL, modal });
  },
  fetchUser: (orgId?: string) => {
    dispatch({ type: Actions.SET_USER_LOADING, userLoading: true });

    ApiService.fetchUser("1234").subscribe((response: IUserResponse) => {
      // eslint-disable-next-line no-console
      console.log(response.user, orgId);
      dispatch({ type: Actions.FETCH_USER, user: response.user });
      dispatch({
        type: Actions.SET_SELECTED_ORG,
        selectedOrg: response.user.organizations
          ? orgId
            ? response.user.organizations.filter((org) => org._id === orgId)[0]
            : response.user.organizations[0]
          : null,
      });
      dispatch({ type: Actions.SET_USER_LOADING, userLoading: false });
    });
  },
  setSelectedOrganization: (organization: IOrganization) => {
    dispatch({
      type: Actions.SET_SELECTED_ORG,
      selectedOrg: organization,
    });
  },
});

export const stateInitialValue = {
  openModal: false,
  modalConfig: { type: "" },
  user: null,
  userLoading: false,
  selectedOrg: null,
};

export default Reducers;
