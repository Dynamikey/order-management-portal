import React, { Component } from 'react'
import { List, Image } from 'semantic-ui-react'
class OrderListParticipant extends Component {
  render() {
    const {participant} = this.props;
    return (
      <List.Item>
        <Image as='a' size='mini' circular src={participant.photoURL}/>
      </List.Item>
    )
  }
}
export default OrderListParticipant