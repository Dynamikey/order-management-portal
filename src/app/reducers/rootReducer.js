import { combineReducers } from "redux";
import testReducer from "../../features/testarea/testReducer";
import orderReducer from "../../features/order/orderReducer";

const rootReducer = combineReducers({
  test: testReducer,
  orders: orderReducer
});

export default rootReducer;
