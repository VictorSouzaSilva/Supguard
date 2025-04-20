import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function CompleteRegistro({ navigation }) {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
        />
        <Text style={styles.welcomeText}>
          Seja bem-vindo, <Text style={styles.highlight}>complete seu registro.</Text>
        </Text>
      </View>
      <View style={styles.bottom}>
        <TextInput
          style={styles.input}
          placeholder="nome completo"
          placeholderTextColor="#666"
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          style={styles.input}
          placeholder="(00) 91234-5678"
          placeholderTextColor="#666"
          keyboardType="phone-pad"
          value={telefone}
          onChangeText={setTelefone}
        />

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('Dashboard')}
        >
          <Text style={styles.buttonText}>Cadastrar informações</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    fontSize: 18,
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
    color: '#f2c300',
    fontWeight: '600',
  },
});