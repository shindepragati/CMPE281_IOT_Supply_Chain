
import React, { Component, useState } from 'react'
import CargoServices from '../services/CargoServices';
import Calendar from 'react-calendar'
import { Container, Nav } from "./styled-components";

import 'react-calendar/dist/Calendar.css';

class CreateCargoComponent extends Component {


    constructor(props) {
        super(props)

        this.state = {
            cargoid: "",
            orderid: "",
            order_creation_date: new Date(),
            order_completion_date: "",
            cargo_reg_id: "",
            cargo_type: "",
            cargo_comapny: "",
            shipement_from_route: "",
            shipement_to_route: "",
            shipement_status: "",
            sensorlist: {},
            driver_name: "",
            license_no: "",
            driver_address: "",
            driver_rating: "",
            driver_phonenumber: "",
            packages: "",
            customeremail: "",
            customername: "",
            customeraddress: "",
            customerphonenumber: "",
            cargos: [],
            source: [],
            destination: [],
            type: [],
            cargoids: []

        }
      }




    componentDidMount() {
        CargoServices.getCargos().then((res) => {
            this.setState({ cargos: res.data });
            console.log("**" + this.state.cargos)
            this.setState({ source: [...new Set(this.state.cargos.map(img => img.cargo_from_route))] });
            this.setState({ destination: [...new Set(this.state.cargos.map(img => img.cargo_to_route))] });
            this.setState({ type: [...new Set(this.state.cargos.map(img => img.cargo_type))] });
            this.setState({ cargoids: [...new Set(this.state.cargos.map(img => img.cargoid))] });

        });

    }


    saveOrUpdateCargo(event) {

        let cargo = {
            cargoid: this.state.cargoid,
            customeremail: this.state.customeremail,
            customername: this.state.customername,
            customeraddress: this.state.customeraddress,
            customerphonenumber: this.state.customerphonenumber,
            order_creation_date: new Date(),
            order_completion_date: this.state.order_completion_date,
            orderid: this.state.order_creation_date + "_" + this.state.cargoid,
            cargo_type: this.state.cargo_reg_id,
            shipement_from_route: this.state.shipement_from_route,
            shipement_to_route: this.state.shipement_to_route,
            shipement_status: "Order Placed",
            sensorlist: {},
            packages: "Fruits",


            // this.state.cargos.map((c, cargoid) =>
            //     this.setState({
            //         cargo_comapny: c.cargo_reg_id,
            //         cargo_reg_id: c.cargo_reg_id,
            //         driver_name: c.driver_name,
            //         license_no: c.license_no,
            //         driver_address: c.driver_address,
            //         driver_rating: c.driver_rating,
            //         driver_phonenumber: c.driver_phonenumber
            //     }));

        }




        console.log('cargo => ' + JSON.stringify(cargo));


        CargoServices.createMasterCargos(cargo).then(res => {
           // this.props.history.push('/cargo');
        });
    }



    onChange = (dateval) => {
        this.setState({ order_completion_date: dateval });
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


        return (

            <Container>


                         <Container className="card grid-card">
                           

                                <label className="text-small pr-1">Source</label>

                                <select id="cargoselect" className="form-control" onChange={(event) => this.setState({ shipement_from_route: event.target.value })}>
                                    <option selected>Choose...</option>
                                    {

                                        this.state.source.sort().map((location, index) => <option key={index}>{location}</option>)

                                    }
                                </select>

                                <br></br>
                                <label className="text-small pr-1">Destination</label>

                                <select id="cargoselect" class="form-control" onChange={(event) => this.setState({ shipement_to_route: event.target.value })}>
                                    <option selected>Choose...</option>
                                    {
                                        // fromroute.forEach((i) => {
                                        //     return (
                                        //         <option value={i}>{i}</option>
                                        //     )
                                        // })


                                        this.state.destination.sort().map((location, index) => <option key={index}>{location}</option>)
                                    }
                                </select>
                                <br></br>

                                <label className="text-small pr-1">Container Type</label>

                                <select id="cargoselect" class="form-control" onChange={(event) => this.setState({ cargo_type: event.target.value })}>
                                    <option selected>Choose...</option>
                                    {

                                        // this.state.cargos.map((cargo) => {
                                        //     return (
                                        //         <option value={JSON.stringify(cargo)}>{cargo.cargo_type}</option>
                                        //     )
                                        // })

                                        this.state.type.sort().map((location, index) => <option key={index}>{location}</option>)

                                    }
                                </select>

                            <br></br>    <label className="text-small pr-1">Cargos</label>

                                <select id="cargoselect" class="form-control" onChange={(event) => this.setState({ cargoid: event.target.value })}>
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

                                <br></br>    <span className="text-small pr-1">Select Sensors</span>
                                <select multiple class="form-control" defaultValue={'DEFAULT'} onChange={this.handleChange.bind(this)}>
                                    <option value="DEFAULT" disabled>Choose a sensor ...</option>
                                    <option value="temperature">Temperature</option>
                                    <option value="humidity">Humidity</option>
                                    <option value="weight">Weight</option>
                                    <option value="light">Light</option>
                                    <option value="light">Shock</option>
                                    <option value="light">GPS</option>
                                </select>
                            <br></br>    <span className="text-small pr-1">Customer Name</span>
                                <input type="text" name="customername" className="form-control"
                                    value={this.state.customername} onChange={(event) => this.setState({ customername: event.target.value })} />

                            <br></br>    <span className="text-small pr-1">Customer Email</span>
                                <input type="text" name="customeremail" className="form-control"
                                    value={this.state.customeremail} onChange={(event) => this.setState({ customeremail: event.target.value })} />

                            <br></br>    <span className="text-small pr-1">Customer PhoneNo</span>
                                <input type="text" name="customerphonenumber" className="form-control"
                                    value={this.state.customerphonenumber} onChange={(event) => this.setState({ customerphonenumber: event.target.value })} />

                            <br></br>                   <span className="text-small pr-1">Customer Address</span>
                                <input type="text" name="customeraddress" className="form-control"
                                    value={this.state.customeraddress} onChange={(event) => this.setState({ customeraddress: event.target.value })} />

                            <br></br>    <span className="text-small pr-1">Order Fulfillment Date</span>
                                <Calendar
                                    value={this.state.order_completion_date}
                                    onClickDay={this.onChange}
                                />
                           <br></br>
                                <button className="btn btn-success" onClick={this.saveOrUpdateCargo.bind(this)}>Save</button>
                                <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button>
                            </Container>
                        </Container>

                  
             
           

        )

    }
}

export default CreateCargoComponent
