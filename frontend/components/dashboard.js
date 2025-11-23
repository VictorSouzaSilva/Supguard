import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Modal, ScrollView } from 'react-native';
import MapView, { Heatmap, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather, Entypo, FontAwesome } from '@expo/vector-icons';
import api from './config/api';           
import incidentesMock from '../incidentesMock';

const categoriasLeves = ["Vandalismo", "Corrida Clandestina"];
const categoriasMedias = ["Agressão física", "Acidente de trânsito", "Arrombamento"];
const categoriasGraves = ["Assalto", "Homicídio", "Estupro / abuso Sexual", "Disparo de arma de fogo", "Tráfico"];

const ruasAnapolis = [
  "Avenida Brasil",
  "Avenida Getúlio Vargas",
  "Avenida Padrão",
  "Rua 1",
  "Rua 2",
  "Rua 3",
  "Rua 4",
  "Rua 5",
  "Avenida Araguaia",
  "Avenida Goiás",
  "Avenida Tocantins",
  "Rua 10",
  "Rua 12",
];

const bairrosAnapolis = [
  "Centro",
  "Jaiara",
  "Vila Americana",
  "Califórnia",
  "Vila Bela",
  "Bairro Industrial",
  "Itaguari",
  "Santo Antônio",
  "Vila Esperança",
  "Parque Atalaia",
  "Vila Mariana",
  "Goiás Velho",
];

function getIntensidade(tipo) {
  if (categoriasLeves.includes(tipo)) return 0.5;     
  if (categoriasMedias.includes(tipo)) return 1.0;    
  if (categoriasGraves.includes(tipo)) return 2.0;    
  return 1.0;
}

function getHeatmapPoints(incidentes) {
  return incidentes
    .map((item) => {
      const latitude = item.latitude ?? item.lat;
      const longitude = item.longitude ?? item.lon;
      return {
        latitude,
        longitude,
        weight: getIntensidade(item.tipo),
        tipo: item.tipo ?? item.type ?? '',
      };
    })
    .filter(
      (p) =>
        typeof p.latitude === 'number' &&
        typeof p.longitude === 'number' &&
        !Number.isNaN(p.latitude) &&
        !Number.isNaN(p.longitude)
    );
}

// Retorna cor do marcador conforme severidade
function getMarkerColor(tipo) {
  if (categoriasLeves.includes(tipo)) return '#FFEB3B';
  if (categoriasMedias.includes(tipo)) return '#FF9800';
  if (categoriasGraves.includes(tipo)) return '#F44336';
  return '#9E9E9E';
}

