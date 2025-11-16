import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker, Heatmap, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather, Entypo, FontAwesome } from '@expo/vector-icons';
import api from './config/api';

export default function Dashboard({ navigation }) {
  const mapRef = useRef(null);
  const [heatPoints, setHeatPoints] = useState([]);

  const clamp = (value, min, max) => Math.max(min, Math.min(value, max));

  const MIN_LAT = -16.6;
  const MAX_LAT = -16.1;
  const MIN_LON = -49.2;
  const MAX_LON = -48.8;

  const MIN_DELTA = 0.005; 
  const MAX_DELTA = 0.15;  

  function handleRegionChangeComplete(region) {
    const lat = clamp(region.latitude, MIN_LAT, MAX_LAT);
    const lon = clamp(region.longitude, MIN_LON, MAX_LON);
    const latDelta = clamp(region.latitudeDelta, MIN_DELTA, MAX_DELTA);
    const lonDelta = clamp(region.longitudeDelta, MIN_DELTA, MAX_DELTA);

    if (
      lat !== region.latitude || lon !== region.longitude ||
      latDelta !== region.latitudeDelta || lonDelta !== region.longitudeDelta
    ) {
      mapRef.current?.animateToRegion(
        {
          latitude: lat,
          longitude: lon,
          latitudeDelta: latDelta,
          longitudeDelta: lonDelta,
        },
        300
      );
    }
  }

  useEffect(() => {
    async function carregarIncidentes() {
      try {
        const incidentes = await api.listarIncidentes();

        const pontos = (incidentes || [])
          .map((inc) => {
            const latitude = inc.latitude ?? inc.lat ?? inc.latituded;
            const longitude = inc.longitude ?? inc.lon ?? inc.longituded;

            let weight = 1;
            if (inc.status === 'validado') weight = 1.3;
            if (inc.tipo === 'Homicídio' || inc.tipo === 'homicidio') weight = 2;
            if (inc.tipo === 'Assalto' || inc.tipo === 'assalto') weight = 1.5;

            return { latitude, longitude, weight };
          })
          .filter(
            (p) =>
              typeof p.latitude === 'number' &&
              typeof p.longitude === 'number' &&
              !Number.isNaN(p.latitude) &&
              !Number.isNaN(p.longitude)
          );

        setHeatPoints(pontos);
      } catch (err) {
        console.error('Erro ao carregar incidentes para o mapa de calor:', err);
      }
    }

    carregarIncidentes();
  }, []);

  return (
    <View style={stylesDashboard.container}>
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFillObject}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: -16.3285,
          longitude: -48.9526,
          latitudeDelta: 0.06,
          longitudeDelta: 0.06,
        }}
        customMapStyle={darkMapStyleDashboard}
        onRegionChangeComplete={handleRegionChangeComplete}
      >
        {heatPoints.length > 0 && (
          <Heatmap
            points={heatPoints}
            radius={40}
            opacity={0.7}
            gradient={{
              colors: ['#00BCD4', '#4CAF50', '#FFEB3B', '#FF9800', '#F44336'],
              startPoints: [0.01, 0.25, 0.5, 0.75, 1],
              colorMapSize: 256,
            }}
          />
        )}
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
    elementType: 'geometry',
    stylers: [{ color: '#000000' }],
  },
  {
    elementType: 'labels.icon',
    stylers: [{ visibility: 'off' }],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [{ color: '#ffffff' }],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#000000' }],
  },
  {
    featureType: 'administrative',
    elementType: 'geometry',
    stylers: [{ color: '#444444' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#333333' }],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#ffffff' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#111111' }],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [{ color: '#222222' }],
  },
];

const stylesDashboard = StyleSheet.create({
  container: {
    flex: 1,
  },
  alertButton: {
    position: 'absolute',
    bottom: 100, 
    alignSelf: 'center',
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
