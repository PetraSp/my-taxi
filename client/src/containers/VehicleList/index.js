import React from 'react';
import getVehicles from '../../services/share-now';
import getTaxis from '../../services/free-now';
import { List, WindowScroller } from 'react-virtualized';
import GoogleMapReact from 'google-map-react';
import Marker from '../../components/Marker';
import isActive from '../../utils/vehicles';

const DEFAULT_ZOOM = 18;
const API_KEY = 'AIzaSyCzeXJiOZHF9bq0KOPFvnHZi0xHAOCfXdc';

const mapContainer = {
  width: 'calc(100% - 400px)',
  height: '100vh',
  position: 'absolute',
  top: 0,
  right: 0
};

const listContainerStyles = {
  width: 400,
  height: '100vh',
  backgroundColor: 'grey',
  position: 'relative',
  left: 0,
  top: 0,
  zIndex: 1000
};

class VehicleList extends React.Component {
  state = {
    taxis: [],
    vehicles: [],
    center: {
      lat: 53.5532316,
      lng: 10.0087783
    }
  };

  rowRenderer = ({ key, index, style }) => {
    const { taxis, vehicles } = this.state;
    const allVehicles = taxis.concat(vehicles);
    if (allVehicles[index].state) {
      return (
        <div
          onClick={() => this.handleCenterMap(allVehicles[index].coordinate)}
          key={key}
          style={{
            ...style,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 100,
            borderBottom: '1px solid lightgrey',
            backgroundColor: isActive(allVehicles[index].state) ? 'green' : 'red',
            color: 'white'
          }}
        >
          Taxi {allVehicles[index].state}
        </div>
      );
    }
    const vehicleLatitude = allVehicles[index].coordinates[1];
    const vehicleLongitude = allVehicles[index].coordinates[0];
    const vehicleCoordinates = { latitude: vehicleLatitude, longitude: vehicleLongitude };

    return (
      <div
        onClick={() => this.handleCenterMap(vehicleCoordinates)}
        key={key}
        style={{
          ...style,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          backgroundColor: 'white',
          height: 100,
          lineHeight: '15px',
          padding: 10,
          fontSize: 14,
          borderBottom: '1px solid lightgrey'
        }}
      >
        <span>Address: {allVehicles[index].address}</span>
        <p>
          <span style={{ paddingRight: 10 }}>Exterior: {allVehicles[index].exterior}</span>
          <span>Interior: {allVehicles[index].interior}</span>
        </p>
        <span>Fuel: {allVehicles[index].fuel} %</span>
      </div>
    );
  };

  componentDidMount() {
    getVehicles()
      .then(response => {
        this.setState({
          vehicles: response.data.placemarks
        });
      })
      .catch(function(error) {
        console.log(error);
      });
    getTaxis()
      .then(response => {
        this.setState({
          taxis: response.data.poiList
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  handleCenterMap = coordinate => {
    this.setState({
      center: {
        lat: coordinate.latitude,
        lng: coordinate.longitude
      }
    });
  };

  render() {
    const { taxis, vehicles, center } = this.state;
    return (
      <>
        <div style={listContainerStyles}>
          <WindowScroller>
            {({ height }) => (
              <List
                width={400}
                height={height}
                rowCount={taxis.length + vehicles.length}
                rowHeight={100}
                rowRenderer={this.rowRenderer}
                overscanRowCount={20}
              />
            )}
          </WindowScroller>
          {taxis.length === 0 && vehicles.length === 0 && <span>Loading</span>}
        </div>
        <div style={mapContainer}>
          {taxis.length > 0 && vehicles.length > 0 && (
            <GoogleMapReact
              bootstrapURLKeys={{ key: API_KEY }}
              yesIWantToUseGoogleMapApiInternals
              defaultZoom={DEFAULT_ZOOM}
              center={center}
            >
              {taxis.map(taxi => (
                <Marker
                  iconName="taxi"
                  iconColor={isActive(taxi.state) ? 'green' : 'red'}
                  key={taxi.id}
                  lat={taxi.coordinate.latitude}
                  lng={taxi.coordinate.longitude}
                />
              ))}

              {vehicles.map(vehicle => (
                <Marker
                  iconName="car"
                  key={vehicle.id}
                  lat={vehicle.coordinates[1]}
                  lng={vehicle.coordinates[0]}
                />
              ))}
            </GoogleMapReact>
          )}
        </div>
      </>
    );
  }
}

export default VehicleList;
