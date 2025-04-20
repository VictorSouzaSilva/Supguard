import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import Slider from '@react-native-community/slider';
import { Ionicons } from '@expo/vector-icons';

export default function TelaConfigPrincipal({ navigation }) {
  const [range, setRange] = useState(10);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backIcon}>
          <Ionicons name="arrow-back" size={24} color="yellow" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>CONFIGURAÇÕES{"\n"}DO APLICATIVO</Text>
      </View>

      <View style={styles.content}>
        <TouchableOpacity 
          style={styles.option}
          onPress={() => navigation.navigate('TelaConfigNotificacoes')}
        >
          <Text style={styles.optionText}>Notificações</Text>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>

        <View style={styles.divider} />

        <View style={styles.sliderContainer}>
          <Text style={styles.optionText}>Raio de Alcance</Text>
          <Text style={styles.rangeValue}>{range} Km</Text>
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

        <View style={styles.divider} />

        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Idioma</Text>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>

        <View style={styles.divider} />

        <TouchableOpacity 
          style={styles.option}
          onPress={() => navigation.navigate('TelaConfigPermissoes')}
        >
          <Text style={styles.optionText}>Gerenciar permissões do aplicativo</Text>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>

        <View style={styles.divider} />

        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Tema</Text>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.exitButton}>
          <Text style={styles.exitButtonText}>SAIR</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    fontSize: 16,
  },
  arrow: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
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
  exitButton: {
    marginTop: 50,
    alignSelf: 'center',
    backgroundColor: 'black',
    paddingHorizontal: 35,
    paddingVertical: 10,
    borderRadius: 4,
  },
  exitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  backIcon: {
    position: 'absolute',
    left: 20,
    top: StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 50,
  },
});
