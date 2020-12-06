import React, { Component } from 'react'
import CargoServices from '../services/CargoServices'
import { Container, Nav } from "./styled-components";
import { Container, Row, Col, Table } from "react-bootstrap";
class ListCargoComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            cargos: []
        }
        this.trackCargo = this.trackCargo.bind(this);
        this.addCargo = this.addCargo.bind(this);
    }

    trackCargo(id) {
        console.log("cargois in list" + id)
        this.props.history.push(`/dashboard/${id}`);
    }

    addCargo() {
        this.props.history.push('/add-cargo/_add');
    }


    componentDidMount() {
        CargoServices.getMasterCargos().then((res) => {
            this.setState({ cargos: res.data });
            console.log("**" + this.state.cargos)
        });
    }

    deleteCargo(id) {
        CargoServices.deleteMasterCargo(id).then(res => {
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

                        <Container className="col-lg-12 col-sm-6 is-light-text mb-4">
                            <Container className="card Container-card is-card-dark">
                                <Container className="card-heading">
                                    <Container className="is-dark-text-light letter-spacing text-medium">
                                        Suppliers Orders
                  </Container>
                                </Container>

                                <Container className=" card-value pt-4 text-small">
                                    {/* <table className="table" style={{ border:"1px solid black"}}> */}
                                    <Table pagination style={{ color: " SeaShell" }}>
                                        <thead>                                           <tr>
                                            <th >  Cargo ID</th>
                                            <th> Cargo Reg ID</th>
                                            <th> Cargo Container Type</th>
                                            {/* <th> Cargo Comapny</th>
                                                <th> Cargo From Route</th>
                                                <th> Cargo To Route</th> */}
                                            <th>Supplier Name</th>
                                            <th>Supplier Email</th>
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
                                                            {/* <td> {cargos.cargo_comapny} </td> */}
                                                            {/* <td> {cargos.cargo_from_route} </td>
                                                            <td> {cargos.cargo_to_route}</td> */}

                                                            <td> {cargos.customername} </td>
                                                            <td> {cargos.customeremail}</td>

                                                            {/* <td> {cargos.customeraddress}</td> */}

                                                            <td style={{ display: "flex" }}>
                                                                <button style={{ marginLeft: "auto" }} onClick={() => this.trackCargo(cargos.cargoid)} class="btn btn-info">Track</button>
                                                              <button style={{ marginLeft: "auto" }} onClick={() => this.deleteCargo(cargos.cargoid)} className="btn btn-danger">Delete</button>
                                                               
                                                                {/* <button style={{ marginLeft: "auto" }} onClick={() => this.deleteCargo(cargos.cargoid)} className="closer">Delete</button>
                                                                */}

                                                                 {/* <button type="button" class="btn btn-info" aria-label="Track"  style={{ marginLeft: "auto" ,color:"green"}} onClick={() => this.trackCargo(cargos.cargoid)}>
                                                                    <span aria-hidden="true">&times;</span>
                                                                </button> */}
                                                                {/* <button type="button" class="btn btn-link" aria-label="Delete"  style={{ marginLeft: "auto" ,color:"red"}} onClick={() => this.deleteCargo(cargos.cargoid)}>
                                                                    <span aria-hidden="true">&times;</span>
                                                                </button> */}

                                                            </td>
                                                        </tr>
                                                )
                                            }
                                        </tbody>
                                    </Table>

                                </Container>
                            </Container>
                        </Container>
                    </Container>
                </Container>
            </Container>


        )
    }
}

export default ListCargoComponent
