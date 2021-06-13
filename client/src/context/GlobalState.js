import React, { createContext, useReducer } from "react";
import { AppReducer } from "./AppReducer";
import * as api from "../api/index.js";

// Initial state
const initialState = {
  userName: "",
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  async function login(formData, history) {
    try {
      const { data } = await api.logIn(formData);
      dispatch({
        type: "LOGIN",
        payload: data,
      });
      history.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  }

  async function register(formData, history) {
    try {
      const { data } = await api.register(formData);
      dispatch({
        type: "REGISTER",
        payload: data,
      });
      history.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  }

  async function logout() {
    try {
      await api.logout();
      dispatch({
        type: "LOGOUT",
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        userName: state.userName,
        login,
        register,
        logout,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
