import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TelaSegurancaConta({ navigation }) {
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [emailRecuperacao, setEmailRecuperacao] = useState('');
  const [numeroRecuperacao, setNumeroRecuperacao] = useState('');

  return (
    <SafeAreaView style={stylesTelaSegurancaConta.container}>
      {/* Cabeçalho */}
      <View style={stylesTelaSegurancaConta.header}>
      <TouchableOpacity 
          style={stylesTelaSegurancaConta.backIcon}
          onPress={() => navigation.navigate('TelaContaPrincipal')} >
          <Ionicons name="arrow-back" size={24} color="yellow" />
      </TouchableOpacity>
        <Text style={stylesTelaSegurancaConta.headerTitle}>SEGURANÇA{"\n"}DA CONTA</Text>
      </View>

      <ScrollView contentContainerStyle={stylesTelaSegurancaConta.content}>
        {/* Seção: Trocar Senha */}
        <Text style={stylesTelaSegurancaConta.sectionTitle}>Trocar senha</Text>

        <TextInput
          style={stylesTelaSegurancaConta.input}
          placeholder="Senha Atual:"
          secureTextEntry
          value={senhaAtual}
          onChangeText={setSenhaAtual}
        />
        <TextInput
          style={stylesTelaSegurancaConta.input}
          placeholder="Nova Senha:"
          secureTextEntry
          value={novaSenha}
          onChangeText={setNovaSenha}
        />
        <TextInput
          style={stylesTelaSegurancaConta.input}
          placeholder="Confirmar Nova Senha:"
          secureTextEntry
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
        />

        <TouchableOpacity style={stylesTelaSegurancaConta.button}>
          <Text style={stylesTelaSegurancaConta.buttonText}>Salvar Alterações</Text>
        </TouchableOpacity>

        {/* Seção: Dados de Recuperação */}
        <Text style={[stylesTelaSegurancaConta.sectionTitle, { marginTop: 30 }]}>Dados de Recuperação</Text>

        <TextInput
          style={stylesTelaSegurancaConta.input}
          placeholder="Email de Recuperação:"
          keyboardType="email-address"
          value={emailRecuperacao}
          onChangeText={setEmailRecuperacao}
        />
        <TextInput
          style={stylesTelaSegurancaConta.input}
          placeholder="Número de Recuperação:"
          keyboardType="phone-pad"
          value={numeroRecuperacao}
          onChangeText={setNumeroRecuperacao}
        />

        <TouchableOpacity style={stylesTelaSegurancaConta.button}>
          <Text style={stylesTelaSegurancaConta.buttonText}>Salvar Informações</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const stylesTelaSegurancaConta = StyleSheet.create({
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
  },
  headerTitle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    textTransform: 'uppercase',
    flex: 1,
  },
  backIcon: {
    position: 'absolute',
    left: 20,
    top: StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 50,
    padding: 1,
    zIndex: 1,
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 19,
    marginBottom: 10,
    textDecorationLine: 'underline',
  },
  input: {
    backgroundColor: '#f1c40f',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 6,
    marginTop: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});