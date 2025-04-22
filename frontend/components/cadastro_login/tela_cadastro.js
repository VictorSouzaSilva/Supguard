import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StatusBar } from 'react-native';

export default function CriarConta({ navigation }) {
  const [name, setName] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <View style={stylesCriarConta.container}>
      <View style={stylesCriarConta.top}>
      <TouchableOpacity 
          style={stylesCriarConta.backIcon}
          onPress={() => navigation.navigate('TelaInicial')} >
          <Ionicons name="arrow-back" size={24} color="yellow" />
      </TouchableOpacity>
        <Image
          source={require('../../assets/logo.png')}
          style={stylesCriarConta.logo}
          resizeMode="contain"
        />
        <Text style={stylesCriarConta.title}>
          Bem-vindo! Crie sua <Text style={stylesCriarConta.highlight}>conta</Text>
        </Text>
      </View>
      <ScrollView contentContainerStyle={stylesCriarConta.bottom} keyboardShouldPersistTaps="handled">
        <TextInput
          style={stylesCriarConta.input}
          placeholder="Nome Completo"
          placeholderTextColor="#666"
          onChangeText={setName}
        />

        <TextInput
          style={stylesCriarConta.input}
          placeholder="Número de Telefone"
          keyboardType="phone-pad"
          placeholderTextColor="#666"
          onChangeText={setEmailOrPhone}
        />
        
        <TextInput
          style={stylesCriarConta.input}
          placeholder="E-mail"
          placeholderTextColor="#666"
          onChangeText={setEmailOrPhone}
        />

        <TextInput
          style={stylesCriarConta.input}
          secureTextEntry
          placeholder="Senha"
          placeholderTextColor="#666"
          onChangeText={setPassword}
        />

        <TextInput
          style={stylesCriarConta.input}
          secureTextEntry
          placeholder="Confirmar Senha"
          placeholderTextColor="#666"
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity 
          style={stylesCriarConta.button} 
          onPress={() => navigation.navigate('TelaLogin')}
        >
          <Text style={stylesCriarConta.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('TelaLogin')}>
          <Text style={stylesCriarConta.buttonText}>Já tem uma conta? Faça login</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}


const stylesCriarConta = StyleSheet.create({
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
    flexGrow: 1,
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
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
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