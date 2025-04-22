import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, SafeAreaView, TouchableOpacity, StatusBar, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TelaConfigPermissoes({ navigation }) {
  const [permissoes, setPermissoes] = useState({
    localizacao: false,
    armazenamento: false,
    camera: false,
    microfone: false,
    segundoPlano: false,
  });

  const togglePermissao = (chave) => {
    setPermissoes({ ...permissoes, [chave]: !permissoes[chave] });
  };

  return (
    <SafeAreaView style={stylesTelaConfigPermissoes.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1e1e1e" />
      
      <View style={stylesTelaConfigPermissoes.header}>
      <TouchableOpacity 
          style={stylesTelaConfigPermissoes.backIcon}
          onPress={() => navigation.navigate('TelaConfigPrincipal')} >
          <Ionicons name="arrow-back" size={24} color="yellow" />
        </TouchableOpacity>
        <Text style={stylesTelaConfigPermissoes.headerTitle}>
          GERENCIAR PERMISSÕES{"\n"}DO APLICATIVO
        </Text>
      </View>

      <View style={stylesTelaConfigPermissoes.content}>

        <ItemPermissao
          titulo="Localização"
          valor={permissoes.localizacao}
          aoMudar={() => togglePermissao('localizacao')}
        />

        <ItemPermissao
          titulo="Armazenamento"
          valor={permissoes.armazenamento}
          aoMudar={() => togglePermissao('armazenamento')}
        />

        <ItemPermissao
          titulo="Câmera"
          valor={permissoes.camera}
          aoMudar={() => togglePermissao('camera')}
        />

        <ItemPermissao
          titulo="Microfone"
          valor={permissoes.microfone}
          aoMudar={() => togglePermissao('microfone')}
        />

        <ItemPermissao
          titulo="Operar em segundo plano"
          valor={permissoes.segundoPlano}
          aoMudar={() => togglePermissao('segundoPlano')}
        />
      </View>
    </SafeAreaView>
  );
}

const ItemPermissao = ({ titulo, valor, aoMudar }) => (
  <>
    <View style={stylesTelaConfigPermissoes.permissaoItem}>
      <Text style={stylesTelaConfigPermissoes.permissaoTexto}>{titulo}</Text>
      <Switch
        trackColor={{ false: '#333', true: '#000' }}
        thumbColor={valor ? '#f1c40f' : '#ccc'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={aoMudar}
        value={valor}
      />
    </View>
    <View style={stylesTelaConfigPermissoes.divider} />
  </>
);

const stylesTelaConfigPermissoes = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1c40f',
    paddingTop: 0,
  },
  header: {
    backgroundColor: '#1e1e1e',
    paddingTop: StatusBar.currentHeight || 40,
    paddingBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    position: 'absolute',
    left: 20,
    top: StatusBar.currentHeight ? StatusBar.currentHeight + 3 : 70,
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
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  permissaoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  permissaoTexto: {
    fontSize: 20,
    fontWeight: '500',
    color: '#000',
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginVertical: 20,
  },
});
