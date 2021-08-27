let initaialState = {
  user: null,
};

const reducer = (state = initaialState, action) => {
  switch (action.type) {
    case "IS_USER_AUTHENTICATED":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export default reducer;
