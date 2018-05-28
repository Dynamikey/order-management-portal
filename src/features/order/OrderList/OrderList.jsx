import React, { Component } from "react";
import OrderListItem from "./OrderListItem";

class OrderList extends Component {
  render() {
    const { orders, deleteOrder } = this.props;
    return (
      <div>
        {orders.map(order => (
          <OrderListItem
            key={order.id}
            order={order}
            deleteOrder={deleteOrder}
          />
        ))}
      </div>
    );
  }
}

export default OrderList;
