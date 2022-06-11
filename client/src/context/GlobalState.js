import React, { createContext, useReducer } from "react";
import { AppReducer } from "./AppReducer";
import * as api from "../api/index.js";

// Initial state
const initialState = {
  userName: "",
  error_msg: "",
  documents: [],
  curr_doc: "",
  deleteDocId: "",
  deleteDocName: "",
  showNewDocModal: false,
  showDeleteDocModal: false,
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

  function toggleNewDocModal() {
    dispatch({
      type: "TOGGLE_NEW_DOC_MODAL"
    })
  }

  function toggleDeleteDocModal(id, name) {
    const doc_id = id ?? "";
    const doc_name = name ?? "";
    dispatch({
      type: "TOGGLE_DELETE_DOC_MODAL",
      payload: {doc_id, doc_name}
    })
  }

  function createDocument(docName, history) {
      api.createDocument(docName).then((res) =>{
        const document = res?.data?.document;
        dispatch({
          type: "CREATE_DOCUMENT",
          payload: document,
         });
        history.push(`/documents/${document.doc_id}`);
      }).catch((err) => {
        dispatch({
          type: "CREATE_ERROR",
        })
      })
  }

  function getDocuments() {
    api.fetchDocuments().then(res => {
      const documents = res?.data?.documents;
      dispatch({
        type: "DOCUMENTS",
        payload: documents,
      });
    }).catch(err => {
      if (err.response) {
        dispatch({
          type: "LOGOUT",
        });
      }else {
        console.log(err);
        dispatch({
          type: "FETCH_ERROR",
        });
      }
    })
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
        curr_doc: state.curr_doc,
        fetchError: state.fetchError,
        isLoading: state.isLoading,
        deleteDocId: state.deleteDocId,
        deleteDocName: state.deleteDocName,
        showNewDocModal: state.showNewDocModal,
        showDeleteDocModal: state.showDeleteDocModal,
        login,
        register,
        logout,
        getDocuments,
        deleteDocument,
        createDocument,
        toggleNewDocModal,
        toggleDeleteDocModal
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
