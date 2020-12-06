import React, { Component } from "react";
import { Container, Nav } from "./styled-components";
import CargoServices from '../services/CargoServices'

import 'leaflet/dist/leaflet.css';
import Markers from './LocationMarker';

import '../style.css';
import { MapContainer, TileLayer, Popup } from 'react-leaflet';

// fusioncharts
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import Maps from "fusioncharts/fusioncharts.maps";
import USARegion from "fusionmaps/maps/es/fusioncharts.usaregion";
import ReactFC from "react-fusioncharts";
import "./charts-theme";

import Dropdown from "react-dropdown";
import formatNum from "./format-number";

import { Marker } from 'react-leaflet';
import { Location } from './Location';
import MarkerPopup from './MarkerPopup';
import L from 'leaflet';

ReactFC.fcRoot(FusionCharts, Charts, Maps, USARegion);

// const url = `https://sheets.googleapis.com/v4/spreadsheets/${
//   config.spreadsheetId
//   }/values:batchGet?ranges=Sheet1&majorDimension=ROWS&key=${config.apiKey}`;

class DashboardMap extends Component {

  constructor(props) {

    super(props);
    console.log(this.props.match.params.id)
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
      longitude: '',
      packages: '',
      //currentLocation: { lat: 52.52437, lng: 13.41053 },
      zoom: 12,
      lastLocation: []

    }

  }

  renderMarker = () => {
    const { lastLocation } = this.state;

    return lastLocation.map(loc => {
      const icon = L.icon({
        iconUrl: require('../assets/images/venue_location_icon.svg'),
        iconRetinaUrl: require('../assets/images/venue_location_icon.svg'),
        iconAnchor: null,
        shadowUrl: null,
        shadowSize: null,
        shadowAnchor: null,
        iconSize: [35, 35],
        className: 'leaflet-venue-icon'
      });
      const position = [this.state.latitude, this.state.longitude];

      return (
        <Marker key={this.state.cargoid} position={position} icon={icon}>
          <Popup>
             <span>{this.state.cargoid}</span>
             <br></br>
            <span>{this.state.cargo_reg_id}</span> <br></br>
            <span>{this.state.latitude}</span> <br></br>
            <span>{this.state.longitude}</span> <br></br>
             <span>{this.state.customeremail}</span>
          </Popup>
        </Marker>
      );
    });
  };


  componentDidMount() {
    console.log("cargoid" + this.state.cargoid)
    CargoServices.getMasterCargoById(this.state.cargoid).then((res) => {
      let cargo = res.data;

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
        packges: cargo.packages
      });
      console.log("*****" + cargo)

      this.setState({
        lastLocation: [{ x: this.state.latitude, y: this.state.longitude, vehicle: "Truck", vehicle_no: this.state.cargo_reg_id, cargoid: this.state.cargoid }]
      });


    });

    
  }

  render() {

    const { currentLocation, zoom } = this.state;
    return (
      <Container>
        {/* content area start */}
        <Container className="container-fluid pr-4 pl-4 pt-4 pb-4">
          {/* row 1 - revenue */}
          <Container className="row">
            <Container className="col-lg-3 col-sm-6 is-light-text mb-2">
              <Container className="card Container-card is-card-dark">
                <Container className="card-heading">
                  <Container className="is-dark-text-light letter-spacing text-small">
                    Customer Details
                  </Container>
                </Container>

                <Container className="card-value pt-4 text-small">
                  <span className="text-medium pr-1"></span>
                  {this.state.customername}
                </Container>

                <Container className="card-value pt-4 text-small">
                  <span className="text-medium pr-1"></span>
                  {this.state.customeremail}
                </Container>


                <Container className="card-value pt-4 text-small">
                  <span className="text-medium pr-1"></span>
                  {this.state.customeraddress}
                </Container>
              </Container>
            </Container>

            <Container className="col-lg-3 col-sm-6 is-light-text mb-2">
              <Container className="card Container-card is-card-dark">
                <Container className="card-heading">
                  <Container className="is-dark-text-light letter-spacing text-small">
                    Cargo Details
                  </Container>
                  {/* <Container className="card-heading-brand">
                    <i className="fab fa-amazon text-large" />
                  </Container> */}
                </Container>

                <Container className="card-value pt-4 text-small">
                  <span className="text-small pr-1"></span>
                  {this.state.cargo_reg_id}
                </Container>
                <Container className="card-value pt-4 text-small">
                  <span className="text-small pr-1"></span>
                  {this.state.cargo_type}
                </Container>
                <Container className="card-value pt-4 text-small">
                  <span className="text-small pr-1"></span>
                  {this.state.cargo_comapny}
                </Container>
              </Container>
            </Container>

            <Container className="col-lg-3 col-sm-6 is-light-text mb-2">
              <Container className="card Container-card is-card-dark">
                <Container className="card-heading">
                  <Container className="is-dark-text-light letter-spacing text-small">
                    Cargo Route
                  </Container>
                  {/* <Container className="card-heading-brand">
                    <i className="fab fa-ebay text-x-large logo-adjust" />
                  </Container> */}
                </Container>

                <Container className="card-value pt-4 text-small">
                  <span className="text-small pr-1">From :</span>
                  {this.state.cargo_from_route}
                </Container>
                <Container className="card-value pt-4 text-small">
                  <span className="text-small pr-1">To :</span>
                  {this.state.cargo_to_route}
                </Container>
              </Container>
            </Container>

            {/* <Container className="col-lg-3 col-sm-6 is-light-text mb-4">
              <Container className="card Container-card is-card-dark">
                <Container className="card-heading">
                  <Container className="is-dark-text-light letter-spacing text-small">
                    Packages
                  </Container>
                 
                </Container>

                <Container className="card-value pt-4 text-x-large">
                  <span className="text-large pr-1"></span>
                  {this.state.packages}
                </Container>
              </Container>
            </Container> */}
          </Container>

          {/* row 2 - conversion */}
          <Container className="row">
            <Container className="col-md-12 col-lg-12 is-light-text mb-4">

              <Container className="card is-card-dark chart-card">
                <Container className="row full-height">
                  <Container className="col-sm-3 full height">
                    <Container className="chart-container full-height">
                      <ReactFC
                        {...{
                          type: "doughnut2d",
                          width: "200",
                          height: "150",
                          dataFormat: "json",
                          containerBackgroundOpacity: "0",
                          dataSource: {
                            chart: {
                              caption: "Temperature",
                              theme: "ecommerce",
                              defaultCenterLabel: `${this.state.temperature}°C`,
                              paletteColors: "#3B70C4, #000000"
                            },
                            data: [
                              {
                                label: "active",
                                value: `${this.state.temperature}`
                              },
                              {
                                label: "inactive",
                                alpha: 5,
                                value: `${100 - this.state.temperature}`
                              }
                            ]
                          }
                        }}
                      />
                    </Container>
                  </Container>

                  <Container className="col-sm-3 full-height border-left border-right">
                    <Container className="chart-container full-height">
                      <ReactFC
                        {...{
                          type: "doughnut2d",
                          width: "100%",
                          height: "100%",
                          dataFormat: "json",
                          containerBackgroundOpacity: "0",
                          dataSource: {
                            chart: {
                              caption: "Light",
                              theme: "ecommerce",
                              defaultCenterLabel: `${this.state.light}%`,
                              paletteColors: "#9C59C4, #000000"
                            },
                            data: [
                              {
                                label: "active",
                                value: `${this.state.light}`
                              },
                              {
                                label: "inactive",
                                alpha: 5,
                                value: `${100 - this.state.light}`
                              }
                            ]
                          }
                        }}
                      />
                    </Container>
                  </Container>

                  <Container className="col-sm-3 full-height border-left border-right">
                    <Container className="chart-container full-height">
                      <ReactFC
                        {...{
                          type: "doughnut2d",
                          width: "100%",
                          height: "100%",
                          dataFormat: "json",
                          containerBackgroundOpacity: "0",
                          dataSource: {
                            chart: {
                              caption: "Humidity",
                              theme: "ecommerce",
                              defaultCenterLabel: `${this.state.humidity}%`,
                              paletteColors: "#41B6C4, #000000"
                            },
                            data: [
                              {
                                label: "active",
                                value: `${this.state.humidity}`
                              },
                              {
                                label: "inactive",
                                alpha: 5,
                                value: `${this.state.humidity}`
                              }
                            ]
                          }
                        }}
                      />
                    </Container>
                  </Container>

                  <Container className="col-sm-3 full-height">
                    <Container className="chart-container full-height">
                      <ReactFC
                        {...{
                          type: "doughnut2d",
                          width: "100%",
                          height: "100%",
                          dataFormat: "json",
                          containerBackgroundOpacity: "0",
                          dataSource: {
                            chart: {
                              caption: "Weight",
                              theme: "ecommerce",
                              defaultCenterLabel: `${
                                this.state.weight
                                }kg`,
                              paletteColors: "#EDF8B1, #000000"
                            },
                            data: [
                              {
                                label: "active",
                                value: `${this.state.weight}`
                              },
                              {
                                label: "inactive",
                                alpha: 5,
                                value: `${this.state.weight}`
                              }
                            ]
                          }
                        }}
                      />
                    </Container>
                  </Container>
                </Container>
              </Container>
            </Container>
          </Container>

          {/* row 3 - orders trend */}
          <Container className="row" style={{ minHeight: "400px" }}>
                       <Container className="col-md-12 mb-4">
              <Container className="card is-card-dark chart-card">
                <Container className="chart-container large full-height">

                   <MapContainer center={{ lat: this.state.latitude, lng: this.state.longitude }} zoom={5} >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />

                    {this.renderMarker()}
                  </MapContainer>

                </Container>
              </Container>
            </Container>

          </Container>
        </Container>

        {/* content area end */}
      </Container >
    );
  }
}

export default DashboardMap;
