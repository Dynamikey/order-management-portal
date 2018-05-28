import { CREATE_ORDER, DELETE_ORDER, UPDATE_ORDER } from "./orderConstants";

export const createOrder = (order) => {
  return {
    type: CREATE_ORDER,
    payload: {
      order
    }
  }
}

export const updateOrder = (order) => {
  return {
    type: UPDATE_ORDER,
    payload: {
      order
    }
  }
}

export const deleteOrder = (orderId) => {
  return {
    type: DELETE_ORDER,
    payload: {
      orderId
    }
  }
}
