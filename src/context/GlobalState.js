import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

const initial_data = {
  user_data: {},
  authenticated: false,
  loading: false,
};

export const GlobalContext = createContext(initial_data);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initial_data);

  function update_user(userdata) {
    dispatch({
      type: "ADD_USER",
      payload: userdata,
    });
  }
  async function logout() {
    await localStorage.removeItem("githu_token");
    dispatch({
      type: "LOGOUT",
    });
  }
  function loading() {
    dispatch({ type: "UPDATE_LOADING" });
  }

  return (
    <GlobalContext.Provider
      value={{
        user_data: state.user_data,
        authenticated: state.authenticated,
        loader:state.loading,
        loading,
        update_user,
        logout,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
