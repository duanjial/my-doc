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
      };
    case "DOCUMENTS":
      return {
        ...state,
        documents: action.payload,
        fetchError: false,
      };
    case "FETCH_ERROR":
      return {
        ...state,
        fetchError: true,
      };
    default:
      return state;
  }
};
