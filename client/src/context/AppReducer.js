export const AppReducer = (state, action) => {
  switch (action.type) {
    case "AUTH":
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userName", action.payload.body.name);
      return {
        ...state,
        userName: action.payload.body.name,
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
        documents: state.documents.filter((doc) => doc !== action.payload),
      };
    case "CREATE_DOCUMENT":
      state.documents.push(action.payload);
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
