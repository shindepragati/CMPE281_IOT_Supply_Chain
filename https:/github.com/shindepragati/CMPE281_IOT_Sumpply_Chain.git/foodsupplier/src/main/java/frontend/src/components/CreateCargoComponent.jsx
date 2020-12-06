
import React, { Component, useState } from 'react'
import CargoServices from '../services/CargoServices';
import Calendar from 'react-calendar'
import { Container, Nav } from "./styled-components";

import 'react-calendar/dist/Calendar.css';

class CreateCargoComponent extends Component {


    constructor(props) {
        super(props)

        this.state = {
            cid: '',
            cargo_reg_id: '',
            cargo_type: '',
            cargo_comapny: '',
            cargo_from_route: '',
            cargo_to_route: '',

            temperature: '',
            light: '',
            weight: '',

            humidity: '',

            customername: '',
            customeremail: '',

            customeraddress: '',
            date: '',
            cargos: [],
            fromroute: [],
            toroute: [],
            containertype: [],
            cargoids: []

        }
        this.addCargo = this.addCargo.bind(this);


    }



    addCargo() {
        this.props.history.push('/add-cargo/_add');
    }


    componentDidMount() {
        CargoServices.getCargos().then((res) => {
            this.setState({ cargos: res.data });
            console.log("**" + this.state.cargos)
            this.setState({ fromroute: [...new Set(this.state.cargos.map(img => img.cargo_from_route))] });
            this.setState({ toroute: [...new Set(this.state.cargos.map(img => img.cargo_to_route))] });
            this.setState({ containertype: [...new Set(this.state.cargos.map(img => img.cargo_type))] });
            this.setState({ cargoids: [...new Set(this.state.cargos.map(img => img.cargoid))] });
           
        });

    }


    saveOrUpdateCargo() {

        // this.state.cargos={}
        //let cargo = { cargoid: this.state.cargoid, packages: this.state.package, temperature: this.state.temperature, weight: this.state.weight, light: this.state.light, humidity: this.state.humidity, customername: this.state.customername, customeremail: this.state.customeremail, customeraddress: this.state.customeraddress, date: this.state.date };
        let cargo = { cargoid: this.state.cid, cargo_reg_id: this.state.cargo_reg_id, cargo_comapny: this.state.cargo_comapny, cargo_from_route: this.state.cargo_from_route, cargo_to_route: this.state.cargo_to_route, packages: this.state.package, temperature: this.state.temperature, weight: this.state.weight, light: this.state.light, humidity: this.state.humidity, customername: this.state.customername, customeremail: this.state.customeremail, customeraddress: this.state.customeraddress, timestamp: this.state.date };


        console.log('cargo => ' + JSON.stringify(cargo));


        CargoServices.createMasterCargos(cargo).then(res => {
            this.props.history.push('/cargo');
        });
    }



    onChange = (dateval) => {
        this.setState({ date: dateval });
        console.log((dateval));
    }
    handleChange(event) {

        const selected = [];
        let selectedOption = (event.target.selectedOptions);

        for (let i = 0; i < selectedOption.length; i++) {
            if (selectedOption.item(i).value == "Temperature") { this.setState({ temperature: "0" }) }
            if (selectedOption.item(i).value == "Humidity") { this.setState({ humidity: "0" }) }

            if (selectedOption.item(i).value == "Weight") { this.setState({ light: "0" }) }
            if (selectedOption.item(i).value == "Light") { this.setState({ weight: "0" }) }

            //selected.push(selectedOption.item(i).value)
        }


    }

    cancel() {
        this.props.history.push('/cargo');
    }

    getTitle() {
        return <h3 className="text-center">Add Cargo</h3>

    }

    render() {
        // const fromroute = new Set(this.state.cargos.map(img => img.cargo_from_route))

        // let momentsList = [];
        // this.state.cargos.forEach(({ id, location }) => momentsList.push({ id, location }));



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
                                    <span className="text-small pr-1">From Route</span>

                                    <select id="cargoselect" className="form-control" onChange={(event) => this.setState({ cargo_from_route: event.target.value })}>
                                        <option selected>Choose...</option>
                                        {

                                            this.state.fromroute.sort().map((location, index) => <option key={index}>{location}</option>)

                                        }
                                    </select>


                                </Container>

                                <Container className="card-value pt-4 text-small">
                                    <span className="text-small pr-1">To Route</span>

                                    <select id="cargoselect" class="form-control" onChange={(event) => this.setState({ cargo_to_route: event.target.value })}>
                                        <option selected>Choose...</option>
                                        {
                                            // fromroute.forEach((i) => {
                                            //     return (
                                            //         <option value={i}>{i}</option>
                                            //     )
                                            // })


                                            this.state.toroute.sort().map((location, index) => <option key={index}>{location}</option>)
                                        }
                                    </select>


                                </Container>

                                <Container className="card-value pt-4 text-small">
                                    <span className="text-small pr-1">Container Type</span>

                                    <select id="cargoselect" class="form-control" onChange={(event) => this.setState({ cargo_type: event.target.value })}>
                                        <option selected>Choose...</option>
                                        {

                                            // this.state.cargos.map((cargo) => {
                                            //     return (
                                            //         <option value={JSON.stringify(cargo)}>{cargo.cargo_type}</option>
                                            //     )
                                            // })

                                            this.state.containertype.sort().map((location, index) => <option key={index}>{location}</option>)

                                        }
                                    </select>

                                </Container>

                                <Container className="card-value pt-4 text-small">
                                    <span className="text-small pr-1">Caargo ID</span>

                                    <select id="cargoselect" class="form-control" onChange={(event) => this.setState({ cid: event.target.value })}>
                                        <option selected>Choose...</option>
                                        {
                                            // this.state.cargos.map((cargo) => {
                                            //     if (cargo.cargo_from_route == this.state.cargo_from_route) {
                                            //         if (cargo.cargo_to_route == this.state.cargo_to_route) {

                                            //             return (
                                            //                 <option value={JSON.stringify(cargo)}>{cargo.cargoid}</option>
                                            //             )
                                            //         }
                                            //     }
                                            // })
                                            this.state.cargoids.sort().map((location, index) => <option key={index}>{location}</option>)


                                        }
                                    </select>

                                </Container>


                                <Container className="card-value pt-4 text-small">
                                    <span className="text-small pr-1">Select Sensors</span>
                                    <select multiple class="form-control" defaultValue={'DEFAULT'} onChange={this.handleChange.bind(this)}>
                                        <option value="DEFAULT" disabled>Choose a sensor ...</option>
                                        <option value="temperature">Temperature</option>
                                        <option value="humidity">Humidity</option>
                                        <option value="weight">Weight</option>
                                        <option value="light">Light</option>
                                    </select>
                                </Container>



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

                                    <button className="btn btn-success" onClick={this.saveOrUpdateCargo.bind(this)}>Save</button>
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
