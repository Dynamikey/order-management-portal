import React, { Component } from "react";
import { Segment, Grid, Icon, Button } from "semantic-ui-react";
import OrderDetailedMap from "./OrderDetailedMap";

class OrderDetailedInfo extends Component {
  state = {
    showMap: false
  };

  showMapToggle = () => {
    this.setState(prevState => ({
      showMap: !prevState.showMap
    }));
  };

  render() {
    const { order } = this.props;
    return (
      <Segment.Group>
        <Segment attached="top">
          <Grid>
            <Grid.Column width={1}>
              <Icon size="large" color="teal" name="info" />
            </Grid.Column>
            <Grid.Column width={15}>
              <p>{order.description}</p>
            </Grid.Column>
          </Grid>
        </Segment>
        <Segment attached>
          <Grid verticalAlign="middle">
            <Grid.Column width={1}>
              <Icon name="calendar" size="large" color="teal" />
            </Grid.Column>
            <Grid.Column width={15}>
              <span>{order.date}</span>
            </Grid.Column>
          </Grid>
        </Segment>
        <Segment attached>
          <Grid verticalAlign="middle">
            <Grid.Column width={1}>
              <Icon name="marker" size="large" color="teal" />
            </Grid.Column>
            <Grid.Column width={11}>
              <span>{order.venue}</span>
            </Grid.Column>
            <Grid.Column width={4}>
              <Button
                onClick={this.showMapToggle}
                color="teal"
                size="tiny"
                content={this.state.showMap ? "Hide Map" : "Show Map"}
              />
            </Grid.Column>
          </Grid>
        </Segment>
        {this.state.showMap && (
          <OrderDetailedMap
            lat={order.venueLatLng.lat}
            lng={order.venueLatLng.lng}
          />
        )}
      </Segment.Group>
    );
  }
}

export default OrderDetailedInfo;
