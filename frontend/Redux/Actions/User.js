import axios from "../../helpers/backendAxios";
import { loadCart } from "./Cart";

export const isUserLoggedIn = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("/profile");
      if (res.status == 200) {
        dispatch({ type: "IS_USER_AUTHENTICATED", payload: true });
        dispatch(loadCart());
      }
    } catch (error) {
      dispatch({ type: "IS_USER_AUTHENTICATED", payload: false });
    }
  };
};
