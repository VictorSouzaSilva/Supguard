import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { AntDesign, Feather, Entypo, FontAwesome } from '@expo/vector-icons';

export default function Dashboard({ navigation }) {
  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        initialRegion={{
          latitude: -16.3285,
          longitude: -48.9526,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
        customMapStyle={darkMapStyle}
      >
      </MapView>
      <TouchableOpacity
          style={styles.alertButton}
          onPress={() => navigation.navigate('TelaDenuncia')}
          >
          <Entypo name="warning" size={28} color="white" />
        </TouchableOpacity>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Pesquisar"
          placeholderTextColor="#555"
          style={styles.searchInput}
        />
        <Feather name="search" size={20} color="#333" />
      </View>
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton}>
          <FontAwesome name="user" size={20} color="black" />
          <Text style={styles.navText}>Conta</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <AntDesign name="filetext1" size={20} color="black" />
          <Text style={styles.navText}>Relatório</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Feather name="help-circle" size={20} color="black" />
          <Text style={styles.navText}>Suporte</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => navigation.navigate('TelaConfigPrincipal')}
          >
          <Entypo name="cog" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const darkMapStyleDashboard = [
    {
      "elementType": "geometry",
      "stylers": [{ "color": "#000000" }]
    },
    {
      "elementType": "labels.icon",
      "stylers": [{ "visibility": "off" }]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [{ "color": "#ffffff" }]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [{ "color": "#000000" }]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers": [{ "color": "#444444" }]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [{ "color": "#333333" }]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [{ "color": "#ffffff" }]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [{ "color": "#111111" }]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [{ "color": "#222222" }]
    }
  ];
  

const stylesDashboard = StyleSheet.create({
  container: {
    flex: 1,
  },
  alertButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: '#ff1c1c',
    borderRadius: 25,
    padding: 10,
    zIndex: 2,
  },
  searchContainer: {
    position: 'absolute',
    top: 50,
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: '#f4c900',
    borderRadius: 20,
    alignItems: 'center',
    paddingHorizontal: 15,
    width: 250,
    height: 40,
    zIndex: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    marginRight: 10,
    color: '#000',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    backgroundColor: '#f4c900',
    width: '100%',
    paddingVertical: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  navButton: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#000',
    marginTop: 3,
  },
});
