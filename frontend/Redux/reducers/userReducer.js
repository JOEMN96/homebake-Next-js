let initaialState = {
  user: null,
};

const reducer = (state = initaialState, action) => {
  switch (action.type) {
    case "TICK":
      return { ...state, tick: action.payload };
    default:
      return state;
  }
};

export default reducer;
