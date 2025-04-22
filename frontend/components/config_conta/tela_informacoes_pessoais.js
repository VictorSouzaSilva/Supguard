import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TelaInformacoesPessoais({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');

  return (
    <SafeAreaView style={stylesTelaInformacoesPessoais.container}>
      <View style={stylesTelaInformacoesPessoais.header}>
      <TouchableOpacity 
          style={stylesTelaInformacoesPessoais.backIcon}
          onPress={() => navigation.navigate('TelaContaPrincipal')} >
          <Ionicons name="arrow-back" size={24} color="yellow" />
      </TouchableOpacity>
        <Text style={stylesTelaInformacoesPessoais.headerTitle}>INFORMAÇÕES{"\n"}PESSOAIS</Text>
      </View>

      <View style={stylesTelaInformacoesPessoais.content}>
        <View style={stylesTelaInformacoesPessoais.inputGroup}>
          <Text style={stylesTelaInformacoesPessoais.label}>Nome:</Text>
          <TextInput
            style={stylesTelaInformacoesPessoais.input}
            placeholder="Nome completo"
            placeholderTextColor="#7f7f7f"
            value={nome}
            onChangeText={setNome}
          />
        </View>

        <View style={stylesTelaInformacoesPessoais.inputGroup}>
          <Text style={stylesTelaInformacoesPessoais.label}>Email:</Text>
          <TextInput
            style={stylesTelaInformacoesPessoais.input}
            placeholder="email@exemplo.com"
            placeholderTextColor="#7f7f7f"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        <View style={stylesTelaInformacoesPessoais.inputGroup}>
          <Text style={stylesTelaInformacoesPessoais.label}>Telefone:</Text>
          <TextInput
            style={stylesTelaInformacoesPessoais.input}
            placeholder="(00) 0000-0000"
            placeholderTextColor="#7f7f7f"
            value={telefone}
            onChangeText={setTelefone}
            keyboardType="phone-pad"
          />
        </View>

        <TouchableOpacity style={stylesTelaInformacoesPessoais.saveButton}>
          <Text style={stylesTelaInformacoesPessoais.saveButtonText}>Salvar Alterações</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const stylesTelaInformacoesPessoais = StyleSheet.create({
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
  backIcon: {
    position: 'absolute',
    left: 20,
    top: StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 50,
    padding: 1,
    zIndex: 1,
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
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 20,
    color: '#000',
  },
  input: {
    backgroundColor: '#f1c40f',
    borderColor: '#000',
    borderWidth: 1.5,
    borderRadius: 6,
    padding: 12,
    fontSize: 15,
    color: '#000',
  },
  saveButton: {
    marginTop: 30,
    backgroundColor: 'black',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});