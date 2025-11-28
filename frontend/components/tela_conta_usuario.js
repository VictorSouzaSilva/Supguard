import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TelaConta({ navigation }) {
  return (
    <View style={styles.container}>
      
      {/* Barra superior */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#FFD700" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Conta</Text>
        <View style={{ width: 26 }} /> 
      </View>

      {/* Conteúdo */}
      <View style={styles.content}>
        <Ionicons name="person-circle-outline" size={140} color="black" />

        <Text style={styles.nome}>Douglas Costa de Noronha</Text>
        <Text style={styles.email}>douglascostadenoronha@exemplo.com</Text>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TelaContaPrincipal')}>
          <Text style={styles.buttonText}>Configurações da Conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD700',
  },

  header: {
    backgroundColor: '#000',
    height: 60,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  headerTitle: {
    color: '#FFD700',
    fontSize: 22,
    fontWeight: 'bold',
  },

  content: {
    marginTop: 40,
    alignItems: 'center',
  },

  nome: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },

  email: {
    color: '#4a4a4a',
    fontSize: 14,
    marginTop: 3,
    textDecorationLine: 'underline',
  },

  button: {
    marginTop: 30,
    borderWidth: 2,
    borderColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    backgroundColor: '#FFD700',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },

  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
