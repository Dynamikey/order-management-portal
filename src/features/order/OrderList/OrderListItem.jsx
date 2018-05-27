import React, { Component } from "react";
import { Segment, Item, Icon, List, Button } from 'semantic-ui-react'
import OrderListParticipant from './OrderListParticipant'
class OrderListItem extends Component {
  render() {
    const {order} = this.props;
    return (
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image 
              size="tiny" 
              circular 
              src={order.hostPhotoURL} 
              />
              <Item.Content>
                <Item.Header as="a">{order.title}</Item.Header>
                <Item.Description>
                  Hosted by <a>{order.hostedBy}</a>
                </Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment>
          <span>
            <Icon name="clock" /> {order.date} |
            <Icon name="marker" /> {order.venue}
          </span>
        </Segment>
        <Segment secondary>
          <List horizontal>
          {order.participants.map((participant) => (
            <OrderListParticipant key={participant.id} participant={participant}/>
          ))}
          </List>
        </Segment>
        <Segment clearing>
        <span>{order.description}</span>
          <Button as="a" color="teal" floated="right" content="View" />
        </Segment>
      </Segment.Group>
    );
  }
}
export default OrderListItem;
