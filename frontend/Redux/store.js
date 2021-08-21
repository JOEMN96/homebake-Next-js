import { createStore, applyMiddleware, combineReducers } from "redux";
import user from "./reducers/userReducer";
import cart from "./reducers/cartReducer";
import thunk from "redux-thunk";

let initaialState = {
  cart: null,
  user: null,
};

// const rootReducer = combineReducers((state = {}, action) => {
//   return state;
// });

const store = createStore(user, initaialState, applyMiddleware(thunk));

export default store;
