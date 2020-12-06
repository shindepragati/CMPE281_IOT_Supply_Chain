import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import face3 from "../assets/images/container1.jpg"
import face4 from "../assets/images/container2.jpg"
import { Container, Nav } from "./styled-components";

class BrowseCargos extends Component {

  addCargo(id) {

    this.props.history.push(`/add-cargo/${id}`);
  }
  render() {
    return (
      <Container>
        {/* content area start */}
        <Container className="container-fluid pr-5 pl-5 pt-5 pb-5">
          {/* row 1 - revenue */}
          <Container className="row">
            <Container className="col-lg-4 col-sm-6 is-light-text mb-4">
              <Container className="card Container-card is-card-dark">
                <Container className="card-heading">
                  <Container className="is-dark-text-light letter-spacing text-small">
                    CROWLEY Cargo Container
                  </Container>
                </Container>

                <Container className="card-value pt-4 text-small">
                  <img src={face3} alt="..." />

                  <br></br>
                  <br></br>
                  <br></br>

                  <span className="text-medium pr-1"> CROWLEY - 40' Dry High Cube Container</span>
                  <br></br>
                  <br></br>
                  <span className="text-small pr-1">

                    <li>{"Inside Measurement: L- 39′ 6″, W – 7′ 9″, H – 8’10"}</li>
                    <li>{"Door Opening: W – 7′ 8″, H – 7′ 5″"}</li>
                    <li>{"Cubic Capacity: 2,696"}</li>
                    <li>{"Maximum Legal Cargo Weight: 45,000"}</li>
                    <li>{"Maximum Tri-Axle Weight: 58,290"}</li>
                    <li>{"Tare Weight: 8,910"}</li>
                  </span>
                </Container>
                {/* <Link className="nav-link" to='/add-cargo/CROWLEY - 40 Dry High Cube Container'>
                  <span >Select Container</span>
                </Link> */}
              </Container>

            </Container>
            <Container className="col-lg-4 col-sm-6 is-light-text mb-4">

              <Container className="card Container-card is-card-dark">
                <Container className="card-heading">
                  <Container className="is-dark-text-light letter-spacing text-small">
                    CROWLEY Cargo Container
                  </Container>
                </Container>

                <Container className="card-value pt-4 text-small">
                  <img src={face4} alt="..." />

                  <br></br>
                  <br></br>
                  <br></br>

                  <span className="text-medium pr-1"> CROWLEY - 20' Enclosed Container</span>
                  <br></br>
                  <br></br>
                  <span className="text-small pr-1">

                    <li>{"Inside Measurement: L- 39′ 6″, W – 7′ 9″, H – 8’10"}</li>
                    <li>{"Inside Measurement: L- 43′, W – 8′, H – 8′ 4″"}</li>
                    <li>{"Door Opening: W – 8′, H – 8′ 4″"}</li>
                    <li>{"Cubic Capacity: 2,878"}</li>
                    <li>{"Maximum Legal Cargo Weight: 36,280"}</li>
                    <li>{"Maximum Tri-Axle Weight: 55,000"}</li>
                    <li>{"Tare Weight: 13,170"}</li>
                  </span>
                </Container>
                {/* <Link className="nav-link" to='/add-cargo/CROWLEY - 20 Enclosed Container'>
                  <span >Select Container</span>
                </Link> */}
              </Container>

            </Container>
            <Container className="col-lg-4 col-sm-6 is-light-text mb-4">

              <Container className="card Container-card is-card-dark">
                <Container className="card-heading">
                  <Container className="is-dark-text-light letter-spacing text-small">
                    XPOLogistic Cargo Container
                  </Container>
                </Container>

                <Container className="card-value pt-4 text-small">
                  <img src={face3} alt="..." />

                  <br></br>
                  <br></br>
                  <br></br>

                  <span className="text-medium pr-1"> XPOLogistic - 20' Enclosed Container Cargo</span>
                  <br></br>
                  <br></br>
                  <span className="text-small pr-1">
                    <li>{"Inside Measurement:L- 19′ 4″, W – 7′ 8″, H – 7′ 10″"}</li>
                    <li>{"Door Opening: W – 7′ 8″, H – 7′ 5″"}</li>
                    <li>{"Cubic Capacity: 1,170"}</li>
                    <li>{"Maximum Legal Cargo Weight: 40,000"}</li>
                    <li>{"Maximum Tri-Axle Weight: 62,280"}</li>
                    <li>{"Tare Weight: 4,920"}</li>
                  </span>
                </Container>
                {/* <Link className="nav-link" to='/add-cargo/XPOLogistic - 20 Enclosed Container Cargo'>
                  <span >Select Container</span>
                </Link> */}
              </Container>


            </Container>
          </Container>
        </Container>
      </Container>


    )
  }
}

export default BrowseCargos