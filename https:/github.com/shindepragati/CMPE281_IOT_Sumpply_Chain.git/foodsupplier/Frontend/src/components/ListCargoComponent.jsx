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
import ReactFC from "react-fusioncharts";
import "./charts-theme";

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
    text: "Type",
    dataField: "cargo_type",
    sortable: true,
    headerStyle: () => {
      return { width: "8%" };
    }
  },
  {
    text: "Source",
    dataField: "shipement_from_route",
    sortable: true,
    headerStyle: () => {
      return { width: "7%" };
    }
  },
  {
    text: "Destination",
    dataField: "shipement_to_route",
    sortable: true,
    headerStyle: () => {
      return { width: "7%" };
    }
  },
  {
    text: "Status",
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
  }

];

class ListCargoComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      cargos: [],
      lat: 37.338207,
      lng: -121.886330,
      zoom: 14
    }
   

  }


  trackCargo(id) {
    console.log("cargois in list" + id)
    this.props.history.push(`/dashboard/${id}`);
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
        <Container className="row" style={{ minHeight: "15px" }}></Container>
          <Container className="row" style={{ minHeight: "700px" }}>
            <Container className="col-md-7 mb-4">
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

            <Container className="col-md-5 mb-4" style={{ minHeight: "400px" }} >
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
              </Container>
            </Container>
          </Container>
        </Container>
        
      
   )
  }
}

export default ListCargoComponent
