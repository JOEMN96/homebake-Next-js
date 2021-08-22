let initaialState = {
  items: [],
};
const reducer = (state = initaialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return state.items.length > 0
        ? { ...state, items: [...state.items, action.payload] }
        : { ...state, items: [action.payload] };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };
    default:
      return state;
  }
};

export default reducer;
