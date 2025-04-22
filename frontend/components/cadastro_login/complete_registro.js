import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StatusBar } from 'react-native';

export default function CompleteRegistro({ navigation }) {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');

  return (
    <View style={stylesCompleteRegistro.container}>
      <View style={stylesCompleteRegistro.top}>
      <TouchableOpacity 
          style={stylesCompleteRegistro.backIcon}
          onPress={() => navigation.navigate('TelaInicial')} >
          <Ionicons name="arrow-back" size={24} color="yellow" />
      </TouchableOpacity>
        <Image
          source={require('../../assets/logo.png')}
          style={stylesCompleteRegistro.logo}
        />
        <Text style={stylesCompleteRegistro.welcomeText}>
          Seja bem-vindo, <Text style={stylesCompleteRegistro.highlight}>complete seu registro.</Text>
        </Text>
      </View>
      <View style={stylesCompleteRegistro.bottom}>
        <TextInput
          style={stylesCompleteRegistro.input}
          placeholder="Nome Completo"
          placeholderTextColor="#666"
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          style={stylesCompleteRegistro.input}
          placeholder="Número de Telefone"
          placeholderTextColor="#666"
          keyboardType="phone-pad"
          value={telefone}
          onChangeText={setTelefone}
        />

        <TouchableOpacity 
          style={stylesCompleteRegistro.button} 
          onPress={() => navigation.navigate('Dashboard')}
        >
          <Text style={stylesCompleteRegistro.buttonText}>Cadastrar Informações</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const stylesCompleteRegistro = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1a1a',
  },
  top: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  welcomeText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  highlight: {
    fontWeight: 'bold',
    color: '#fff',
  },
  bottom: {
    flex: 2,
    backgroundColor: '#f2c300',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 30,
    alignItems: 'center',
    gap: 20,
  },
  input: {
    backgroundColor: '#f2c300',
    borderWidth: 1,
    borderColor: '#1e1a1a',
    borderRadius: 30,
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 12,
    color: '#000',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#1e1a1a',
    width: '100%',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 17,
    color: '#f2c300',
    fontWeight: '600',
  },
  backIcon: {
    position: 'absolute',
    left: 20,
    top: StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 50,
    padding: 1,
    zIndex: 1,
  },
});