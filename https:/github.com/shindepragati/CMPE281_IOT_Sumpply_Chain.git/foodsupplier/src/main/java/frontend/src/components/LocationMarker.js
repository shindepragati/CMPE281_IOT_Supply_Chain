import React, { Fragment } from 'react'
import {Marker} from 'react-leaflet';
import {Location} from './Location';
import MarkerPopup from './MarkerPopup';

const LocationMarker = (props) => {
  const { venues } = props.data;

  console.log(venues)
  const markers = venues.map((venue, index) => (
    <Marker key={index} position={venue.geometry} icon={Location} >
      <MarkerPopup data={venue}/>
    </Marker>
  ));

  return <Fragment>{markers}</Fragment>
};

export default LocationMarker;
