import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TelaTermos({ navigation }) {
  return (
    <View style={styles.container}>

      {/* Barra Superior */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#FFD700" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Termos e Privacidade</Text>
        <View style={{ width: 26 }} />
      </View>

      {/* Conteúdo com Rolagem */}
      <ScrollView contentContainerStyle={styles.content}>
        
        <Text style={styles.sectionTitle}>1. Introdução</Text>
        <Text style={styles.text}>
          O SupGuard é um aplicativo destinado ao registro e acompanhamento de incidentes de segurança pública. 
          Ao usar o app, você concorda com estes termos.
        </Text>

        <Text style={styles.sectionTitle}>2. Coleta de Dados</Text>
        <Text style={styles.text}>• Dados pessoais fornecidos pelo usuário.{'\n'}
          • Localização aproximada ou precisa, quando autorizada.{'\n'}
          • Relatos de incidentes enviados pelo usuário.{'\n'}
          • Dados técnicos do dispositivo.
        </Text>

        <Text style={styles.sectionTitle}>3. Uso das Informações</Text>
        <Text style={styles.text}>
          As informações coletadas podem ser usadas para registro de incidentes, exibição no mapa, 
          contato com o usuário e melhoria do aplicativo.
        </Text>

        <Text style={styles.sectionTitle}>4. Localização</Text>
        <Text style={styles.text}>
          A localização é utilizada para registrar incidentes e exibir informações relevantes próximas ao usuário.
        </Text>

        <Text style={styles.sectionTitle}>5. Segurança</Text>
        <Text style={styles.text}>
          Adotamos medidas técnicas e administrativas para proteger seus dados, como criptografia e controle de acesso.
        </Text>

        <Text style={styles.sectionTitle}>6. Direitos do Usuário</Text>
        <Text style={styles.text}>
          Você pode solicitar acesso, correção, exclusão da conta ou informações sobre o uso dos seus dados.
        </Text>

      </ScrollView>
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
    fontSize: 20,
    fontWeight: 'bold',
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 15,
    marginBottom: 5,
    color: '#000',
  },

  text: {
    fontSize: 14,
    color: '#000',
    lineHeight: 20,
  },
});
