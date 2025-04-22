import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  StatusBar,
  Platform,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Checkbox } from 'react-native-paper';  

export default function TelaNotificacoes({ navigation }) {
  const [notificacaoAtiva, setNotificacaoAtiva] = useState(false);
  const [matutino, setMatutino] = useState(false);
  const [vespertino, setVespertino] = useState(false);
  const [noturno, setNoturno] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [tiposSelecionados, setTiposSelecionados] = useState([]);

  const tiposCrime = [
    "Todos",
    "Homicídio",
    "Assalto",
    "Agressão física",
    "Estupro/abuso sexual",
    "Vandalismo",
    "Arrombamento",
    "Disparos de arma de fogo",
    "Acidentes de trânsito",
    "Corrida clandestina",
    "Briga generalizada",
    "Tráfico",
  ];

  const toggleTipoCrime = (tipo) => {
    if (tipo === "Todos") {
      if (tiposSelecionados.includes("Todos")) {
        setTiposSelecionados([]);
      } else {
        setTiposSelecionados(tiposCrime);
      }
    } else {
      const novaLista = tiposSelecionados.includes(tipo)
        ? tiposSelecionados.filter((item) => item !== tipo && item !== "Todos")
        : [...tiposSelecionados.filter((item) => item !== "Todos"), tipo];

      setTiposSelecionados(novaLista);
    }
  };

  return (
    <SafeAreaView style={stylesTelaNotificacoes.container}>
      <View style={stylesTelaNotificacoes.header}>
        <TouchableOpacity 
          style={stylesTelaNotificacoes.backIcon}
          onPress={() => navigation.navigate('TelaConfigPrincipal')} >
          <Ionicons name="arrow-back" size={24} color="yellow" />
        </TouchableOpacity>
        <Text style={stylesTelaNotificacoes.headerTitle}>NOTIFICAÇÕES</Text>
      </View>

      <ScrollView style={stylesTelaNotificacoes.content}>
        <Text style={stylesTelaNotificacoes.sectionTitle}>Permissões</Text>

        <View style={stylesTelaNotificacoes.switchRow}>
          <Text style={stylesTelaNotificacoes.label}>Habilitar notificação</Text>
          <Switch
            value={notificacaoAtiva}
            onValueChange={() => setNotificacaoAtiva(!notificacaoAtiva)}
            trackColor={{ false: '#333', true: '#000' }}
            thumbColor={notificacaoAtiva ? '#f1c40f' : '#ccc'}
          />
        </View>

        <View style={stylesTelaNotificacoes.divider} />

        <Text style={stylesTelaNotificacoes.sectionTitle}>Quando receber notificações?</Text>

        <View style={stylesTelaNotificacoes.switchRow}>
          <Text style={stylesTelaNotificacoes.label}>Matutino</Text>
          <Switch
            value={matutino}
            onValueChange={() => setMatutino(!matutino)}
            trackColor={{ false: '#333', true: '#000' }}
            thumbColor={matutino ? '#f1c40f' : '#ccc'}
          />
        </View>

        <View style={stylesTelaNotificacoes.switchRow}>
          <Text style={stylesTelaNotificacoes.label}>Vespertino</Text>
          <Switch
            value={vespertino}
            onValueChange={() => setVespertino(!vespertino)}
            trackColor={{ false: '#333', true: '#000' }}
            thumbColor={vespertino ? '#f1c40f' : '#ccc'}
          />
        </View>

        <View style={stylesTelaNotificacoes.switchRow}>
          <Text style={stylesTelaNotificacoes.label}>Noturno</Text>
          <Switch
            value={noturno}
            onValueChange={() => setNoturno(!noturno)}
            trackColor={{ false: '#333', true: '#000' }}
            thumbColor={noturno ? '#f1c40f' : '#ccc'}
          />
        </View>

        <View style={stylesTelaNotificacoes.divider} />

        <Text style={stylesTelaNotificacoes.sectionTitle}>Quais tipos de notificação quer receber?</Text>
        <Text style={stylesTelaNotificacoes.label}>Tipos de crime:</Text>

        <TouchableOpacity
          style={stylesTelaNotificacoes.dropdownButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={stylesTelaNotificacoes.dropdownButtonText}>
            {tiposSelecionados.length === 0
              ? 'Selecionar'
              : `${tiposSelecionados.length} tipo(s) selecionado(s)`}
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={stylesTelaNotificacoes.modalOverlay}>
          <View style={stylesTelaNotificacoes.modalContent}>
            <Text style={stylesTelaNotificacoes.modalTitle}>Selecione os tipos de crime:</Text>
            <ScrollView>
              {tiposCrime.map((tipo) => (
                <TouchableOpacity
                  key={tipo}
                  onPress={() => toggleTipoCrime(tipo)}
                  style={stylesTelaNotificacoes.checkboxItem}
                >
                  <Checkbox
                    status={tiposSelecionados.includes(tipo) ? 'checked' : 'unchecked'}
                    color="#000"
                  />
                  <Text style={stylesTelaNotificacoes.checkboxLabel}>{tipo}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={stylesTelaNotificacoes.confirmButton}
            >
              <Text style={stylesTelaNotificacoes.confirmButtonText}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const stylesTelaNotificacoes = StyleSheet.create({
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
    fontSize: 20,
    textTransform: 'uppercase',
    flex: 1,
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 15,
  },
  label: {
    fontSize: 20,
    fontWeight: '500',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginVertical: 15,
  },
  dropdownButton: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginTop: 10,
  },
  dropdownButtonText: {
    fontSize: 16,
    color: '#000',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#f1c40f',
    borderRadius: 10,
    padding: 20,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxLabel: {
    fontSize: 16,
  },
  confirmButton: {
    backgroundColor: '#1e1e1e',
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
  },
  confirmButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});