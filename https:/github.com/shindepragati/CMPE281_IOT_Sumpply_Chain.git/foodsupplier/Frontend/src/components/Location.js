import L from 'leaflet';

export const Location = L.icon({
  iconUrl: require('../assets/images/venue_location_icon.svg'),
  iconRetinaUrl: require('../assets/images/venue_location_icon.svg'),
  iconAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [35, 35],
  className: 'leaflet-venue-icon'
});