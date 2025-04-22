import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StatusBar } from 'react-native';

export default function TelaLogin({ navigation }) {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={stylesTelaLogin.container}>
      <View style={stylesTelaLogin.top}>
      <TouchableOpacity 
          style={stylesTelaLogin.backIcon}
          onPress={() => navigation.navigate('TelaInicial')} >
          <Ionicons name="arrow-back" size={24} color="yellow" />
      </TouchableOpacity>
        <Image
          source={require('../../assets/logo.png')}
          style={stylesTelaLogin.logo}
          resizeMode="contain"
        />
        <Text style={stylesTelaLogin.title}>
          Bem-vindo de volta, faça seu <Text style={stylesTelaLogin.highlight}>log in.</Text>
        </Text>
      </View>
      <View style={stylesTelaLogin.bottom}>
        <TextInput
          style={stylesTelaLogin.input}
          placeholder="Número de Telefone"
          keyboardType="phone-pad"
          placeholderTextColor="#666"
          onChangeText={setEmailOrPhone}
          value={emailOrPhone}
        />

        <TextInput
          style={stylesTelaLogin.input}
          placeholder="Digite sua Senha"
          placeholderTextColor="#666"
          secureTextEntry
          onChangeText={setPassword}
          value={password}
        />

        <TouchableOpacity>
          <Text style={stylesTelaLogin.forgot}>Esqueceu sua senha?</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={stylesTelaLogin.button} 
          onPress={() => navigation.navigate('Dashboard')}
        >
          <Text style={stylesTelaLogin.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const stylesTelaLogin = StyleSheet.create({
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
    width: 120,
    height: 80,
    marginBottom: 20,
  },
  title: {
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
  forgot: {
    fontSize: 14,
    color: '#1e1a1a',
    textDecorationLine: 'underline',
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#1e1a1a',
    width: '100%',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#f2c300',
    fontWeight: '600',
    fontSize: 18,
  },
  backIcon: {
    position: 'absolute',
    left: 20,
    top: StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 50,
    padding: 1,
    zIndex: 1,
  },
});