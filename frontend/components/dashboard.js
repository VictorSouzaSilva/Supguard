import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Feather, Entypo, FontAwesome } from '@expo/vector-icons';

export default function Dashboard({ navigation }) {
  return (
    <View style={stylesDashboard.container}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        initialRegion={{
          latitude: -16.3285,
          longitude: -48.9526,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
        customMapStyle={darkMapStyleDashboard}
      >
      </MapView>
      <TouchableOpacity
          style={stylesDashboard.alertButton}
          onPress={() => navigation.navigate('TelaDenuncia')}
          >
          <Entypo name="warning" size={35} color="yellow" />
        </TouchableOpacity>
      <View style={stylesDashboard.searchContainer}>
        <TextInput
          placeholder="Pesquisar"
          placeholderTextColor="#555"
          style={stylesDashboard.searchInput}
        />
        <Feather name="search" size={25} color="#333" />
      </View>
      <View style={stylesDashboard.bottomNav}>
        <TouchableOpacity style={stylesDashboard.navButton}>
          <FontAwesome name="user" size={20} color="black" />
          <Text style={stylesDashboard.navText}>Conta</Text>
        </TouchableOpacity>
        <TouchableOpacity style={stylesDashboard.navButton}>
          <Feather name="file-text" size={20} color="black" />
          <Text style={stylesDashboard.navText}>Relatório</Text>
        </TouchableOpacity>
        <TouchableOpacity style={stylesDashboard.navButton}>
          <Feather name="help-circle" size={20} color="black" />
          <Text style={stylesDashboard.navText}>Suporte</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={stylesDashboard.navButton}
          onPress={() => navigation.navigate('TelaConfigPrincipal')}
          >
          <Entypo name="cog" size={20} color="black" />
          <Text style={stylesDashboard.navText}>Config.</Text>
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
    bottom: 100, // distância da parte inferior da tela (ajuste conforme necessário)
    alignSelf: 'center', // centraliza horizontalmente
    backgroundColor: '#696969',
    borderRadius: 25,
    padding: 12,
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
    fontSize: 16,
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
    fontSize: 15,
    color: '#000',
    marginTop: 3,
  },
});
