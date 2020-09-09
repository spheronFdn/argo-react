import React, { createContext, useMemo } from "react";
// import { AuthService, ApiService } from "../services";
import { useHistory } from "react-router-dom";

const actionInitialValue = {
  setModalConfig: (openModal: boolean, modalConfig: any) => {},
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
  const history = useHistory();
  // const query = useQuery();
  const [state, dispatch] = React.useReducer(
    (prevState: any, action: any) => {
      switch (action.type) {
        case "TOGGLE_MODAL":
          return {
            ...prevState,
            openModal: action.openModal,
            modalConfig: action.modalConfig,
          };

        default:
      }
    },
    {
      openModal: false,
      modalConfig: { type: "" },
    },
  );

  const actionContext = useMemo(
    () => ({
      setModalConfig: (openModal: boolean, modalConfig: any) => {
        if (modalConfig.type === "qfExplainer") {
          history.push({ search: "?modal=qfExplainer" });
        } else {
          history.push({ search: "" });
        }
        dispatch({ type: "TOGGLE_MODAL", openModal, modalConfig });
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
