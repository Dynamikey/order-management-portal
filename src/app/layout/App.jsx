import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import { Route, Switch } from "react-router-dom";
import OrderDashboard from "../../features/order/OrderDashboard/OrderDashboard";
import NavBar from "../../features/nav/NavBar/NavBar";
import OrderDetailedPage from "../../features/order/OrderDetailed/OrderDetailedPage";
import ParticipantDashboard from "../../features/participant/ParticipantDashboard/ParticipantDashboard";
import ParticipantDetailedPage from "../../features/participant/ParticipantDetailed/ParticipantDetailedPage";
import SettingsDashboard from "../../features/participant/Settings/SettingsDashboard";
import OrderForm from "../../features/order/OrderForm/OrderForm";
import HomePage from "../../features/home/HomePage";
import TestComponent from "../../features/testarea/TestComponent";
import ModalManager from '../../features/modals/ModalManager'

class App extends Component {
  render() {
    return (
      <div>
        <ModalManager/>
        <Switch>
          <Route exact path="/" component={HomePage} />
        </Switch>

        <Route
          path="/(.+)"
          render={() => (
            <div>
              <NavBar />
              <Container className="main">
                <Switch>
                  <Route path="/orders" component={OrderDashboard} />
                  <Route path="/test" component={TestComponent} />
                  <Route path="/order/:id" component={OrderDetailedPage} />
                  <Route path="/manage/:id" component={OrderForm} />
                  <Route
                    path="/participants"
                    component={ParticipantDashboard}
                  />
                  <Route
                    path="/profile/:id"
                    component={ParticipantDetailedPage}
                  />
                  <Route path="/settings" component={SettingsDashboard} />
                  <Route path="/createOrder" component={OrderForm} />
                </Switch>
              </Container>
            </div>
          )}
        />
      </div>
    );
  }
}

export default App;
