import React, { createContext, useReducer } from "react";
import { AppReducer } from "./AppReducer";
import * as api from "../api/index.js";

// Initial state
const initialState = {
  userName: "",
  error_msg: "",
  documents: [],
  fetchError: false,
  isLoading: true,
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
      if ("token" in data) {
        dispatch({
          type: "AUTH",
          payload: data,
        });
        history.push("/dashboard");
      } else {
        dispatch({
          type: "AUTH_ERROR",
          payload: data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function register(formData, history) {
    try {
      const { data } = await api.register(formData);
      if ("token" in data) {
        dispatch({
          type: "AUTH",
          payload: data,
        });
        history.push("/dashboard");
      } else {
        dispatch({
          type: "AUTH_ERROR",
          payload: data,
        });
      }
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

  async function getDocuments() {
    try {
      const { documents } = await api.fetchDocuments();
      if (documents) {
        dispatch({
          type: "DOCUMENTS",
          payload: documents,
        });
      }
    } catch (error) {
      dispatch({
        type: "FETCH_ERROR",
      });
    }
  }

  async function deleteDocument(id) {
    try {
      await api.deleteDocument(id);
      dispatch({
        type: "DELETE_DOCUMENT",
        payload: id,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        userName: state.userName,
        error_msg: state.error_msg,
        documents: state.documents,
        fetchError: state.fetchError,
        isLoading: state.isLoading,
        login,
        register,
        logout,
        getDocuments,
        deleteDocument,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
