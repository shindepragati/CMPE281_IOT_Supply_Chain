import React, { Component } from 'react'
import CargoServices from '../services/CargoServices'
import { Container, Nav } from "./styled-components";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import overlayFactory from 'react-bootstrap-table2-overlay';
import { MapContainer, TileLayer, Marker, Popup, LayersControl } from "react-leaflet";
import L from "leaflet";

import iconUrl from "../assets/images/marker-icon.png";
import 'react-splitter-layout/lib/index.css';
import "leaflet/dist/leaflet.css";
// fusioncharts
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import Maps from "fusioncharts/fusioncharts.maps";
import USARegion from "fusionmaps/maps/es/fusioncharts.usaregion";
import Widgets from 'fusioncharts/fusioncharts.widgets';
//Import the Widgets

// Include the theme as fusion
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import ReactFC from "react-fusioncharts";

import "./charts-theme";

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Widgets, FusionTheme);





const colorRange = {
  "color": [{
    "minValue": "0",
    "maxValue": "50",
    "code": "#e44a00"
  }, {
    "minValue": "50",
    "maxValue": "75",
    "code": "#f8bd19"
  }, {
    "minValue": "75",
    "maxValue": "100",
    "code": "#6baa01"
  }]
};
const columns = [

  {
    text: "Order ID",
    dataField: "orderid",
    sortable: true,
    headerStyle: () => {
      return { width: "15%" };
    }
  },
  {
    text: "Order Placed",
    dataField: "order_creation_date",
    sortable: true,
    headerStyle: () => {
      return { width: "12%" };
    }
    // right: true
  },
  {
    text: "Customer Name",
    dataField: "customername",
    sortable: true,
    headerStyle: () => {
      return { width: "14%" };
    }
    // right: true
  },
  {
    text: "Customer Email",
    dataField: "customeremail",
    sortable: true,
    headerStyle: () => {
      return { width: "16%" };
    }
    //right: true
  },
  {
    text: "Customer Phone",
    dataField: "customerphonenumber",
    sortable: true,
    headerStyle: () => {
      return { width: "13%" };
    }
    //right: true
  },
  {
    text: "Status",
    dataField: "shipement_status",
    sortable: true,
    headerStyle: () => {
      return { width: "10%" };
    }

    //right: true
  },
  {
    text: "Cargo Comapny",
    dataField: "cargo_comapny",
    sortable: true,
    headerStyle: () => {
      return { width: "13%" };
    }
  },
  {
    text: "Source",
    dataField: "shipement_from_route",
    sortable: true,
    headerStyle: () => {
      return { width: "13%" };
    }
  },
  {
    text: "Destination",
    dataField: "shipement_to_route",
    sortable: true,
    headerStyle: () => {
      return { width: "14%" };
    }
  }
  // ,
  // {
  //   text: "Cargo Status",
  //   dataField: "shipement_status",
  //   sortable: true,
  //   headerStyle: () => {
  //     return { width: "13%" };
  //   }
  // }
  ,
  {
    text: "Driver Name",
    dataField: "driver_name",
    sortable: true,
    headerStyle: () => {
      return { width: "13%" };
    }
  }
  ,
  {
    text: "Driver Rating",
    dataField: "driver_rating",
    sortable: true,
    headerStyle: () => {
      return { width: "13%" };
    }
  }
];

class CustomerAnalysis extends Component {
  constructor(props) {
    super(props)

    this.state = {
      cargos: [],
      lat: 37.338207,
      lng: -121.886330,
      zoom: 14
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


    this.setState({
      lastLocation: [{ x: "37.338207", y: "-121.886330", vehicle: "car", vehicle_no: "12345" }]
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

  renderMarker = () => {
    const lastLocation = [{ x: "37.338207", y: "-121.886330", vehicle: "car", vehicle_no: "12345" }]
   let arr
    this.state.cargos.map(cargo => { 
       arr=cargo.sensorlist 
    });
  
    return lastLocation.map(loc => {
      const icon = L.icon({
        iconUrl: iconUrl,
        iconSize: [30, 40],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76]
      });
      const position = [loc.x, loc.y];

      return (
        <Marker key={loc.vehicle} position={position} icon={icon}>
          <Popup>
            <span>{loc.vehicle_no}</span>
          </Popup>
        </Marker>
      );
    });
  };




  render() {

    const { lat, lng, zoom } = this.state;

    const selectRow = {
      mode: 'radio' // single row selection
    };
    console.log(this.state.cargos)
    return (
      <Container>
        <Container className="row" style={{ minHeight: "300px" }}>
          <Container className="col-md-6 mb-4">
            <Container className="card  chart-card">
              <Container className="chart-container large full-height">
                <ReactFC
                  {...{
                    type: 'angulargauge',
                    width: 450,
                    height: 300,
                    dataFormat: 'json',
                    containerBackgroundOpacity: "0",
                    dataEmptyMessage: "Loading Data...",
                    dataSource: {
                      "chart": {
                        "caption": "Total Shipment",
                        "subcaption": "Customer Orders",
                        "lowerLimit": "0",
                        "upperLimit": "100",
                        "theme": "fusion"
                      },
                      "colorRange": colorRange,
                      "dials": {
                        "dial": [{
                          "value": this.state.cargos.length

                        }]
                      }
                    }
                  }}
                />
              </Container>
            </Container>
          </Container>

          <Container className="col-md-6 mb-4">
            <Container className="card chart-card">
              <Container className="chart-container small full-height">
                <MapContainer center={[lat, lng]} zoom={zoom} style={{ width: "100%", height: "100%" }}>
                  <LayersControl position="topright">
                    <LayersControl.BaseLayer name="OpenStreetMap.BlackAndWhite">
                      <TileLayer
                        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                        url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
                      />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer checked={true} name="OpenStreetMap.Mapnik">
                      <TileLayer
                        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                    </LayersControl.BaseLayer>
                    {this.renderMarker()}
                  </LayersControl>
                </MapContainer>

              </Container>
            </Container>          </Container>
        </Container>
        <Container className="row" style={{ minHeight: "400px" }}>
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

export default CustomerAnalysis
