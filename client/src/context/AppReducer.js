export const AppReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userName", action.payload.body.name);
      return {
        ...state,
        userName: action.payload.body.name,
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
