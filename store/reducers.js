// This file will contain the reducer function to handle the state updates

const initialState = {
  userName: "",
  users: [],
  errorMessage: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER_NAME":
      return { ...state, userName: action.payload };
    case "SET_USERS":
      return { ...state, users: action.payload };
    case "SET_ERROR_MESSAGE":
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};

export default reducer;
