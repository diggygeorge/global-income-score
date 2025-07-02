import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
const mapskey = import.meta.env.VITE_GOOGLE_API_KEY;


const containerStyle = {
  overflow: 'hidden',
  borderRadius: '70px',
  width: '100%',
  height: '100%',
};

const center = {
  lat: 37.7749,
  lng: -122.4194,
};

const GoogleMapsSection: React.FC = () => {
  return (
    <LoadScript googleMapsApiKey={mapskey}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapsSection;
