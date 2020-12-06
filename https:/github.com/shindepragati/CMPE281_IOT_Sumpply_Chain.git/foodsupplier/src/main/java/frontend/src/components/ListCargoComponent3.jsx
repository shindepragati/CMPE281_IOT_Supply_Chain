import React, { Component } from 'react'
import CargoServices from '../services/CargoServices'
import { Container, Nav } from "./styled-components";
import SortIcon from "@material-ui/icons/ArrowDownward";
import DataTable, { createTheme } from 'react-data-table-component';

createTheme('solarized', {
    text: {
        primary: 'is-dark-text-light letter-spacing text-medium',
        secondary: 'is-dark-text-light letter-spacing text-medium',
    },
    background: {
        default: 'card-value pt-4 text-small',
    },
    context: {
        background: 'is-dark-text-light letter-spacing text-medium',
        text: '#FFFFFF',
    },
    divider: {
        default: '#073642',
    },
    action: {
        button: 'rgba(0,0,0,.54)',
        hover: 'rgba(0,0,0,.08)',
        disabled: 'rgba(0,0,0,.12)',
    },
});

const columns = [
    {
        name: "Cargo ID",
        selector: "cargoid",
        sortable: true
    },
    {
        name: "Cargo Reg ID",
        selector: "cargo_reg_id",
        sortable: true
    },
    {
        name: "Cargo Container Type",
        selector: "cargo_type",
        sortable: true,
        // right: true
    },
    {
        name: "Customer Name",
        selector: "customername",
        sortable: true,
        // right: true
    },
    {
        name: "Customer Email",
        selector: "customeremail",
        sortable: true,
        //right: true
    }
];
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

     handleChange = state => {
    console.log('state', state.selectedRows);

    this.setState({ cargoid: state.selectedRows });
  };

    render() {

        console.log(this.state.cargos)
        return (
            <Container>
                <Container className="container-fluid pr-5 pl-5 pt-5 pb-5">
                    {/* row 1 - revenue */}
                    <Container className="row">

                        <Container className="col-lg-12 col-sm-12 is-light-text mb-4">
                            <Container className="card Container-card is-card-dark">
                                <Container className="card-heading">
                                    <Container className="is-dark-text-light letter-spacing text-medium">
                                        Suppliers Orders
                                    
                  </Container>
                                </Container>
                              
                                <Container className=" card-value pt-4 text-small">
  <Container className="card-heading">
                                    <Container className="is-dark-text-light letter-spacing text-medium">
                                      <button style={{ marginRight: "auto"}} onClick={() => this.trackCargo(this.state.cargos.cargoid)} className="btn btn-danger">Track</button>
                                <button style={{ marginRight: "auto"}} onClick={() => this.deleteCargo(this.state.cargos.cargoid)} className="btn btn-danger">Delete</button>

                  </Container>
                                </Container>
                                    <DataTable
                                        columns={columns}
                                        data={this.state.cargos}
                                        defaultSortField="title"
                                        sortIcon={<SortIcon />}
                                        pagination
                                        selectableRows
                                        onRowSelected={this.handleChange}
                                        highlightOnHover={true}
                                        responsive={true}
                                        theme="solarized"
                                    />

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
