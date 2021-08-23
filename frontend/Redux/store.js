import { createStore, applyMiddleware, combineReducers } from "redux";
import user from "./reducers/userReducer";
import cart from "./reducers/cartReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  cart,
  user,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
