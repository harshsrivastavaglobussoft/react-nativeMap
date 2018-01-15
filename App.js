import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { MapView } from 'expo';

export const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
        }
    };
    this.onRegionChange = this.onRegionChange.bind(this)
  }

  onRegionChange(region) {
    this.setState({ region });
  }
  componentDidMount() {
      this.watchID = navigator.geolocation.watchPosition((position) => {

        let region = {
          latitude:       position.coords.latitude,
          longitude:      position.coords.longitude,
          latitudeDelta:  LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        }
        this.onRegionChange(region, region.latitude, region.longitude);
      });
    }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }
  render() {
  return (
   <View style={styles.container}>
      <MapView
       style = {styles.mapview}
       region={this.state.region}
       onRegionChange={this.onRegionChange}
       showsUserLocation={true}
       followUserLocation={true}
       >
     </MapView>

  </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapview: {
    width:'100%',
    height:'100%',
  },
});
