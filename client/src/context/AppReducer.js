export const AppReducer = (state, action) => {
  switch (action.type) {
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
