const reducer = (state, action) => {
  switch (action.type) {
    case "TICK":
      return { ...state, tick: action.payload };
    default:
      return state;
  }
};

export default reducer;
