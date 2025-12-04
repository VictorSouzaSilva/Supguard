import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const INCIDENTES_MOCK = [
  {
    id: 1,
    tipo: 'Roubo',
    bairro: 'Centro',
    dataHora: '23 Abril 2024 às 18:20',
    status: 'Verificado',
    gravidade: 'Grave',
    corTipo: '#ff3b30', // vermelho
  },
  {
    id: 2,
    tipo: 'Vandalismo',
    bairro: 'Jundiaí',
    dataHora: '23 Abril 2024 às 21:47',
    status: 'Em análise',
    gravidade: 'Médio',
    corTipo: '#ff9500', // laranja
  },
  {
    id: 3,
    tipo: 'Assalto',
    bairro: 'Vila Jaiara',
    dataHora: '23 Abril 2024 às 11:12',
    status: 'Resolvido',
    gravidade: 'Grave',
    corTipo: '#ff3b30',
  },
  {
    id: 4,
    tipo: 'Suspeita',
    bairro: 'Boa Vista',
    dataHora: '23 Abril 2024 às 19:47',
    status: 'Em análise',
    gravidade: 'Leve',
    corTipo: '#ffaa00',
  },
  {
    id: 5,
    tipo: 'Furto',
    bairro: 'Centro',
    dataHora: '23 Abril 2024 às 10:37',
    status: 'Verificado',
    gravidade: 'Leve',
    corTipo: '#ffcc00',
  },
  {
    id: 6,
    tipo: 'Vandalismo',
    bairro: 'Jundiaí',
    dataHora: '22 Abril 2024 às 22:10',
    status: 'Verificado',
    gravidade: 'Médio',
    corTipo: '#ff9500',
  },
];

export default function MeusRelatoriosScreen({ navigation }) {
  const [tipoSelecionado, setTipoSelecionado] = useState('Todos os tipos');
  const [periodoSelecionado, setPeriodoSelecionado] = useState('Hoje');

  const totalEnviados = INCIDENTES_MOCK.length;
  const totalEsteMes = 12; // mock
  const totalVerificados = INCIDENTES_MOCK.filter(
    (i) => i.status === 'Verificado'
  ).length;
  const totalEmAnalise = INCIDENTES_MOCK.filter(
    (i) => i.status === 'Em análise'
  ).length;

  const incidentesFiltrados = useMemo(() => {
    // aqui você pode aplicar filtros reais de tipo/ período
    return INCIDENTES_MOCK;
  }, [tipoSelecionado, periodoSelecionado]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation && navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>MEUS RELATÓRIOS</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Cards de resumo */}
        <View style={styles.cardsRow}>
          <View style={styles.summaryCard}>
            <Text style={styles.cardLabel}>Total Enviados</Text>
            <Text style={styles.cardNumber}>{totalEnviados}</Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.cardLabel}>Este Mês</Text>
            <Text style={styles.cardNumber}>{totalEsteMes}</Text>
          </View>
        </View>

        <View style={styles.cardsRow}>
          <View style={styles.summaryCard}>
            <Text style={styles.cardLabel}>Verificados</Text>
            <Text style={styles.cardNumber}>{totalVerificados}</Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.cardLabel}>Em Análise</Text>
            <Text style={styles.cardNumber}>{totalEmAnalise}</Text>
          </View>
        </View>

        {/* Filtros */}
        <View style={styles.filtersContainer}>
          <Text style={styles.filterLabel}>Tipo de Incidente</Text>
          <TouchableOpacity
            style={styles.select}
            activeOpacity={0.8}
            onPress={() => {
              // aqui você pode abrir um modal / picker real
            }}
          >
            <Text style={styles.selectText}>{tipoSelecionado}</Text>
            <Ionicons name="chevron-down" size={18} color="#000" />
          </TouchableOpacity>

          <Text style={[styles.filterLabel, { marginTop: 14 }]}>Período</Text>
          <TouchableOpacity
            style={styles.select}
            activeOpacity={0.8}
            onPress={() => {
              // modal de período
            }}
          >
            <Text style={styles.selectText}>{periodoSelecionado}</Text>
            <Ionicons name="chevron-down" size={18} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.filterButton} activeOpacity={0.9}>
            <Ionicons name="funnel-outline" size={18} color="#ffc700" />
            <Text style={styles.filterButtonText}>Aplicar Filtros</Text>
          </TouchableOpacity>
        </View>

        {/* Histórico */}
        <View style={styles.historyHeader}>
          <Text style={styles.historyTitle}>Histórico de Denúncias</Text>
          <Text style={styles.historyCount}>
            {incidentesFiltrados.length} enviadas
          </Text>
        </View>

        {/* Lista de cards */}
        {incidentesFiltrados.map((item) => (
          <View key={item.id} style={styles.incidentCard}>
            <View style={styles.incidentHeader}>
              <View style={styles.incidentTitleRow}>
                <View
                  style={[
                    styles.typeDot,
                    {
                      backgroundColor: item.corTipo,
                    },
                  ]}
                />
                <Text style={styles.incidentTitle}>{item.tipo}</Text>
              </View>
            </View>

            {/* Local */}
            <View style={styles.incidentInfoRow}>
              <Ionicons
                name="location-outline"
                size={14}
                color="#888"
                style={styles.infoIcon}
              />
              <Text style={styles.incidentInfoText}>
                {item.bairro} - Anápolis
              </Text>
            </View>

            {/* Data */}
            <View style={styles.incidentInfoRow}>
              <Ionicons
                name="calendar-outline"
                size={14}
                color="#888"
                style={styles.infoIcon}
              />
              <Text style={styles.incidentInfoText}>{item.dataHora}</Text>
            </View>

            {/* Status + Gravidade */}
            <View style={styles.incidentFooter}>
              <View style={getStatusTagStyle(item.status)}>
                <Text style={getStatusTextStyle(item.status)}>
                  {item.status}
                </Text>
              </View>

              <Text style={styles.gravityText}>
                Gravidade:{' '}
                <Text style={getGravityHighlightStyle(item.gravidade)}>
                  {item.gravidade}
                </Text>
              </Text>
            </View>
          </View>
        ))}

        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
}

