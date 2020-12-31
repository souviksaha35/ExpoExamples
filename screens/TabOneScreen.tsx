import React, {useState} from 'react';
import { Animated, Image, Dimensions, StyleSheet, Text, TouchableNativeFeedbackBase } from 'react-native';
import {View} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline, AnimatedRegion } from "react-native-maps";
import EditScreenInfo from '../components/EditScreenInfo';
import haversine from "haversine";
const LATITUDE = 27.2046;
const LONGITUDE = 77.4977;
const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;

export default class TabOneScreen extends React.Component {
  state = {
    latitude: LATITUDE,
    longitude: LONGITUDE,
    error: null,

    distanceTravelled: 0,
    routeCoordinates: [],

    prevLatLng: {},
    coordinate: new AnimatedRegion({
      latitude: LATITUDE,
      longitude: LONGITUDE,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    })
  };

  componentDidMount() {

    const { coordinate } = this.state;

    navigator.geolocation.getCurrentPosition( position => {
      console.log(position);

      this.setState({
        latitude: position.coords.latitude,

        longitude: position.coords.longitude,

        error: null,

      });
    }, error => this.setState({ error: error.message }), { enableHighAccuracy: true, timeout: 200000, maximumAge: 1000 });

    navigator.geolocation.watchPosition(position => {
      console.log(position);

      const { latitude, longitude } = position.coords;
      const { routeCoordinates, distanceTravelled } = this.state;

      const newCoordinate = { latitude, longitude };

      this.setState({ latitude, longitude, routeCoordinates: routeCoordinates.concat([newCoordinate]), distanceTravelled: distanceTravelled +  this.calcDistance(newCoordinate), prevLatLng: newCoordinate});

    }, error => console.log(error), { enableHighAccuracy: true, timeout: 200000, });
  }

  componentWillMount() {
    this.index = 0;
    this.animation = new Animated.Value(0);
  }

  calcDistance = newLatLng => {
    const { prevLatLng } = this.state;
    return haversine(prevLatLng, newLatLng) || 0;
  };

  getMapRegion = () => ({
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  });

  // componentWillUnmount() {
  //   navigator.geolocation.clearWatch(this.watchID)
  // }


  render() {
    return (
      <View style={styles.container}>
        
        <MapView
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        loadingEnabled
        showsMyLocationButton={true}
        style={{ ...StyleSheet.absoluteFillObject }}
        region={this.getMapRegion()}>
          <Polyline coordinates={this.state.routeCoordinates} strokeWidth={5}/>
          <Marker coordinate={this.getMapRegion()}>
            <Image source={require("../assets/images/available_car.png")} style={{ height: 40, width: 40,}}/>
          </Marker>
        </MapView>

        <View style={styles.distanceContainer}>
          <Text>
          {this.state.distanceTravelled}km
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },

  distanceContainer: {
    flexDirection: 'row',
    
    backgroundColor: "transparent"
  }
});
