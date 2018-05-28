import React, { Component } from "react";
import { Grid, Button } from "semantic-ui-react";
import cuid from "cuid";
import OrderList from "../OrderList/OrderList";
import OrderForm from "../OrderForm/OrderForm";

const orders = [
  {
    id: "1",
    title: "Trip to Tower of London",
    date: "2018-03-27",
    category: "culture",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.",
    city: "London, UK",
    venue: "Tower of London, St Katharine's & Wapping, London",
    hostedBy: "Bob",
    hostPhotoURL: "https://randomuser.me/api/portraits/men/20.jpg",
    participants: [
      {
        id: "a",
        name: "Bob",
        photoURL: "https://randomuser.me/api/portraits/men/20.jpg"
      },
      {
        id: "b",
        name: "Tom",
        photoURL: "https://randomuser.me/api/portraits/men/22.jpg"
      }
    ]
  },
  {
    id: "2",
    title: "Trip to Punch and Judy Pub",
    date: "2018-03-28",
    category: "drinks",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.",
    city: "London, UK",
    venue: "Punch & Judy, Henrietta Street, London, UK",
    hostedBy: "Tom",
    hostPhotoURL: "https://randomuser.me/api/portraits/men/22.jpg",
    participants: [
      {
        id: "b",
        name: "Tom",
        photoURL: "https://randomuser.me/api/portraits/men/22.jpg"
      },
      {
        id: "a",
        name: "Bob",
        photoURL: "https://randomuser.me/api/portraits/men/20.jpg"
      }
    ]
  }
];

class OrderDashboard extends Component {
  state = {
    orders: orders,
    isOpen: false,
    selectedOrder: null
  };

  handleFormOpen = () => {
    this.setState({
      selectedOrder: null,
      isOpen: true
    });
  };

  handleCancel = () => {
    this.setState({
      isOpen: false
    });
  };

  handleUpdateOrder = (updatedOrder) => {
    this.setState({
      orders: this.state.orders.map(order => {
        if (order.id === updatedOrder.id) {
          return Object.assign({}, updatedOrder);
        } else {
          return order
        }
      }),
      isOpen: false,
      selectedOrder: null
    })
  }

  handleOpenOrder = (orderToOpen) => () => {
    this.setState({
      selectedOrder: orderToOpen,
      isOpen: true
    })
  }

  handleCreateOrder = newOrder => {
    newOrder.id = cuid();
    newOrder.hostPhotoURL = "/assets/user.png";
    const updatedOrders = [...this.state.orders, newOrder];
    this.setState({
      orders: updatedOrders,
      isOpen: false
    });
  };

  handleDeleteOrder = (orderID) => () => {
    const updatedOrders = this.state.orders.filter(order => order.id !== orderID);
      this.setState({
        orders: updatedOrders
      })
  }

  render() {
    const {selectedOrder} = this.state;
    return (
      <Grid>
        <Grid.Column width={10}>
          <OrderList deleteOrder={this.handleDeleteOrder} onOrderOpen={this.handleOpenOrder} orders={this.state.orders} />
        </Grid.Column>
        <Grid.Column width={6}>
          <Button
            onClick={this.handleFormOpen}
            positive
            content="Create Order"
          />
          {this.state.isOpen && (
            <OrderForm updateOrder={this.handleUpdateOrder} 
              selectedOrder={selectedOrder}
              createOrder={this.handleCreateOrder}
              handleCancel={this.handleCancel}
            />
          )}
        </Grid.Column>
      </Grid>
    );
  }
}

export default OrderDashboard;
