import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

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
    <LoadScript googleMapsApiKey={'AIzaSyC5XMc70ijzyKw1u0FQLVBLQ2jgZZV4lwo'}>
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
