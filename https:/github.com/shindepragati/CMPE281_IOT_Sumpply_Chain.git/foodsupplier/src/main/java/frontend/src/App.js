import React, { Component } from 'react'
import Main from './components/Main'
import Login from './components/Login'
import ListCargoComponent from './components/ListCargoComponent';
import DashboardMap from './components/DashboardMap';

import CreateCargoComponent from './components/CreateCargoComponent';
// import UpdateCargoComponent from './UpdateCargoComponent';
// import TrackCargoLocationComponent from './DashboardMap';
import BrowseCargos from './components/BrowseCargos';
// import Login from "./components/Login";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container, Nav } from "./components/styled-components";


class App extends Component {
  render() {
    return (
      // <Container>
      <Router>
        <Route path='/login' component={Login} />
        <Route path='/home' component={Main} />
        <Route path="/all-cargo" component={Main}></Route>

        <Route path="/cargo" component={Main}></Route>
        <Route path='/dashboard/:id' render={(props) => <Main {...props} />} />
        <Route path="/browse-cargo" component={Main}></Route>
        <Route path="/add-cargo" component={Main}></Route>


      </Router>
      // </Container>

    )
  }
}
export default App