// helpers de estilo dinâmico
function getStatusTagStyle(status) {
  let backgroundColor = '#d1d1d1';
  if (status === 'Verificado') backgroundColor = '#c3f7c8';
  if (status === 'Em análise') backgroundColor = '#ffe9a6';
  if (status === 'Resolvido') backgroundColor = '#c6dbff';

  return {
    ...styles.statusTag,
    backgroundColor,
  };
}

function getStatusTextStyle(status) {
  let color = '#333';
  if (status === 'Verificado') color = '#1f7a2e';
  if (status === 'Em análise') color = '#a67c00';
  if (status === 'Resolvido') color = '#1f4fa6';

  return {
    ...styles.statusTagText,
    color,
  };
}

function getGravityHighlightStyle(gravidade) {
  let color = '#666';
  if (gravidade === 'Grave') color = '#c1272d';
  if (gravidade === 'Médio') color = '#ff9500';
  if (gravidade === 'Leve') color = '#008e3a';

  return {
    color,
    fontWeight: '600',
  };
}

const YELLOW = '#ffc700';
const BLACK = '#000000';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  header: {
    backgroundColor: BLACK,
    paddingTop: 40,
    paddingBottom: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    paddingRight: 12,
    paddingVertical: 4,
  },
  headerTitle: {
    color: YELLOW,
    fontSize: 18,
    fontWeight: '700',
  },
  scrollContent: {
    paddingHorizontal: 12,
    paddingVertical: 16,
    backgroundColor: YELLOW,
  },
  cardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: BLACK,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 4,
  },
  cardLabel: {
    color: '#ffffff',
    fontSize: 13,
    marginBottom: 4,
  },
  cardNumber: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '700',
  },
  filtersContainer: {
    marginTop: 8,
    marginBottom: 18,
  },
  filterLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: BLACK,
    marginBottom: 4,
  },
  select: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 11,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectText: {
    fontSize: 14,
    color: '#000',
  },
  filterButton: {
    marginTop: 16,
    backgroundColor: BLACK,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  filterButtonText: {
    marginLeft: 6,
    fontSize: 15,
    color: YELLOW,
    fontWeight: '600',
  },
  historyHeader: {
    marginHorizontal: -12,
    backgroundColor: BLACK,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  historyTitle: {
    color: YELLOW,
    fontSize: 14,
    fontWeight: '600',
  },
  historyCount: {
    color: '#ffffff',
    fontSize: 12,
  },
  incidentCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: -12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e2e2e2',
  },
  incidentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  incidentTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  incidentTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
  },
  incidentInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  infoIcon: {
    marginRight: 4,
  },
  incidentInfoText: {
    fontSize: 12,
    color: '#777',
  },
  incidentFooter: {
    marginTop: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusTag: {
    borderRadius: 6,
    paddingVertical: 3,
    paddingHorizontal: 8,
  },
  statusTagText: {
    fontSize: 11,
    fontWeight: '600',
  },
  gravityText: {
    fontSize: 12,
    color: '#555',
  },
});
