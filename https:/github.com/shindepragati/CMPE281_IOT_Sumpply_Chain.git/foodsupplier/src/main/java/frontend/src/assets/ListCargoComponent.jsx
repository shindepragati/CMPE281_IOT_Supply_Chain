import React, { Component } from 'react'
import CargoServices from '../services/CargoServices'
class ListCargoComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            cargos: []
        }
        this.addCargo = this.addCargo.bind(this);
        this.editCargo = this.editCargo.bind(this);
        this.deleteCargo = this.deleteCargo.bind(this);
    }

    deleteCargo(id) {
        CargoServices.deleteCargo(id).then(res => {
            this.setState({ cargos: this.state.cargos.filter(cargo => cargo.id !== id) });
        });
    }
    viewCargo(id) {
        this.props.history.push(`/view-cargo/${id}`);
    }
    editCargo(id) {
        this.props.history.push(`/edit-cargo/${id}`);
    }

    trackCargo(id) {
        this.props.history.push(`/track-cargo/${id}`);
    }

    componentDidMount() {
        CargoServices.getMasterCargos().then((res) => {
            this.setState({ cargos: res.data });
            console.log("**" + this.state.cargos)
        });
    }

    addCargo() {
        this.props.history.push('/add-cargo/_add');
    }

    render() {

        console.log(this.state.cargos)
        return (
                     <div className="content">
                <div className="container-fluid">
                    <div className="row">

                        {/* <div className="col-md-4">
                            <div className="card ">
                                <div className="card-header ">
                                    <h4 className="card-title">Your Order Statistics</h4>
                                    <p className="card-category">Last</p>
                                </div>
                                <div className="card-body ">
                                    <ChartistGraph data={dataPie} type="Pie" />
                                    <div className="legend">
                                        <i className="fa fa-circle text-info"></i> New Orders
                                        <i className="fa fa-circle text-danger"></i> Completed
                                        <i className="fa fa-circle text-warning"></i> In-progress
                                    </div>
                                    <hr />
                                    <div className="stats">
                                        <i className="fa fa-clock-o"></i> Total 17 orders in your account
                                    </div>
                                </div>
                            </div>
                        </div> */}
                        <div className="col-md-14">
                            <div>
                                <div className="card-header ">
                                    <h4 className="card-title">My Orders</h4>
                                    <p className="card-category"></p>
                                </div>
                                <div className="card-body " >
                                    <table className="table table-striped table-bordered">

                                        <thead>
                                            <tr>
                                                <th >  Cargo ID</th>
                                                <th> Cargo Reg ID</th>
                                                <th> Cargo Container Type</th>
                                                <th> Cargo Comapny</th>
                                                <th> Cargo From Route</th>
                                                <th> Cargo To Route</th>
                                                <th>Customer Name</th>
                                                <th>Customer Email</th>
                                                <th>Customer Address</th>
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

                                                            <td> {cargos.customername} </td>
                                                            <td> {cargos.customeremail}</td>

                                                            <td> {cargos.customeraddress}</td>

                                                            <td style={{ display: "flex" }}>
                                                                <button style={{ marginLeft: "auto" }} onClick={() => this.trackCargo(cargos.cargoid)} className="btn btn-danger">Track</button>


                                                            </td>
                                                        </tr>
                                                )
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <div className="card-footer ">
                                    <div className="legend">

                                    </div>
                                    <hr />
                                    <div className="stats">
                                        <i className="fa fa-history"></i> Updated 3 minutes ago
                  </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default ListCargoComponent
