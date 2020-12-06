import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Container, Nav } from "./styled-components";
import { NavLink, Link } from 'react-router-dom'
// import UserProfile from './UserProfile'
import ListCargoComponent from './ListCargoComponent';
import DashboardMap from './DashboardMap';

import CreateCargoComponent from './CreateCargoComponent';
// import UpdateCargoComponent from './UpdateCargoComponent';
// import TrackCargoLocationComponent from './DashboardMap';
import BrowseCargos from './BrowseCargos';
// import listtable from './Listtable';
import UserImg from "../assets/images/user-img-placeholder.jpeg";
import Login from './Login';
import ListAllCargoComponent from './ListAllCargoComponent';

class Main extends Component {
  render() {
    return (
      <Container>
        <Nav className="navbar navbar-expand-lg fixed-top is-white is-dark-text">
          {/* <Container className="navbar-brand h1 mb-0 text-large font-medium">
            Smart Supply Chain
          </Container> */}
          <Container className="navbar-nav ml-auto">
            <Container className="user-detail-section">
              <span className="pr-2">Hi, Pragati</span>
              <span className="img-container">
                {/* <img src={UserImg} className="rounded-circle" alt="user" /> */}
              </span>
            </Container>
          </Container>
        </Nav>

        <Nav className="navbar fixed-top nav-secondary is-dark is-light-text">
          <Container className="text-medium">
            <Container className="row">
              <Link className="nav-link" to='/cargo'>
                Track Shipement
            </Link>
              <Link className="nav-link" to='/add-cargo'>
                Create Shippement
            </Link>

              <Link className="nav-link" to='/browse-cargo'>
                Cargo Container
            </Link>

              <Link className="nav-link" to='/all-cargo'>
                All Cargos
            </Link>
            </Container>
          </Container>
        </Nav >


        <Switch>
          {/* <Route path="/login" component={Login}></Route> */}
          <Route path="/home" component={ListCargoComponent}></Route>
          <Route path="/all-cargo" component={ListAllCargoComponent}></Route>
          <Route path="/cargo" component={ListCargoComponent}></Route>
          <Route path='/dashboard/:id' render={(props) => <DashboardMap {...props} />} />
          <Route path="/browse-cargo" component={BrowseCargos}></Route>
          <Route path="/add-cargo/" component={CreateCargoComponent}></Route>

          {/* <Route path="/dashboard" component={Dashboard} />
          <Route path="/profile" component={UserProfile} />
          <Route path="/add-cargo" component={CreateCargoComponent}></Route>
          <Route path="/track-cargo/:id" component={TrackCargoLocationComponent}></Route>
          <Route path="/list-cargo/:id" component={ListCargoComponent}></Route>
          <Route path="/edit-cargo/:id" component={UpdateCargoComponent}></Route>
           */}
          {/* <Route path="/browse-cargo" component={listtable}></Route> */}

          {/* <Redirect from='*' to='/cargo' /> */}

        </Switch>
      </Container >

    );
  }
}

export default Main
