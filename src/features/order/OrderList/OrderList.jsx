import React, { Component } from 'react'
import OrderListItem from './OrderListItem'
class OrderList extends Component {
  render() {
    const {orders} = this.props;
    return (
      <div>
        <h1>Order List</h1>
        {orders.map((order)=> (
          <OrderListItem key={order.id} order={order}/>
        ))}
      </div>
    )
  }
}

export default OrderList