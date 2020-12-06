
import React, { Component, useState } from 'react'
import CargoServices from '../services/CargoServices';
import Calendar from 'react-calendar'
import { Container, Nav } from "./styled-components";

import 'react-calendar/dist/Calendar.css';

class CreateCargoComponent extends Component {


    constructor(props) {
        super(props)

        console.log(this.props.match.params.id)
        this.state = {
            // step 2
            id: this.props.match.params.id,
            cargoid: '',
            package: '',
            temperature: '',
            weight: '',
            light: '',
            humidity: '',
            customername: '',
            customeremail: '',
            customeraddress: '',

            date: new Date(),
            cargos: []


        }

    }

    // step 3
    componentDidMount() {
        console.log(this.state.id)
    }
    saveOrUpdateCargo = (e) => {
        e.preventDefault();
        let cargo = { cargoid: this.state.cargoid, packages: this.state.package, temperature: this.state.temperature, weight: this.state.weight, light: this.state.light, humidity: this.state.humidity, customername: this.state.customername, customeremail: this.state.customeremail, customeraddress: this.state.customeraddress, date: this.state.date };
        console.log('cargo => ' + JSON.stringify(cargo));


        CargoServices.createMasterCargos(cargo).then(res => {
            this.props.history.push('/cargo');
        });
        //}
    }

    onChange = (dateval) => {
        this.setState({ date: dateval });
        console.log((dateval));
    }
    handleChange(event) {

        const selected = [];
        let selectedOption = (event.target.selectedOptions);

        for (let i = 0; i < selectedOption.length; i++) {
            selected.push(selectedOption.item(i).value)
        }

        this.setState({ sensorlist: selected });
    }

    cancel() {
        this.props.history.push('/cargo');
    }

    getTitle() {
        return <h3 className="text-center">Add Cargo</h3>

    }
    render() {

        return (

            <Container>
                {/* content area start */}
                <Container className="container-fluid pr-5 pl-5 pt-5 pb-5 float center">
                    {/* row 1 - revenue */}
                    <Container className="row">
                        <Container className="col-lg-5 col-sm-6 is-light-text mb-4">
                            <Container className="card Container-card is-card-dark">
                                <Container className="card-heading">
                                    <Container className="is-dark-text-light letter-spacing text-small">
                                        Add Cargo
                  </Container>
                                </Container>

                                <Container className="card-value pt-4 text-small">
                                    <span className="text-small pr-1">Container Type</span>
                                    <input type="text" name="container" className="form-control"
                                        value={this.state.id} onChange={(event) => this.setState({ id: event.target.value })} />

                                </Container>

                                <Container className="card-value pt-4 text-small">
                                    <span className="text-small pr-1">Select Cargo</span>

                                    {/* <select id="cargoselect" class="form-control" onChange={(event) => this.setState({ cargoid: event.target.value })}>
                                    //                                 <option selected>Choose...</option>
                                    //                                 {
                                    //                                     this.state.cargos.map((cargo) => {
                                    //                                         return (
                                    //                                             <option value={JSON.stringify(cargo)}>{cargo.snmid}</option>
                                    //                                         )
                                    //                                     })
                                    //                                 }
                                    //                             </select> */}


                                    <select class="form-control" defaultValue={'DEFAULT'} onChange={(event) => this.setState({ cargoid: event.target.value })}>
                                        <option value="DEFAULT" disabled>Choose a sensor node ...</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                                </Container>


                                <Container className="card-value pt-4 text-small">
                                    <span className="text-small pr-1">Select Sensors</span>
                                    <select multiple class="form-control" defaultValue={'DEFAULT'} onChange={this.handleChange.bind(this)}>
                                        <option value="DEFAULT" disabled>Choose a sensor ...</option>
                                        <option value="temperature">Temp</option>
                                        <option value="humidity">Humidity</option>
                                        <option value="weight">Weight</option>
                                        <option value="light">Light</option>
                                    </select>
                                </Container>

                                {/* <Container className="card-value pt-4 text-small">
                                    <span className="text-small pr-1">Packages</span>
                                    <input type="text" name="package" className="form-control"
                                        value={this.state.package} onChange={(event) => this.setState({ package: event.target.value })} />

                                </Container> */}

                                <Container className="card-value pt-4 text-small">
                                    <span className="text-small pr-1">Customer Name</span>
                                    <input type="text" name="customername" className="form-control"
                                        value={this.state.customername} onChange={(event) => this.setState({ customername: event.target.value })} />

                                </Container>
                                <Container className="card-value pt-4 text-small">
                                    <span className="text-small pr-1">Customer Email</span>
                                    <input type="text" name="customeremail" className="form-control"
                                        value={this.state.customeremail} onChange={(event) => this.setState({ customeremail: event.target.value })} />

                                </Container>


                            </Container> </Container>
                        <Container className="col-lg-5 col-sm-6 is-light-text mb-4">
                            <Container className="card Container-card is-card-dark">
                                <Container className="card-heading">
                                    <Container className="is-dark-text-light letter-spacing text-small">

                                    </Container>
                                </Container>


                                <Container className="card-value pt-4 text-small">
                                    <span className="text-small pr-1">Customer Address</span>
                                    <input type="text" name="customeraddress" className="form-control"
                                        value={this.state.customeraddress} onChange={(event) => this.setState({ customeraddress: event.target.value })} />

                                </Container>

                                <Container className="card-value pt-4 text-small">
                                    <span className="text-small pr-1">Date</span>
                                    <Calendar
                                        value={this.state.date}
                                        onClickDay={this.onChange}
                                    />
                                </Container>

                                <Container className="card-value pt-4 text-small">

                                    <button className="btn btn-success" onClick={this.saveOrUpdateCargo}>Save</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button>
                                </Container>
                            </Container>

                        </Container>
                    </Container>
                </Container>

            </Container>

        )

    }
}

export default CreateCargoComponent
