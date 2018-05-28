import React from "react";
import { connect } from "react-redux";
import { Grid } from "semantic-ui-react";
import OrderDetailedHeader from "./OrderDetailedHeader";
import OrderDetailedInfo from "./OrderDetailedInfo";
import OrderDetailedChat from "./OrderDetailedChat";
import OrderDetailedSidebar from "./OrderDetailedSidebar";

const mapState = (state, ownProps) => {
  const orderId = ownProps.match.params.id;

  let order = {};

  if (orderId && state.orders.length > 0) {
    order = state.orders.filter(order => order.id === orderId)[0];
  }

  return {
    order
  };
};

const OrderDetailedPage = ({ order }) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <OrderDetailedHeader order={order} />
        <OrderDetailedInfo order={order} />
        <OrderDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <OrderDetailedSidebar participants={order.participants} />
      </Grid.Column>
    </Grid>
  );
};

export default connect(mapState)(OrderDetailedPage);
