export const AppReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case "LOGIN":
      console.log("reducer");
      console.log(action.payload.token);
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
      };
    case "REGISTER":
      console.log("register reducer");
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
