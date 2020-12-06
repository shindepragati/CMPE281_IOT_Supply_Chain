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
import { Button, Modal } from "react-bootstrap";

import iconUrl from "../assets/images/marker-icon.png";
import 'react-splitter-layout/lib/index.css';
import "leaflet/dist/leaflet.css";
// fusioncharts
import "./charts-theme";
import CreateCargoComponent from "./CreateCargoComponent"
const columns = [

  {

    text: "Order ID",
    dataField: "orderid",
    sortable: true,
    headerStyle: () => {
      return { width: "18%" };
    }
  },
  {
    text: "Customer Name",
    dataField: "customername",
    sortable: true,
    headerStyle: () => {
      return { width: "11%" };
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
      return { width: "16%" };
    }
    //right: true
  },
  {
    text: "Status",
    dataField: "shipement_status",
    sortable: true,
    headerStyle: () => {
      return { width: "9%" };
    }

    //right: true
  },
  {
    text: "Truck No",
    dataField: "cargoid",
    sortable: true,
    headerStyle: () => {
      return { width: "7%" };
    }
  }
  // ,
  // {
  //   text: "Actions",
  //   dataField: "action",
  //   isDummyField: true,
  //   headerStyle: () => {
  //     return { width: "26%" };
  //   }
  //   ,
  //   formatter: rankFormatter
  //   //right: true
  // }

];

// function rankFormatter(cell, row, rowIndex, formatExtraData) {

//   return (
//     <div class="btn-toolbar"> 
//       {/* <button className="btn btn-success" onClick={updatecargo(row)}>Update</button>
//       <button className="btn btn-danger" onClick={deleteCargo(row.cargoid)}>Delete</button> */}
//                        </div>
//   )

// }

 function updatecargo(cargo) {

      }
  function deleteCargo(id) {
        CargoServices.deleteMasterCargo(id).then(res => {
          this.setState({ cargos: this.state.cargos.filter(cargo => cargo.cargoid !== id) });
        });
  }
class ListCargoComponent extends Component {
        constructor(props) {
        super(props)

    this.state = {
        show: false,
      cargos: [],
      lat: 37.338207,
      lng: -121.886330,
      zoom: 14
    }


  }
  handleClose = () => {
        this.setState({
          show: false,
        });
  };

  handleShow = () => {
        this.setState({
          show: true,
        });
  };



  componentDidMount() {
        CargoServices.getMasterCargos().then((res) => {
          this.setState({ cargos: res.data });
          console.log("**" + this.state.cargos)
        });


    this.setState({
        lastLocation: [{ x: "37.338207", y: "-121.886330", vehicle: "car", vehicle_no: "12345" }]
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

    const { lat, lng, zoom} = this.state;

    const selectRow = {
        mode: 'radio' // single row selection
    };
    console.log(this.state.cargos)
    return (
      <Container>
        <button className="btn btn-info" onClick={this.handleShow}>New Shipment</button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>New Shipement</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CreateCargoComponent />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.signUp}>
              Sign up
            </Button>
          </Modal.Footer>
        </Modal>


        <Container className="row" style={{ minHeight: "600px" }}>
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
