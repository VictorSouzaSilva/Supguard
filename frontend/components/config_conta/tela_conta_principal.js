import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TelaConfigConta({ navigation }) {
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="yellow" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>CONFIGURAÇÕES{"\n"}DA CONTA</Text>
      </View>

      <View style={styles.content}>
        <TouchableOpacity 
          style={styles.option}
          onPress={() => navigation.navigate('TelaInformacoesPessoais')} >
          <Text style={styles.optionText}>Atualizar informações pessoais</Text>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>

        <View style={styles.divider} />

        <TouchableOpacity 
          style={styles.option}
          onPress={() => navigation.navigate('TelaSegurancaConta')} >
          <Text style={styles.optionText}>Segurança da conta</Text>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>

        <View style={styles.divider} />

        <View style={styles.option}>
          <Text style={styles.optionText}>Autenticação em duas etapas</Text>
          <Switch
            trackColor={{ false: '#333', true: '#000' }}
            thumbColor={isTwoFactorEnabled ? '#f1c40f' : '#ccc'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setIsTwoFactorEnabled}
            value={isTwoFactorEnabled}
        />
        </View>

        <View style={styles.divider} />

        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Termos de uso e política de privacidade</Text>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>

        {/* Botão de sair */}
        <TouchableOpacity style={styles.exitButton}>
          <Text style={styles.exitButtonText}>SAIR</Text>
        </TouchableOpacity>
      </View>
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
    content: {
      padding: 20,
      flex: 1,
    },
    option: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 15,
      alignItems: 'center',
    },
    optionText: {
      fontSize: 16,
      flex: 1,
    },
    arrow: {
      fontSize: 20,
      fontWeight: 'bold',
      marginLeft: 10,
    },
    divider: {
      borderBottomWidth: 1,
      borderBottomColor: '#000',
    },
    exitButton: {
      marginTop: 50,
      alignSelf: 'center',
      backgroundColor: 'black',
      paddingHorizontal: 35,
      paddingVertical: 10,
      borderRadius: 4,
    },
    exitButtonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 15,
    },
    backIcon: {
      position: 'absolute',
      left: 20,
      top: StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 50,
    },
  });
  