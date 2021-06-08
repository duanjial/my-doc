import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

// Initial state
const initialState = {
  isLogin: false,
  userName: "",
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  function setIsLogin(isLogin) {
    dispatch({
      type: "SET_IS_LOGIN",
      payload: isLogin,
    });
  }

  function setUsername(userName) {
    dispatch({
      type: "SET_USERNAME",
      payload: userName,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        isLogin: state.isLogin,
        userName: state.userName,
        setIsLogin,
        setUsername,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
