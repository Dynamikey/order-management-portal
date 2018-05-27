import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import OrderDashboard from "../../features/order/OrderDashboard/OrderDashboard";
import NavBar from "../../features/nav/NavBar/NavBar";

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Container className="main">
          <OrderDashboard />
        </Container>
      </div>
    );
  }
}

export default App;
