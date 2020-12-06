
import React, { Component, useState } from 'react'
import CargoServices from '../services/CargoServices';
import Calendar from 'react-calendar'
import { Container, Nav } from "./styled-components";

import 'react-calendar/dist/Calendar.css';

class IOTSuppoertCreateCargo extends Component {

    constructor(props) {
        super(props)

        this.state = {
            cargoid: "",
            cargo_reg_id: "",
            cargo_type: "",
            cargo_comapny: "",
            cargo_from_route: "",
            cargo_to_route: "",
            shipement_status: "",
            sensorlist: {},
            driver_name: "",
            license_no: "",
            driver_address: "",
            driver_rating: "",
            driver_phonenumber: ""


        }

    }


    componentDidMount() {

    }


    saveOrUpdateCargo(event) {

        let cargo = {
            cargoid: this.state.cargoid,
            timestamp: new Date(),
            cargo_type: this.state.cargo_type,
             cargo_reg_id: this.state.cargo_reg_id,
            cargo_from_route: this.state.shipement_from_route,
            cargo_to_route: this.state.shipement_to_route,
            cargo_status: "Idle",
            sensorlist: {},
            driver_name: this.state.driver_name,
            license_no: this.state.license_no,
            driver_address: this.state.driver_address,
            driver_rating: this.state.driver_rating,
            driver_phonenumber: this.state.driver_phonenumber,
            cargo_comapny: this.state.cargo_comapny


        }




        console.log('cargo => ' + JSON.stringify(cargo));


        CargoServices.createCargos(cargo).then(res => {
            // this.props.history.push('/cargo');
        });
    }



    onChange = (dateval) => {
        this.setState({ order_completion_date: dateval });
        console.log((dateval));
    }


    cancel() {
        this.props.history.push('/cargo');
    }

    getTitle() {
        return <h3 className="text-center">Add New Cargo</h3>

    }

    render() {


        return (

            <Container>

                <Container className="col-md-7 mb-4">

                    <Container className="card grid-card flaot center">

                        <span className="text-small pr-1">CargoID</span>
                        <input type="text" name="cargoid" className="form-control"
                            value={this.state.cargoid} onChange={(event) => this.setState({ cargoid: event.target.value })} />
                        {console.log(this.state.cargoid)}
                        <br></br>
                        <span className="text-small pr-1">Cargo Company</span>
                        <input type="text" name="cargo_comapny" className="form-control"
                            value={this.state.cargo_comapny} onChange={(event) => this.setState({ cargo_comapny: event.target.value })} />

                        <br></br>
                        <span className="text-small pr-1">Cargo Container Type</span>
                        <input type="text" name="cargo_type" className="form-control"
                            value={this.state.cargo_type} onChange={(event) => this.setState({ cargo_type: event.target.value })} />

                        <br></br>    <span className="text-small pr-1">Cargo From Route</span>
                        <input type="text" name="cargo_from_route" className="form-control"
                            value={this.state.cargo_from_route} onChange={(event) => this.setState({ cargo_from_route: event.target.value })} />

                        <br></br>
                        <span className="text-small pr-1">Cargo To Route</span>
                        <input type="text" name="cargo_from_route" className="form-control"
                            value={this.state.cargo_to_route} onChange={(event) => this.setState({ cargo_to_route: event.target.value })} />

                        <br></br>
                        <br></br>

                        <br></br>
                        <span className="text-small pr-1">Select Sensors</span>

                        <br></br>
                        <span className="text-small pr-1">Driver Name</span>
                        <input type="text" name="driver_name" className="form-control"
                            value={this.state.driver_name} onChange={(event) => this.setState({ driver_name: event.target.value })} />

                        <br></br>
                        <span className="text-small pr-1">Driver PhoneNo</span>
                        <input type="text" name="driver_phonenumber" className="form-control"
                            value={this.state.driver_phonenumber} onChange={(event) => this.setState({ driver_phonenumber: event.target.value })} />

                        <br></br>
                        <span className="text-small pr-1">license_no</span>
                        <input type="text" name="license_no" className="form-control"
                            value={this.state.license_no} onChange={(event) => this.setState({ license_no: event.target.value })} />


                        <br></br>
                        <span className="text-small pr-1">Driver Address</span>
                        <input type="text" name="driver_address" className="form-control"
                            value={this.state.driver_address} onChange={(event) => this.setState({ driver_address: event.target.value })} />


                        <br></br>
                        <button className="btn btn-success" onClick={this.saveOrUpdateCargo.bind(this)}>Save</button>
                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button>
                    </Container>
                </Container>
            </Container>





        )

    }
}

export default IOTSuppoertCreateCargo
