import React, { Component } from "react";
import { Map, TileLayer, Marker, Popup, LayersControl } from "react-leaflet";
import L from "leaflet";
import CargoServices from '../services/CargoServices'
import axios from "axios";

import iconUrl from "../assets/images/marker-icon.png";
import 'react-splitter-layout/lib/index.css';
import cargoimg from '../assets/images/cargo.png';
import "leaflet/dist/leaflet.css";

export default class DashboadMap extends Component {
    state = {
        lat: 37.338207,
        lng: -121.886330,
        zoom: 14,
        lastLocation: [],
        cargo: []
    };

    componentDidMount() {
        console.log(this.state.id)
        // CargoServices.getCargoById(this.state.id).then(res => {
        //     this.setState({ cargo: res.data });
        // })

        CargoServices.getCargos().then((res) => {
            this.setState({ cargo: res.data });
        });

        this.setState({
            lastLocation: [{ x: "37.338207", y: "-121.886330", vehicle: "car", vehicle_no: "12345" }]
        });

    }
    renderMarker = () => {
        const { lastLocation } = this.state;

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
        console.log(this.state.cargos);

        const { lat, lng, zoom } = this.state;
        return (
            <div >
                <div style={{float:'left'}}>
                    <h3 className="text-center"> View Cargo Details</h3>

                    <div >
                        <div className="row">
                            <div className="logo">
                                <img src={cargoimg} width="400" height="150" />
                            </div>
                        </div>
<br></br>
                        <div className="card col-md-7 offset-md-3">

                            {this.state.cargo.map((cargo, id) =>

                                <div key={cargo.snmid}>
                                    <div className="row">
                                        <label> Cargo ID: </label>
                                        <div> {cargo.snmid}</div>
                                    </div>
                                    <div className="row">
                                        <label> Sensors TYPE: </label>
                                        <div> {cargo.SENSORS.TYPE}</div>
                                    </div>
                                    <div className="row">
                                        <label> Sensors Status: </label>
                                        <div> {cargo.SENSORS.STATUS}</div>
                                    </div>
                                    <div className="row">
                                        <label>Sensors Reading: </label>
                                        <div> {cargo.SENSORS.DATA}</div>
                                    </div>
                                    <div className="row">
                                        <label> Sensor Node Provider: </label>
                                        <div> {cargo.SNM_INFO.SERVICE}</div>
                                    </div>
                                    <div className="row">
                                        <label> Sensor Node Owner: </label>
                                        <div> {cargo.SNM_INFO.OWNER}</div>
                                    </div>
                                    <div className="row">
                                        <label> Sensor Node Address: </label>
                                        <div> {cargo.SNM_INFO.REGISTER_ADDRESS}</div>
                                    </div>
                                </div>

                            )
                            }
                        </div>

                    </div>
                </div >
               
                <div className="row" style={{ height: `590px`, width: `600px` ,float:'right'}} >
                    {/* <button onClick={() => window.location.reload(false)}>Click to reload!</button>
 */}

                    <Map center={[lat, lng]} zoom={zoom} style={{ width: "100%", height: "100%" }}>
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
                    </Map>
                </div>

            </div>

        );
    }
}
