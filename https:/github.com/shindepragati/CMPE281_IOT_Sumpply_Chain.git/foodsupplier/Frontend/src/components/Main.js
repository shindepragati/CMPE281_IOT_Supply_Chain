import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Container, Nav } from "./styled-components";
import { NavLink, Link } from 'react-router-dom'
import ListCargoComponent from './ListCargoComponent';

import CreateCargoComponent from './CreateCargoComponent';
import UserImg from "../assets/images/user-img-placeholder.jpeg";
import Login from './Login';
import { Tabs, Tab } from "react-bootstrap";
import CustomerShipement from './CustomerShipement';
import CustomerAnalysis from './CustomerAnalysis';
import SensorDashboard from './SensorDashboard';
import IOTSuppoertCreateCargo from './IOTSuppoertCreateCargo'
import IOTSupportListAllCargos from './IOTSupportListAllCargos'

class Main extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedPlanet: ""
    }
  }

  render() {
    return (
      <Container>

        <Nav className="navbar fixed-top nav-primary is-dark is-light-text">
          <Container className="text-medium">
            <Container className="row">
              <label className="nav-link">
                Smart Supply Chain
            </label>
              <NavLink className="nav-link" activeClassName="active" activeStyle={{ color: "white" }} to='/cargo'>
                Dashboard
            </NavLink>
              <NavLink className="nav-link" activeClassName="active" activeStyle={{ color: "white" }} to='/customer'>
                Customer Shippement
            </NavLink>
              <NavLink className="nav-link" activeClassName="active" activeStyle={{ color: "white" }} to='/sensors'>
                Cargo Sensors
            </NavLink>

              <NavLink className="nav-link" activeClassName="active" activeStyle={{ color: "white" }} to='/browse-cargo'>
                Cargo Container
            </NavLink>

              <NavLink className="nav-link" activeClassName="active" activeStyle={{ color: "white" }} to='/all-cargo'>
                Cargos
            </NavLink>
              <NavLink className="nav-link" activeClassName="active" activeStyle={{ color: "white" }} to='/newcargo'>
                Add New Cargo
            </NavLink>

            </Container>
          </Container>
        </Nav >




        <Container className="container-fluid pr-5 pl-5 pt-5 pb-5 float center">

          {/* <Tabs defaultActiveKey="planet" id="uncontrolled-tab-example">
          <Tab eventKey="Vehicle" title="Vehicle">
            <ListCargoComponent updatePlanets={e => this.setState({selectedPlanet:[...e]})} />
          </Tab>
          <Tab eventKey="Driver" title="Driver">
            <BrowseCargos selp={this.state.selectedPlanet} />
          </Tab>
        </Tabs> */}
          <Switch>
            <Route path="/home" component={CustomerAnalysis}></Route>
            <Route path="/cargo" component={CustomerAnalysis}></Route>
           <Route path="/customer/" component={CustomerShipement}></Route>
            <Route path="/sensors/" component={SensorDashboard}></Route>
          
          {/* IOT Support */}
          <Route path="/newcargo" component={IOTSuppoertCreateCargo}></Route>
            <Route path="/all-cargo" component={IOTSupportListAllCargos}></Route>
           

          </Switch>
        </Container >
      </Container >
    );
  }
}

export default Main
