export const AppReducer = (state, action) => {
  switch (action.type) {
    case "AUTH":
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userName", action.payload.name);
      return {
        ...state,
        userName: action.payload.name,
      };
    case "AUTH_ERROR":
      return {
        ...state,
        error_msg: action.payload.message,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        userName: "",
        documents: [],
        fetchError: false,
        error_msg: "",
        isLoading: false,
        isLogout: true
      };
    case "TOGGLE_NEW_DOC_MODAL":
      return {
        ...state,
        showNewDocModal: !state.showNewDocModal
      };
    case "TOGGLE_DELETE_DOC_MODAL":
      return {
        ...state,
        showDeleteDocModal: !state.showDeleteDocModal,
        deleteDocId: action.payload.doc_id,
        deleteDocName: action.payload.doc_name
      };
    case "DOCUMENTS":
      return {
        ...state,
        documents: action.payload,
        fetchError: false,
        isLoading: false,
      };
    case "DELETE_DOCUMENT":
      return {
        ...state,
        documents: state.documents.filter((doc) => doc.doc_id !== action.payload),
      };
    case "UPDATE_USERS":
      return {
        ...state,
        users: action.payload
      }
    case "CREATE_DOCUMENT":
      return {
        ...state,
        documents: state.documents,
        curr_doc: action.payload,
        fetchError: false,
        isLoading: false,
      };
    case "FETCH_ERROR":
      return {
        ...state,
        fetchError: true,
      };
    case "CREATE_ERROR":
      console.log("create error");
      break;
    default:
      return state;
  }
};
