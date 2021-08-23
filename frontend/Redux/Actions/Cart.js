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
