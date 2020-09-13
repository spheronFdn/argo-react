import React, { createContext, useMemo } from "react";
// import { AuthService, ApiService } from "../services";
import { ApiService } from "../services";
import { IUser } from "../services/model";
import { Actions } from "./Actions";

const actionInitialValue = {
  setModalConfig: (openModal: boolean, modalConfig: any) => {},
  fetchUser: () => {},
};

const stateInitialValue = {
  openModal: false,
  modalConfig: { type: "" },
};

export const ActionContext = createContext(actionInitialValue);
export const StateContext = createContext(stateInitialValue);

// const useQuery = () => {
//   return new URLSearchParams(useLocation().search);
// };

export const AppProvider = (props: any) => {
  // const history = useHistory();
  // const query = useQuery();
  const [state, dispatch] = React.useReducer(
    (prevState: any, action: any) => {
      switch (action.type) {
        case Actions.TOGGLE_MODAL:
          return {
            ...prevState,
            openModal: action.openModal,
            modalConfig: action.modalConfig,
          };
        case Actions.FETCH_USER:
          return {
            ...prevState,
            user: action.user,
          };

        default:
      }
    },
    {
      openModal: false,
      modalConfig: { type: "" },
      user: null,
    },
  );

  const actionContext = useMemo(
    () => ({
      setModalConfig: (openModal: boolean, modalConfig: any) => {
        dispatch({ type: Actions.TOGGLE_MODAL, openModal, modalConfig });
      },
      fetchUser: () => {
        ApiService.fetchUser("1234").subscribe((user: IUser) => {
          // eslint-disable-next-line no-console
          console.log(user);
          dispatch({ type: Actions.FETCH_USER, user });
        });
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  return (
    <ActionContext.Provider value={actionContext}>
      <StateContext.Provider value={state}>{props.children}</StateContext.Provider>
    </ActionContext.Provider>
  );
};
