import React, { Component } from 'react'
import CargoServices from '../services/CargoServices'
import { Container, Nav } from "./styled-components";

class ListAllCargoComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            cargos: []
        }
        // this.trackCargo = this.trackCargo.bind(this);
        // this.addCargo = this.addCargo.bind(this);
    }

    // trackCargo(id) {
    //     console.log("cargois in list" + id)
    //     this.props.history.push(`/dashboard/${id}`);
    // }

    // addCargo() {
    //     this.props.history.push('/add-cargo/_add');
    // }


    componentDidMount() {
        CargoServices.getCargos().then((res) => {
            this.setState({ cargos: res.data });
            console.log("**" + this.state.cargos)
        });
    }

    deleteCargo(id) {
        CargoServices.deleteCargo(id).then(res => {
            this.setState({ cargos: this.state.cargos.filter(cargo => cargo.cargoid !== id) });
        });
    }

    render() {

        console.log(this.state.cargos)
        return (
            <Container>
                <Container className="container-fluid pr-5 pl-5 pt-5 pb-5">
                    {/* row 1 - revenue */}
                    <Container className="row">

                        <Container className="col-lg-14 col-sm-18 is-light-text mb-4">
                            <Container className="card Container-card is-card-dark">
                                <Container className="card-heading">
                                    <Container className="is-dark-text-light letter-spacing text-medium">
                                       Cargo Details
                  </Container>
                                </Container>

                                <Container className="card-value pt-4 text-small">
                                    
                                    <table className="table is-light-text mb-4 " style={{color:" SeaShell"}}>

                                        <thead>
                                            <tr>
                                                <th >  Cargo ID</th>
                                                <th> Cargo Reg ID</th>
                                                <th> Cargo Container Type</th>
                                                <th> Cargo Comapny</th>
                                                <th> Cargo From Route</th>
                                                <th> Cargo To Route</th>
                                                <th>Temperature</th>

                                                <th>Humidity</th>
                                                <th>Light</th>
                                                <th>Weight</th>
                                                <th>Latitude</th>
                                                <th>Longitude</th>

                                                {/* <th>Customer Address</th> */}
                                                <th>                              </th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {

                                                this.state.cargos.map(
                                                    cargos =>

                                                        <tr key={cargos.cargoid}>
                                                            <td> {cargos.cargoid} </td>

                                                            <td> {cargos.cargo_reg_id} </td>
                                                            <td> {cargos.cargo_type} </td>
                                                            <td> {cargos.cargo_comapny} </td>
                                                            <td> {cargos.cargo_from_route} </td>
                                                            <td> {cargos.cargo_to_route}</td>

                                                            <td> {cargos.temperature} : {cargos.status_temperature} </td>
                                                            <td> {cargos.humidity}: {cargos.status_humidity}</td>
                                                            <td> {cargos.light} : {cargos.status_light}</td>
                                                            <td> {cargos.weight} : {cargos.status_weight}</td>
                                                            <td> {cargos.latitude} </td>
                                                            <td> {cargos.longitude}</td>



                                                            {/* <td style={{ display: "flex" }}>
                                                                <button style={{ marginLeft: "auto" }} onClick={() => this.trackCargo(cargos.cargoid)} className="btn btn-danger">Track</button>
                                                                <button style={{ marginLeft: "auto" }} onClick={() => this.deleteCargo(cargos.cargoid)} className="btn btn-danger">Delete</button>


                                                            </td> */}
                                                        </tr>
                                                )
                                            }
                                        </tbody>
                                    </table>

                                </Container>
                            </Container>
                        </Container>
                    </Container>
                </Container>
            </Container>


        )
    }
}

export default ListAllCargoComponent
