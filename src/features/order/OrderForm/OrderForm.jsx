import React, { Component } from "react";
import { connect } from "react-redux";
import cuid from "cuid";
import { Segment, Form, Button } from "semantic-ui-react";
import { createOrder, updateOrder } from "../orderActions";

const mapState = (state, ownProps) => {
  const orderId = ownProps.match.params.id;

  let order = {
    title: "",
    date: "",
    city: "",
    venue: "",
    hostedBy: ""
  };

  if (orderId && state.orders.length > 0) {
    order = state.orders.filter(order => order.id === orderId)[0];
  }

  return {
    order
  };
};

const actions = {
  createOrder,
  updateOrder
};

class OrderForm extends Component {
  state = {
    order: Object.assign({}, this.props.order)
  };

  onFormSubmit = evt => {
    evt.preventDefault();
    if (this.state.order.id) {
      this.props.updateOrder(this.state.order);
      this.props.history.goBack();
    } else {
      const newOrder = {
        ...this.state.order,
        id: cuid(),
        hostPhotoURL: "/assets/user.png"
      };
      this.props.createOrder(newOrder);
      this.props.history.push("/orders");
    }
  };

  onInputChange = evt => {
    const newOrder = this.state.order;
    newOrder[evt.target.name] = evt.target.value;
    this.setState({
      order: newOrder
    });
  };

  render() {
    const { order } = this.state;
    return (
      <div>
        <Segment>
          <Form onSubmit={this.onFormSubmit}>
            <Form.Field>
              <label>Order Title</label>
              <input
                name="title"
                onChange={this.onInputChange}
                value={order.title}
                placeholder="Order Title"
              />
            </Form.Field>
            <Form.Field>
              <label>Event Date</label>
              <input
                name="date"
                onChange={this.onInputChange}
                value={order.date}
                type="date"
                placeholder="Event Date"
              />
            </Form.Field>
            <Form.Field>
              <label>City</label>
              <input
                name="city"
                onChange={this.onInputChange}
                value={order.city}
                placeholder="City event is taking place"
              />
            </Form.Field>
            <Form.Field>
              <label>Venue</label>
              <input
                name="venue"
                onChange={this.onInputChange}
                value={order.venue}
                placeholder="Enter the Venue of the event"
              />
            </Form.Field>
            <Form.Field>
              <label>Hosted By</label>
              <input
                name="hostedBy"
                onChange={this.onInputChange}
                value={order.hostedBy}
                placeholder="Enter the name of person hosting"
              />
            </Form.Field>
            <Button positive type="submit">
              Submit
            </Button>
            <Button onClick={this.props.history.goBack} type="button">
              Cancel
            </Button>
          </Form>
        </Segment>
      </div>
    );
  }
}
export default connect(mapState, actions)(OrderForm);
