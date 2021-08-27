import axios from "../../helpers/backendAxios";

export const addToCart = (item) => {
  return {
    type: "ADD_TO_CART",
    payload: item,
  };
};

export const removeFromCart = (item) => {
  return {
    type: "REMOVE_FROM_CART",
    payload: item,
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

export const loadCart = (val) => {
  return async (dispatch) => {
    if (val) {
      dispatch({ type: "IS_USER_AUTHENTICATED", payload: true });
    }
    try {
      const res = await axios.get("/cart");
      dispatch({ type: "LOAD_CART", payload: res.data });
    } catch (error) {
      dispatch({ type: "IS_USER_AUTHENTICATED", payload: false });
    }
  };
};
