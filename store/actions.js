export const setUserName = (userName) => {
  return { type: "SET_USER_NAME", payload: userName };
};

export const setUsers = (users) => {
  return { type: "SET_USERS", payload: users };
};

export const setErrorMessage = (errorMessage) => {
  return { type: "SET_ERROR_MESSAGE", payload: errorMessage };
};
