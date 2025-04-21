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
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="yellow" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>SEGURANÇA{"\n"}DA CONTA</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Seção: Trocar Senha */}
        <Text style={styles.sectionTitle}>Trocar senha</Text>

        <TextInput
          style={styles.input}
          placeholder="Senha Atual:"
          secureTextEntry
          value={senhaAtual}
          onChangeText={setSenhaAtual}
        />
        <TextInput
          style={styles.input}
          placeholder="Nova Senha:"
          secureTextEntry
          value={novaSenha}
          onChangeText={setNovaSenha}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirmar Nova Senha:"
          secureTextEntry
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Salvar Alterações</Text>
        </TouchableOpacity>

        {/* Seção: Dados de Recuperação */}
        <Text style={[styles.sectionTitle, { marginTop: 30 }]}>Dados de Recuperação</Text>

        <TextInput
          style={styles.input}
          placeholder="Email de Recuperação:"
          keyboardType="email-address"
          value={emailRecuperacao}
          onChangeText={setEmailRecuperacao}
        />
        <TextInput
          style={styles.input}
          placeholder="Número de Recuperação:"
          keyboardType="phone-pad"
          value={numeroRecuperacao}
          onChangeText={setNumeroRecuperacao}
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Salvar Informações</Text>
        </TouchableOpacity>
      </ScrollView>
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
  },
  headerTitle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
    textTransform: 'uppercase',
    flex: 1,
  },
  backIcon: {
    position: 'absolute',
    left: 20,
    top: StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 50,
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
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
  },
});
