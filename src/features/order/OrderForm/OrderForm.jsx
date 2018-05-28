/*global google*/
import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import moment from "moment";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import Script from "react-load-script";
import {
  composeValidators,
  combineValidators,
  isRequired,
  hasLengthGreaterThan
} from "revalidate";
import cuid from "cuid";
import { Segment, Form, Button, Grid, Header } from "semantic-ui-react";
import { createOrder, updateOrder } from "../orderActions";
import TextInput from "../../../app/common/form/TextInput";
import TextArea from "../../../app/common/form/TextArea";
import SelectInput from "../../../app/common/form/SelectInput";
import DateInput from "../../../app/common/form/DateInput";
import PlaceInput from "../../../app/common/form/PlaceInput";

const mapState = (state, ownProps) => {
  const orderId = ownProps.match.params.id;

  let order = {};

  if (orderId && state.orders.length > 0) {
    order = state.orders.filter(order => order.id === orderId)[0];
  }

  return {
    initialValues: order
  };
};

const actions = {
  createOrder,
  updateOrder
};

const category = [
  { key: "drinks", text: "Drinks", value: "drinks" },
  { key: "culture", text: "Culture", value: "culture" },
  { key: "film", text: "Film", value: "film" },
  { key: "food", text: "Food", value: "food" },
  { key: "music", text: "Music", value: "music" },
  { key: "travel", text: "Travel", value: "travel" }
];

const validate = combineValidators({
  title: isRequired({ message: "The order number is required" }),
  category: isRequired({ message: "Please provide a category" }),
  description: composeValidators(
    isRequired({ message: "Please enter a description" }),
    hasLengthGreaterThan(4)({
      message: "Description needs to be at least 5 characters"
    })
  )(),
  city: isRequired("city"),
  venue: isRequired("venue"),
  date: isRequired("date")
});

class OrderForm extends Component {
  state = {
    cityLatLng: {},
    venueLatLng: {},
    scriptLoaded: false
  };

  handleScriptLoaded = () => this.setState({ scriptLoaded: true });

  handleCitySelect = selectedCity => {
    geocodeByAddress(selectedCity)
      .then(results => getLatLng(results[0]))
      .then(latlng => {
        this.setState({
          cityLatLng: latlng
        });
      })
      .then(() => {
        this.props.change("city", selectedCity);
      });
  };

  handleVenueSelect = selectedVenue => {
    geocodeByAddress(selectedVenue)
      .then(results => getLatLng(results[0]))
      .then(latlng => {
        this.setState({
          venueLatLng: latlng
        });
      })
      .then(() => {
        this.props.change("venue", selectedVenue);
      });
  };

  onFormSubmit = values => {
    values.date = moment(values.date).format();
    values.venueLatLng = this.state.venueLatLng;
    if (this.props.initialValues.id) {
      this.props.updateOrder(values);
      this.props.history.goBack();
    } else {
      const newOrder = {
        ...values,
        id: cuid(),
        hostPhotoURL: "/assets/user.png",
        hostedBy: "Bob"
      };
      this.props.createOrder(newOrder);
      this.props.history.push("/orders");
    }
  };

  render() {
    const { invalid, submitting, pristine } = this.props;
    return (
      <Grid>
        <Script
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyDcqISUnC2MAMBG5J-ac4TXLwa1v9WvSr0&libraries=places"
          onLoad={this.handleScriptLoaded}
        />
        <Grid.Column width={10}>
          <Segment>
            <Header sub color="teal" content="Order Details" />
            <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
              <Field
                name="title"
                type="text"
                component={TextInput}
                placeholder="Give your order a number"
              />
              <Field
                name="category"
                type="text"
                component={SelectInput}
                options={category}
                placeholder="What is your order about"
              />
              <Field
                name="description"
                type="text"
                rows={3}
                component={TextArea}
                placeholder="Tell us about your order"
              />
              <Header sub color="teal" content="Delivery Location Details" />
              <Field
                name="city"
                type="text"
                component={PlaceInput}
                options={{ types: ["(cities)"] }}
                placeholder="Delivery city"
                onSelect={this.handleCitySelect}
              />
              {this.state.scriptLoaded && (
                <Field
                  name="venue"
                  type="text"
                  options={{
                    location: new google.maps.LatLng(this.state.cityLatLng),
                    radius: 1000,
                    types: ["establishment"]
                  }}
                  component={PlaceInput}
                  placeholder="Delivery address"
                  onSelect={this.handleVenueSelect}
                />
              )}
              <Field
                name="date"
                type="text"
                component={DateInput}
                dateFormat="YYYY-MM-DD HH:mm"
                timeFormat="HH:mm"
                showTimeSelect
                placeholder="Delivery date and time"
              />

              <Button
                disabled={invalid || submitting || pristine}
                positive
                type="submit"
              >
                Submit
              </Button>
              <Button onClick={this.props.history.goBack} type="button">
                Cancel
              </Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}
export default connect(mapState, actions)(
  reduxForm({ form: "orderForm", enableReinitialize: true, validate })(
    OrderForm
  )
);
