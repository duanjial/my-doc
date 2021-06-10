export const AppReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        isLogin: true,
        userName: action.payload.body.name,
        userId: action.payload.body._id,
        email: action.payload.body.email,
      };
    case "REGISTER":
      return {
        ...state,
        msg: action.payload,
      };
    case "SET_IS_LOGIN":
      return {
        ...state,
        isLogin: action.payload,
      };
    case "SET_USERNAME":
      return {
        ...state,
        userName: action.payload,
      };
    default:
      return state;
  }
};
