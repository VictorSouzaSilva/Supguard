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

export default function CriarConta({ navigation }) {
  const [name, setName] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <View style={stylesCriarConta.container}>
      <View style={stylesCriarConta.top}>
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
          placeholder="Nome completo"
          placeholderTextColor="#666"
          onChangeText={setName}
        />

        <TextInput
          style={stylesCriarConta.input}
          placeholder="exemplo@email.com / (00) 91234-5678"
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
          placeholder="Confirmar senha"
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
    fontSize: 18,
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
    color: '#f2c300',
    fontWeight: '600',
  },
});
