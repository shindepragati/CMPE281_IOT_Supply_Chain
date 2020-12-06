import React, { Component } from 'react'
import CargoServices from '../services/CargoServices'
import { Container, Nav } from "./styled-components";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import BootstrapTable from "react-bootstrap-table-next";
import overlayFactory from 'react-bootstrap-table2-overlay';

// "timestamp": "2020-09-19T08:55:09.150+00:00",
// "sensorlist": {
//     "temperature": "30,turn on",
//     "GPS": "-37.8134078,144.9794923,turn on"
// },

const columns = [
    {
        text: "Name",
        dataField: "cargoid",
        sortable: true,
        headerStyle: () => {
            return { width: "8%" };
        }
    },
    {
        text: "Company",
        dataField: "cargo_comapny",
        sortable: true,
        headerStyle: () => {
            return { width: "8%" };
        }
    },
    {
        text: "Registration Number",
        dataField: "cargo_reg_id",
        sortable: true,
        headerStyle: () => {
            return { width: "8%" };
        }
    },
    {
        text: "Type",
        dataField: "cargo_type",
        sortable: true,
        headerStyle: () => {
            return { width: "8%" };
        }
    },
    {
        text: "Source",
        dataField: "cargo_from_route",
        sortable: true,
        headerStyle: () => {
            return { width: "7%" };
        }
    },
    {
        text: "Destination",
        dataField: "cargo_to_route",
        sortable: true,
        headerStyle: () => {
            return { width: "7%" };
        }
    },
    {
        text: "Cargo Status",
        dataField: "cargoid",
        sortable: true,
        headerStyle: () => {
            return { width: "7%" };
        }
    },
    {
        text: "Driver",
        dataField: "driver_name",
        sortable: true,
        headerStyle: () => {
            return { width: "7%" };
        }
    },
    {
        text: "License No",
        dataField: "license_no",
        sortable: true,
        headerStyle: () => {
            return { width: "7%" };
        }
    },
    {
        text: "Driver Address",
        dataField: "driver_address",
        sortable: true,
        headerStyle: () => {
            return { width: "7%" };
        }
    },
    {
        text: "Driver Rating",
        dataField: "driver_rating",
        sortable: true,
        headerStyle: () => {
            return { width: "7%" };
        }
    },
    {
        text: "Driver Phonenumber",
        dataField: "driver_phonenumber",
        sortable: true,
        headerStyle: () => {
            return { width: "7%" };
        }
    },
    {
        text: "Cargo Added",
        dataField: "timestamp",
        sortable: true,
        headerStyle: () => {
            return { width: "7%" };
        }
    }

];

class IOTSupportListAllCargos extends Component {
    constructor(props) {
        super(props)

        this.state = {
            cargos: []
        }
    }


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
                {/* row 1 - revenue */}
                <Container className="row">

                    <Container className="col-md-20 mb-4">
                        <Container className="card chart-card">
                            <Container className="chart-container small full-height">

                                <BootstrapTable
                                    bordered={false}
                                    hover
                                    overlay={overlayFactory()}
                                    pagination={paginationFactory()}
                                    expandRow={true}
                                    keyField='id'
                                    data={this.state.cargos}
                                    columns={columns}
                                    responsive={true}
                                    filter={filterFactory()}
                                    //  selectRow={ selectRowProp }
                                    // expandRow={this.expandRow}
                                    expandComponent={this.expandComponent}
                                />

                            </Container>
                        </Container>
                    </Container>
                </Container>
            </Container>


        )
    }
}

export default IOTSupportListAllCargos
