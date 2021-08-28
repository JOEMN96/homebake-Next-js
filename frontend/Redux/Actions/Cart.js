import axios from "../../helpers/backendAxios";

export const addToCart = (item) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("addItem", item);
      console.log(res.data);
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
    console.log(res.data);
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: res.data,
    });
  };
};

export const saveToLocalStorage = () => {
  return {
    type: "SAVE_TO_LOCAL_STORAGE",
    payload: null,
  };
};

export const loadLocalStorage = () => {
  return {
    type: "GET_FORM_LOCAL_STORAGE",
    payload: null,
  };
};

const editLocalStorage = (cartAction) => {};

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
