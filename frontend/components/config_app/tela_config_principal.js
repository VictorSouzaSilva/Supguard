import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import Slider from '@react-native-community/slider';
import { Ionicons } from '@expo/vector-icons';

export default function TelaConfigPrincipal({ navigation }) {
  const [range, setRange] = useState(10);

  return (
    <SafeAreaView style={stylesTelaConfigPrincipal.container}>
      <View style={stylesTelaConfigPrincipal.header}>
        <TouchableOpacity 
          style={stylesTelaConfigPrincipal.backIcon}
          onPress={() => navigation.navigate('Dashboard')} >
          <Ionicons name="arrow-back" size={24} color="yellow" />
        </TouchableOpacity>
        <Text style={stylesTelaConfigPrincipal.headerTitle}>CONFIGURAÇÕES{"\n"}DO APLICATIVO</Text>
      </View>

      <View style={stylesTelaConfigPrincipal.content}>
        <TouchableOpacity 
          style={stylesTelaConfigPrincipal.option}
          onPress={() => navigation.navigate('TelaConfigNotificacoes')}
        >
          <Text style={stylesTelaConfigPrincipal.optionText}>Notificações</Text>
          <Text style={stylesTelaConfigPrincipal.arrow}>→</Text>
        </TouchableOpacity>

        <View style={stylesTelaConfigPrincipal.divider} />

        <View style={stylesTelaConfigPrincipal.sliderContainer}>
          <Text style={stylesTelaConfigPrincipal.optionText}>Raio de Alcance</Text>
          <Text style={stylesTelaConfigPrincipal.rangeValue}>{range} Km</Text>
        </View>

        <Slider
          style={{ width: '100%', height: 40 }}
          minimumValue={1}
          maximumValue={50}
          step={1}
          minimumTrackTintColor="black"
          maximumTrackTintColor="#000000"
          thumbTintColor="black"
          value={range}
          onSlidingComplete={(value) => setRange(value)}
        />

        <View style={stylesTelaConfigPrincipal.divider} />

        <TouchableOpacity style={stylesTelaConfigPrincipal.option}>
          <Text style={stylesTelaConfigPrincipal.optionText}>Idioma</Text>
          <Text style={stylesTelaConfigPrincipal.arrow}>→</Text>
        </TouchableOpacity>

        <View style={stylesTelaConfigPrincipal.divider} />

        <TouchableOpacity 
          style={stylesTelaConfigPrincipal.option}
          onPress={() => navigation.navigate('TelaConfigPermissoes')}
        >
          <Text style={stylesTelaConfigPrincipal.optionText}>Gerenciar permissões do aplicativo</Text>
          <Text style={stylesTelaConfigPrincipal.arrow}>→</Text>
        </TouchableOpacity>

        <View style={stylesTelaConfigPrincipal.divider} />

        <TouchableOpacity style={stylesTelaConfigPrincipal.option}>
          <Text style={stylesTelaConfigPrincipal.optionText}>Tema</Text>
          <Text style={stylesTelaConfigPrincipal.arrow}>→</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const stylesTelaConfigPrincipal = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1c40f',
  },
  header: {
    backgroundColor: '#1e1e1e',
    paddingTop: StatusBar.currentHeight || 40,
    paddingBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
    textTransform: 'uppercase',
    flex: 1,
  },
  content: {
    padding: 20,
    flex: 1,
  },
  option: {
    fontSize: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  optionText: {
    fontSize: 20,
  },
  arrow: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginVertical: 10,
  },
  sliderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 5,
  },
  rangeValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  backIcon: {
    position: 'absolute',
    left: 20,
    top: StatusBar.currentHeight ? StatusBar.currentHeight + 3 : 70,
    padding: 10,
    zIndex: 10,
  },
});
