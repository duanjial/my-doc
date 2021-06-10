import React, { createContext, useReducer } from "react";
import { AppReducer } from "./AppReducer";
import * as api from "../api/index.js";

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

  async function login(formData, history) {
    try {
      const { data } = await api.logIn(formData);
      console.log(data);
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
      console.log(data);
      dispatch({
        type: "REGISTER",
        payload: data,
      });
      history.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        isLogin: state.isLogin,
        userName: state.userName,
        setIsLogin,
        setUsername,
        login,
        register,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
