import React, { Component } from "react";
import { Segment, Form, Button } from "semantic-ui-react";

class OrderForm extends Component {
  state = {
    order: {
        title: '',
        date: '',
        city: '',
        venue: '',
        hostedBy: '',
    }
  }
  onFormSubmit = (evt) => {
    evt.preventDefault();
    this.props.createOrder(this.state.order);
  }


  onInputChange = (evt) => {
    const newOrder = this.state.order;
    newOrder[evt.target.name] = evt.target.value;
    this.setState({
         order: newOrder
    })
  }

  render() {
    const {handleCancel} = this.props;
    const {order} = this.state
    return (
      <div>
        <Segment>
          <Form onSubmit={this.onFormSubmit}>
            <Form.Field>
              <label>Order Title</label>
              <input name='title' onChange={this.onInputChange} value={order.title} placeholder="Order Title" />
            </Form.Field>
            <Form.Field>
              <label>Event Date</label>
              <input name='date' onChange={this.onInputChange} value={order.date} type="date" placeholder="Event Date" />
            </Form.Field>
            <Form.Field>
              <label>City</label>
              <input name='city' onChange={this.onInputChange} value={order.city} placeholder="City event is taking place" />
            </Form.Field>
            <Form.Field>
              <label>Venue</label>
              <input name='venue' onChange={this.onInputChange} value={order.venue} placeholder="Enter the Venue of the event" />
            </Form.Field>
            <Form.Field>
              <label>Hosted By</label>
              <input name='hostedBy' onChange={this.onInputChange} value={order.hostedBy} placeholder="Enter the name of person hosting" />
            </Form.Field>
            <Button positive type="submit">
              Submit
            </Button>
            <Button onClick={handleCancel} type="button">Cancel</Button>
          </Form>
        </Segment>
      </div>
    );
  }
}
export default OrderForm;
