let initaialState = {
  items: [],
};
const reducer = (state = initaialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return state.items.length > 0
        ? { ...state, items: [...action.payload.items] }
        : { ...state, items: [...action.payload.items] };

    case "REMOVE_FROM_CART":
      if (action.payload.items.length > 0) {
        return {
          ...state,
          items: [...action.payload.items],
        };
      } else {
        return {
          ...state,
          items: [],
        };
      }

    case "LOAD_INITIAL_CART":
      if (action.payload.length > 0) {
        return {
          ...state,
          items: [...action.payload],
        };
      }
      return {
        ...state,
      };

    case "CART_SERVER_ERROR":
      return {
        ...state,
        items: [],
      };

    case "SAVE_TO_LOCAL_STORAGE":
      if (state.items.length > 0) {
        localStorage.setItem("cart", JSON.stringify(state.items));
      } else {
        localStorage.setItem("cart", JSON.stringify([]));
      }
      return {
        ...state,
      };

    case "GET_FORM_LOCAL_STORAGE":
      const newState = JSON.parse(localStorage.getItem("cart"));
      return newState
        ? {
            ...state,
            items: newState,
          }
        : {
            ...state,
            items: [],
          };

    case "REMOVE_FROM_LOCAL_CART":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };

    case "STOP_LOADING_LOCAL_STORAGE":
      return {
        ...state,
        items: [],
      };

    case "ADD_TO_LOCAL_CART":
      return state.items.length > 0
        ? { ...state, items: [...state.items, action.payload] }
        : { ...state, items: [action.payload] };

    default:
      return state;
  }
};

export default reducer;