export default function Dashboard({ navigation }) {
  const mapRef = useRef(null);
  const [heatLeves, setHeatLeves] = useState([]);
  const [heatMedias, setHeatMedias] = useState([]);
  const [heatGraves, setHeatGraves] = useState([]);
  const [incidentes, setIncidentes] = useState([]);
  const [selectedIncidente, setSelectedIncidente] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredIncidentes, setFilteredIncidentes] = useState([]);

  const clamp = (value, min, max) => Math.max(min, Math.min(value, max));

  const MIN_LAT = -16.6;
  const MAX_LAT = -16.1;
  const MIN_LON = -49.2;
  const MAX_LON = -48.8;

  const MIN_DELTA = 0.005; 
  const MAX_DELTA = 0.15;  

  const handleSearchChange = (text) => {
    setSearchText(text);
    
    if (text.trim().length === 0) {
      setSearchSuggestions([]);
      setShowSuggestions(false);
      setFilteredIncidentes([]);
      return;
    }

    const lowerText = text.toLowerCase();
    const suggestions = [];

    const tiposUnicos = [...new Set(incidentes.map(inc => inc.tipo))];
    tiposUnicos.forEach(tipo => {
      if (tipo.toLowerCase().includes(lowerText)) {
        suggestions.push({ type: 'tipo', label: tipo, value: tipo });
      }
    });

    ruasAnapolis.forEach(rua => {
      if (rua.toLowerCase().includes(lowerText)) {
        suggestions.push({ type: 'rua', label: rua, value: rua });
      }
    });

    bairrosAnapolis.forEach(bairro => {
      if (bairro.toLowerCase().includes(lowerText)) {
        suggestions.push({ type: 'bairro', label: bairro, value: bairro });
      }
    });

    setSearchSuggestions(suggestions);
    setShowSuggestions(suggestions.length > 0);
  };

  const handleSuggestionPress = (suggestion) => {
    const filtered = incidentes.filter(inc => {
      if (suggestion.type === 'tipo') {
        return inc.tipo === suggestion.value;
      }
      return true;
    });

    setFilteredIncidentes(filtered);
    setSearchText(suggestion.label);
    setShowSuggestions(false);

    if (filtered.length > 0) {
      const first = filtered[0];
      mapRef.current?.animateToRegion(
        {
          latitude: first.latitude ?? first.lat,
          longitude: first.longitude ?? first.lon,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        },
        500
      );
    }
  };

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
        let incidentesList = [...incidentesMock]; 
        let usouAPI = false;

        try {
          const response = await api.listarIncidentes();
          if (response && Array.isArray(response) && response.length > 0) {
            incidentesList = [...response, ...incidentesMock];
            usouAPI = true;
            console.log('✅ Incidentes carregados: API + Mock (' + response.length + ' da API)');
          }
        } catch (apiErr) {
          console.log('⚠️ API indisponível, usando mock:', apiErr.message);
        }

        console.log('📥 Total recebidos (antes dedupe):', incidentesList.length);

        const seenIds = new Set();
        const uniqueIncidentes = incidentesList.filter(inc => {
          const id = inc.id;
          if (seenIds.has(id)) return false;
          seenIds.add(id);
          return true;
        }).map((inc, idx) => ({
          ...inc,
          _uniqueKey: `${inc.id}_${idx}_${Math.random()}`
        }));

        console.log('📌 Total únicos (após dedupe):', uniqueIncidentes.length);

        const pontos = getHeatmapPoints(uniqueIncidentes);
        console.log('📍 Total de pontos no mapa:', pontos.length);

        const leves = pontos.filter((p) => categoriasLeves.includes((p.tipo || '').toString()));
        const medias = pontos.filter((p) => categoriasMedias.includes((p.tipo || '').toString()));
        const graves = pontos.filter((p) => categoriasGraves.includes((p.tipo || '').toString()));

        setIncidentes(uniqueIncidentes);
        setHeatLeves(leves);
        setHeatMedias(medias);
        setHeatGraves(graves);
      } catch (err) {
        console.error('❌ Erro ao processar incidentes:', err);
        const pontos = getHeatmapPoints(incidentesMock);
        console.log('📍 Usando fallback do mock:', pontos.length, 'pontos');

        const leves = pontos.filter((p) => categoriasLeves.includes((p.tipo || '').toString()));
        const medias = pontos.filter((p) => categoriasMedias.includes((p.tipo || '').toString()));
        const graves = pontos.filter((p) => categoriasGraves.includes((p.tipo || '').toString()));

        const mockWithKeys = incidentesMock.map((inc, idx) => ({
          ...inc,
          _uniqueKey: `${inc.id}_${idx}`
        }));

        setIncidentes(mockWithKeys);
        setHeatLeves(leves);
        setHeatMedias(medias);
        setHeatGraves(graves);
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
        {/* Heatmap por severidade: leves (amarelo), medias (laranja), graves (vermelho) */}
        {heatLeves.length > 0 && (
          <Heatmap
            points={heatLeves}
            radius={20}
            opacity={0.7}
            gradient={{
              colors: ['#FFEB3B', '#FFEB3B'],
              startPoints: [0.01, 1],
              colorMapSize: 256,
            }}
          />
        )}

        {heatMedias.length > 0 && (
          <Heatmap
            points={heatMedias}
            radius={25}
            opacity={0.75}
            gradient={{
              colors: ['#FF9800', '#FF9800'],
              startPoints: [0.01, 1],
              colorMapSize: 256,
            }}
          />
        )}

        {heatGraves.length > 0 && (
          <Heatmap
            points={heatGraves}
            radius={30}
            opacity={0.8}
            gradient={{
              colors: ['#F44336', '#F44336'],
              startPoints: [0.01, 1],
              colorMapSize: 256,
            }}
          />
        )}

        {/* Marcadores clicáveis para cada incidente */}
        {(filteredIncidentes.length > 0 ? filteredIncidentes : incidentes).map((inc) => (
          <Marker
            key={inc._uniqueKey}
            coordinate={{
              latitude: inc.latitude ?? inc.lat,
              longitude: inc.longitude ?? inc.lon,
            }}
            pinColor={getMarkerColor(inc.tipo)}
            onPress={() => {
              setSelectedIncidente(inc);
              setModalVisible(true);
            }}
          />
        ))}
      </MapView>

      {/* Modal com informações do incidente */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={stylesDashboard.modalOverlay}>
          <View style={stylesDashboard.modalContent}>
            <TouchableOpacity
              style={stylesDashboard.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Feather name="x" size={24} color="#fff" />
            </TouchableOpacity>

            {selectedIncidente && (
              <ScrollView>
                <Text style={stylesDashboard.modalTitle}>{selectedIncidente.tipo}</Text>
                
                <View style={stylesDashboard.modalSection}>
                  <Text style={stylesDashboard.modalLabel}>Status:</Text>
                  <Text style={[
                    stylesDashboard.modalValue,
                    {
                      color: selectedIncidente.status === 'validado' ? '#4CAF50' :
                             selectedIncidente.status === 'pendente' ? '#FF9800' : '#2196F3'
                    }
                  ]}>
                    {selectedIncidente.status.charAt(0).toUpperCase() + selectedIncidente.status.slice(1)}
                  </Text>
                </View>

                <View style={stylesDashboard.modalSection}>
                  <Text style={stylesDashboard.modalLabel}>Data/Hora:</Text>
                  <Text style={stylesDashboard.modalValue}>
                    {new Date(selectedIncidente.dataHora).toLocaleString('pt-BR')}
                  </Text>
                </View>

                <View style={stylesDashboard.modalSection}>
                  <Text style={stylesDashboard.modalLabel}>Descrição:</Text>
                  <Text style={stylesDashboard.modalValue}>{selectedIncidente.descricao}</Text>
                </View>

                <View style={stylesDashboard.modalSection}>
                  <Text style={stylesDashboard.modalLabel}>Localização:</Text>
                  <Text style={stylesDashboard.modalValue}>
                    {selectedIncidente.latitude?.toFixed(4)}, {selectedIncidente.longitude?.toFixed(4)}
                  </Text>
                </View>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        style={stylesDashboard.alertButton}
        onPress={() => navigation.navigate('TelaDenuncia')}
      >
        <Entypo name="warning" size={35} color="yellow" />
      </TouchableOpacity>

      <View style={stylesDashboard.searchContainer}>
        <TextInput
          placeholder="Pesquisar tipos, ruas, bairros"
          placeholderTextColor="#555"
          style={stylesDashboard.searchInput}
          value={searchText}
          onChangeText={handleSearchChange}
          onFocus={() => searchText.length > 0 && setShowSuggestions(true)}
        />
        <Feather name="search" size={25} color="#333" />
      </View>

      {/* Dropdown de sugestões de pesquisa */}
      {showSuggestions && searchSuggestions.length > 0 && (
        <View style={stylesDashboard.suggestionsDropdown}>
          <ScrollView nestedScrollEnabled={true} style={{ maxHeight: 200 }}>
            {searchSuggestions.map((suggestion, idx) => (
              <TouchableOpacity
                key={idx}
                style={stylesDashboard.suggestionItem}
                onPress={() => handleSuggestionPress(suggestion)}
              >
                <Feather
                  name={
                    suggestion.type === 'tipo' ? 'alert-circle' :
                    suggestion.type === 'rua' ? 'map-pin' : 'home'
                  }
                  size={16}
                  color="#666"
                  style={{ marginRight: 10 }}
                />
                <View style={{ flex: 1 }}>
                  <Text style={stylesDashboard.suggestionText}>{suggestion.label}</Text>
                  <Text style={stylesDashboard.suggestionType}>
                    {suggestion.type === 'tipo' ? 'Tipo de incidente' :
                     suggestion.type === 'rua' ? 'Rua' : 'Bairro'}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#222',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 30,
    maxHeight: '70%',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 8,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  modalSection: {
    marginBottom: 15,
  },
  modalLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#999',
    marginBottom: 4,
  },
  modalValue: {
    fontSize: 14,
    color: '#fff',
    lineHeight: 20,
  },
  suggestionsDropdown: {
    position: 'absolute',
    top: 95,
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    width: 250,
    maxHeight: 250,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 3,
    overflow: 'hidden',
  },
  suggestionItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    alignItems: 'center',
  },
  suggestionText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  suggestionType: {
    fontSize: 11,
    color: '#999',
    marginTop: 2,
  },
});

