import React, { Component } from 'react'
import CargoServices from '../services/CargoServices';
import Calendar from 'react-calendar'

import 'react-calendar/dist/Calendar.css';

class updatepopup extends Component {
	constructor(props) {
		super(props)

		this.state = {
			cargoid: this.props.match.params.id,
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
			latitude: '',
			longitude: ''

		}
	}
	handleClick = () => {
		this.props.toggle();
	};
	componentDidMount() {
		CargoServices.getMasterCargoById(this.state.cargoid).then((res) => {
			let cargo = res.data;
			console.log("*****" + cargo)
			this.setState({
				cargoid: cargo.cargoid,

				cargo_reg_id: cargo.cargo_reg_id,
				cargo_type: cargo.cargo_type,
				cargo_comapny: cargo.cargo_comapny,
				cargo_from_route: cargo.cargo_from_route,
				cargo_to_route: cargo.cargo_to_route,

				temperature: cargo.temperature,
				light: cargo.light,
				weight: cargo.weight,

				humidity: cargo.humidity,

				customername: cargo.customername,
				customeremail: cargo.customeremail,

				customeraddress: cargo.customeraddress,

				latitude: cargo.latitude,
				longitude: cargo.longitude,
				packages: cargo.packages
			});
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
			selected.push(selectedOption.item(i).value)
		}

		this.setState({ sensorlist: selected });
	}
	updateCargo = (event) => {
		let cargo = {
			cargoid: this.state.cargoid,

			cargo_reg_id: this.state.cargo_reg_id,
			cargo_type: this.state.cargo_type,
			cargo_comapny: this.state.cargo_comapny,
			cargo_from_route: this.state.cargo_from_route,
			cargo_to_route: this.state.cargo_to_route,

			temperature: this.state.temperature,
			light: this.state.light,
			weight: this.state.weight,

			humidity: this.state.humidity,

			customername: this.state.customername,
			customeremail: this.state.customeremail,

			customeraddress: this.state.customeraddress,

			latitude: this.state.latitude,
			longitude: this.state.longitude
		}
		CargoServices.updateMasterCargo(cargo).then(res => {
			// this.props.history.push('/cargo');
		});
	}

	cancel() {
		this.props.history.push('/cargos');
	}

	getTitle() {
		return <h3 className="text-center">Update Cargo</h3>

	}

	render() {
		return (
			<div>
				<br></br>
				<div className="container">
					<div className="row">
						<div className="card col-md-6 offset-md-3 offset-md-3">
							{
								this.getTitle()
							}
							<div className="card-body">
								<form>
									<div className="form-group">
										<label> To Location </label>
										<input type="text" placeholder="cargoid" name="cargo id" className="form-control"
											value={this.state.cargoid} />
									</div>

									<div className="form-group">
										<label> Select Sensors </label>


										{/* <select multiple={true} id="sensorselect" class="form-control" onChange={(event) => this.setState({ sensorlist: event.target.value })}>

                                            <option selected></option>
                                            {

                                                this.state.cargos.map((cargo, cargoid) => {
                                                    return (

                                                        <option value={JSON.stringify(cargo)}>{cargo.SENSORS.TYPE}</option>
                                                    )
                                                })
                                            }
                                        </select> */}



										<select multiple className="form-control" defaultValue={this.state.sensorslist} onChange={this.handleChange.bind(this)}>
											<option value="DEFAULT" disabled>Choose a sensor ...</option>
											<option value="temperature">Temperature</option>
											<option value="wight">Light</option>
											<option value="weight">Weight</option>
											<option value="humidity">Humidity</option>
										</select>
									</div>

									<div className="form-group">
										<label> Package </label>
										<input type="text" placeholder="packages" name="packages" className="form-control"
											value={this.state.packages} onChange={(event) => this.setState({ packages: event.target.value })} />
									</div>

									<div className="form-group">
										<label> Select Date </label>
										<div>
											<Calendar
												value={this.state.date}
												onClickDay={this.onChange}
											/>
										</div>                                    </div>

									<button className="btn btn-success" onClick={this.updateCargo}>Save</button>
									<button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button>
								</form>
							</div>
						</div>
					</div>

				</div>
			</div>
		)

	}
}

export default updatepopup
