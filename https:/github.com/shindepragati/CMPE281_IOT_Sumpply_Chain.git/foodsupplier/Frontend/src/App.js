import React, { Component } from 'react'
import Main from './components/Main'
import Login from './components/Login'
import { BrowserRouter as Router, Route } from 'react-router-dom';


class App extends Component {

    
  render() {
    return (
      // <Container>
      <Router>
        <Route path='/login' component={Login} />
        <Route path='/home' component={Main} />
        <Route path="/all-cargo" component={Main}></Route>
        <Route path="/customer" component={Main}></Route>
        <Route path="/cargo" component={Main}></Route>
        <Route path="/add-cargo" component={Main}></Route>
        <Route path="/newcargo" component={Main}></Route>


      </Router>
      // </Container>

    )
  }
}
export default App