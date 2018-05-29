import { combineReducers } from "redux";
import { reducer as FormReducer } from "redux-form";
import testReducer from "../../features/testarea/testReducer";
import orderReducer from "../../features/order/orderReducer";
import modalsReducer from "../../features/modals/modalReducer";
import authReducer from "../../features/auth/authReducer";

const rootReducer = combineReducers({
  form: FormReducer,
  test: testReducer,
  orders: orderReducer,
  modals: modalsReducer,
  auth: authReducer
});

export default rootReducer;
