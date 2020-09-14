import { ApiService } from "../services";
import { IUserResponse } from "../model/service.model";
import Actions from "./Actions";
import { IModalModel } from "../model/hooks.model";

const Reducers = (dispatch: any) => ({
  toggleModal: (modal: IModalModel) => {
    dispatch({ type: Actions.TOGGLE_MODAL, modal });
  },
  fetchUser: () => {
    dispatch({ type: Actions.SET_USER_LOADING, userLoading: true });

    ApiService.fetchUser("1234").subscribe((response: IUserResponse) => {
      // eslint-disable-next-line no-console
      console.log(response.user);
      dispatch({ type: Actions.FETCH_USER, user: response.user });
      dispatch({
        type: Actions.SET_SELECTED_ORG,
        selectedOrg: response.user.organizations
          ? response.user.organizations[0]
          : null,
      });
      dispatch({ type: Actions.SET_USER_LOADING, userLoading: false });
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
