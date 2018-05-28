import { combineReducers } from "redux";
import { reducer as FormReducer } from 'redux-form'
import testReducer from "../../features/testarea/testReducer";
import orderReducer from "../../features/order/orderReducer";

const rootReducer = combineReducers({
  form: FormReducer,
  test: testReducer,
  orders: orderReducer
});

export default rootReducer;
