import React from 'react';
import getVehicles from '../../services/share-now';
import getTaxis from '../../services/free-now';
import { List, WindowScroller } from 'react-virtualized';
import GoogleMapReact from 'google-map-react';
import Marker from '../../components/Marker';

const mapContainer = {
  width: 'calc(100% - 300px)',
  height: '100vh',
  position: 'absolute',
  top: 0,
  right: 0
};

const listContainerStyles = {
  width: 300,
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
    center: this.props.center
  };

  static defaultProps = {
    center: {
      lat: 53.5532316,
      lng: 10.0087783
    },
    zoom: 18
  };

  rowRenderer = ({ key, index, style }) => {
    const { taxis, vehicles } = this.state;
    const allVehicles = taxis.concat(vehicles);
    if (allVehicles[index].state) {
      return (
        <li
          onClick={() => this.handleCenterMap(allVehicles[index].coordinate)}
          key={key}
          style={{ ...style, backgroundColor: 'pink', height: 100 }}
        >
          {allVehicles[index].state}
        </li>
      );
    }
    return (
      <div key={key} style={{ ...style, backgroundColor: 'yellow', height: 100 }}>
        <li>{allVehicles[index].address}</li>
        <li>{allVehicles[index].exterior}</li>
        <li>{allVehicles[index].fuel}</li>
        <li>{allVehicles[index].interior}</li>
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
                width={300}
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
              ref={ref => {
                this.map = ref;
              }}
              bootstrapURLKeys={{ key: 'AIzaSyCzeXJiOZHF9bq0KOPFvnHZi0xHAOCfXdc' }}
              yesIWantToUseGoogleMapApiInternals
              defaultZoom={this.props.zoom}
              center={center}
            >
              {taxis.map(taxi => (
                <Marker
                  key={taxi.id}
                  lat={taxi.coordinate.latitude}
                  lng={taxi.coordinate.longitude}
                  text="My Marker"
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
