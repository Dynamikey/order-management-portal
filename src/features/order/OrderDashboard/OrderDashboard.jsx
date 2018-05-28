import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid } from "semantic-ui-react";
import OrderList from "../OrderList/OrderList";
import { deleteOrder } from "../orderActions";

const mapState = state => ({
  orders: state.orders
});

const actions = {
  deleteOrder,
};

class OrderDashboard extends Component {

  handleDeleteOrder = orderId => () => {
    this.props.deleteOrder(orderId);
  };

  render() {
    const { orders } = this.props;
    return (
      <Grid>
        <Grid.Column width={10}>
          <OrderList
            deleteOrder={this.handleDeleteOrder}
            orders={orders}
          />
        </Grid.Column>
        <Grid.Column width={6} />
      </Grid>
    );
  }
}

export default connect(mapState, actions)(OrderDashboard);
