import React, { Component } from 'react'

// import Login from "./components/Login";
import { Container, Nav } from "./styled-components";
// import {Image} from 'react-native';

import Background from "../assets/images/truck1.jpg";


class Login extends Component {

	constructor(props) {
		super(props);
		this.state = {
			inputValue: '',
			inputValue1: ''
		};
	}
	updateInputValue(evt) {
		this.setState({
			inputValue: evt.target.value
		});
	}

	updateInputValue1(evt) {
		this.setState({
			inputValue1: evt.target.value
		});
	}

	login() {
		let id=this.state.inputValue
		this.props.history.push('/home');
	}



	render() {
		return (
			<Container>
				{/* <Nav className="navbar navbar-expand-lg fixed-top is-white is-dark-text">
					<Container className="navbar-brand h1 mb-0 text-large font-medium">
						       Smart Supply Chain
          </Container>
        </Nav> */}
			<Container className="container-fluid pr-5 pl-5 pt-5 pb-5" style={{ backgroundImage: "url(" + Background + ")", minHeight: "620px" }}>
						{/* <Image
        source={require('./assets/images/truck1.jpg')}>
      */} <Container>
							{/* content area start */}
							{/* row 1 - revenue */}
							<Container className="row">
								<Container className="col-lg-3 col-sm-3 is-light-text mb-4">
									<Container className="card grid-card is-card-dark">
										<Container className="card-heading">
											<Container className="is-dark-text-light letter-spacing text-small">
												Login
                  </Container>
										</Container>

										<Container className="card-value pt-4 text-small">
											<span className="text-small pr-1">UserID</span>
											<input type="text" className="form-control"
												value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)} />

										</Container>

										<Container className="card-value pt-4 text-small">
											<span className="text-small pr-1">Password</span>
											<input type="password" className="form-control"
												value={this.state.inputValue1} onChange={evt => this.updateInputValue1(evt)} />

										</Container>
										<Container className="card-value pt-4 text-small">




											<button className="btn btn-success" onClick={this.login.bind(this)} name="login">Login</button>


										</Container>
									</Container>
								</Container>
							</Container>
						</Container>
					</Container>
</Container>



		);
	}
}

export default Login