export const AppReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userName", action.payload.body.name);
      return {
        ...state,
        userName: action.payload.body.name,
      };
    case "LOGIN_ERROR":
      return {
        ...state,
        error_msg: action.payload.message,
      };
    case "REGISTER":
      return {
        ...state,
        msg: action.payload,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        userName: "",
      };
    default:
      return state;
  }
};
