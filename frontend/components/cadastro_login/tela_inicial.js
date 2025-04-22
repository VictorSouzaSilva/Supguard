import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function TelaInicial({ navigation }) {
  return (
    <View style={stylesTelaInicial.container}>
      <View style={stylesTelaInicial.top}>
        <Image
          source={require('../../assets/logo.png')}
          style={stylesTelaInicial.logo}
        />
        <Text style={stylesTelaInicial.welcomeText}>
          Seja bem-vindo ao <Text style={stylesTelaInicial.highlight}>SupGuard</Text>
        </Text>
      </View>

      {/* Bottom section */}
      <View style={stylesTelaInicial.bottom}>
        <TouchableOpacity 
          style={stylesTelaInicial.button} 
          onPress={() => navigation.navigate('CriarConta')}
        >
          <Text style={stylesTelaInicial.buttonText}>Cadastrar-se</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={stylesTelaInicial.button} 
          onPress={() => navigation.navigate('TelaLogin')}
        >
          <Text style={stylesTelaInicial.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={stylesTelaInicial.googleButton}
          onPress={() => navigation.navigate('CompleteRegistro')}
          >
          <FontAwesome name="google" size={24} color="#4285F4" />
        </TouchableOpacity>


        <TouchableOpacity>
          <Text style={stylesTelaInicial.terms}>
            <FontAwesome name="shield" size={12} color="#000" />{' '}
            <Text style={{ fontWeight: 'bold' }}>
              Termos de Uso e Política de Privacidade.
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const stylesTelaInicial = StyleSheet.create({
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
    gap: 15,
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
  googleButton: {
    backgroundColor: '#fff',
    width: '100%',
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  terms: {
    fontSize: 14,
    color: '#000',
    marginTop: 10,
    textAlign: 'center',
  },
});