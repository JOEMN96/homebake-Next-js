import axios from "../../helpers/backendAxios";

export const addToCart = (item) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("addItem", item);
      dispatch({
        type: "ADD_TO_CART",
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: "CART_SERVER_ERROR",
        payload: item,
      });
    }
  };
};

export const removeFromCart = (item) => {
  return async (dispatch) => {
    const res = await axios.post("removeItem", { id: item.id });
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: res.data,
    });
  };
};

export const setUpLocalStorage = (action, load) => {
  return {
    type: action,
    payload: load,
  };
};

export const loadCart = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("/cart");
      dispatch({ type: "LOAD_INITIAL_CART", payload: res.data });
    } catch (error) {
      dispatch({ type: "IS_USER_AUTHENTICATED", payload: false });
    }
  };
};
