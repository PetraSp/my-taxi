import React from 'react';
import getVehicles from '../../services/share-now';
import getTaxis from '../../services/free-now';
import { List } from 'react-virtualized';

class VehicleList extends React.Component {
  state = {
    taxis: [],
    vehicles: []
  };

  rowRenderer = ({ key, index }) => {
    const { taxis, vehicles } = this.state;
    const allVehicles = taxis.concat(vehicles);
    console.log(allVehicles);
    if (allVehicles[index].state) {
      return (
        <li key={key} style={{ backgroundColor: 'pink', height: 100 }}>
          {allVehicles[index].state}
        </li>
      );
    }
    return (
      <div key={key} style={{ backgroundColor: 'yellow', height: 100 }}>
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
        // handle success
        console.log(response);
        this.setState({
          vehicles: response.data.placemarks
        });
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
    getTaxis()
      .then(response => {
        // handle success
        console.log(response);
        this.setState({
          taxis: response.data.poiList
        });
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  }

  render() {
    const { taxis, vehicles } = this.state;
    return (
      <>
        {taxis.length > 0 && vehicles.length > 0 && (
          <List
            width={300}
            height={500}
            rowCount={taxis.length + vehicles.length}
            rowHeight={100}
            rowRenderer={this.rowRenderer}
            overscanRowCount={5}
          />
        )}
        {taxis.length === 0 && vehicles.length === 0 && <span>Loading</span>}
      </>
    );
  }
}

export default VehicleList;
