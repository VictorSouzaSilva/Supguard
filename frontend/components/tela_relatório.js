import React, { useMemo, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import api from './config/api';

// Categorias para mapeamento de cores e tipos
const categoriasLeves = ["Vandalismo", "Corrida Clandestina"];
const categoriasMedias = ["Agressão física", "Acidente de trânsito", "Arrombamento"];
const categoriasGraves = ["Assalto", "Homicídio", "Estupro / abuso Sexual", "Disparo de arma de fogo", "Tráfico"];

function getCorPorTipo(tipo) {
  if (categoriasLeves.includes(tipo)) return '#FFEB3B'; // amarelo
  if (categoriasMedias.includes(tipo)) return '#FF9800'; // laranja
  if (categoriasGraves.includes(tipo)) return '#F44336'; // vermelho
  return '#9E9E9E'; // cinza
}

function getGravidadePorTipo(tipo) {
  if (categoriasLeves.includes(tipo)) return 'Leve';
  if (categoriasMedias.includes(tipo)) return 'Médio';
  if (categoriasGraves.includes(tipo)) return 'Grave';
  return 'Desconhecida';
}

export default function MeusRelatoriosScreen({ navigation }) {
  const [tipoSelecionado, setTipoSelecionado] = useState('Todos os tipos');
  const [periodoSelecionado, setPeriodoSelecionado] = useState('Hoje');
  const [incidentes, setIncidentes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Carrega incidentes da API ao montar
  useEffect(() => {
    carregarIncidentes();
  }, []);

  const carregarIncidentes = async () => {
    setLoading(true);
    try {
      const params = {};
      
      // Mapeia período para query
      if (periodoSelecionado === 'Hoje') params.periodo = 'hoje';
      else if (periodoSelecionado === 'Semana') params.periodo = 'semana';
      else if (periodoSelecionado === 'Este Mês') params.periodo = 'mes';
      
      // Mapeia tipo de incidente
      if (tipoSelecionado !== 'Todos os tipos') params.tipo = tipoSelecionado;
      
      const response = await api.listarIncidentes(params);
      
      // Normaliza dados com campos necessários
      const dados = response.map((inc) => ({
        ...inc,
        dataHora: inc.created_at ? new Date(inc.created_at).toLocaleString('pt-BR') : 'Data desconhecida',
        bairro: 'Anápolis', // Se houver bairro no backend, usar; senão usar padrão
        corTipo: getCorPorTipo(inc.tipo),
        gravidade: getGravidadePorTipo(inc.tipo),
      }));
      
      setIncidentes(dados);
      console.log('✅ Incidentes carregados:', dados.length);
    } catch (err) {
      console.error('❌ Erro ao carregar incidentes:', err);
      Alert.alert('Erro', 'Falha ao carregar incidentes');
    } finally {
      setLoading(false);
    }
  };

  const incidentesFiltrados = useMemo(() => {
    return incidentes;
  }, [incidentes]);

  const totalEnviados = incidentesFiltrados.length;
  const totalVerificados = incidentesFiltrados.filter(
    (i) => i.status === 'validado'
  ).length;
  const totalEmAnalise = incidentesFiltrados.filter(
    (i) => i.status === 'em análise'
  ).length;

  const tiposDisponiveis = [
    'Todos os tipos',
    ...new Set(incidentes.map(inc => inc.tipo))
  ];

  const periodosDisponiveis = ['Hoje', 'Semana', 'Este Mês'];

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
            <Text style={styles.cardNumber}>{incidentesFiltrados.length}</Text>
          </View>
        </View>

        <View style={styles.cardsRow}>
          <View style={styles.summaryCard}>
            <Text style={styles.cardLabel}>Validados</Text>
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
          <View style={styles.pickerRow}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {tiposDisponiveis.map((tipo) => (
                <TouchableOpacity
                  key={tipo}
                  style={[
                    styles.filterChip,
                    tipoSelecionado === tipo && styles.filterChipActive,
                  ]}
                  onPress={() => setTipoSelecionado(tipo)}
                >
                  <Text
                    style={[
                      styles.filterChipText,
                      tipoSelecionado === tipo && styles.filterChipTextActive,
                    ]}
                  >
                    {tipo}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <Text style={[styles.filterLabel, { marginTop: 14 }]}>Período</Text>
          <View style={styles.pickerRow}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {periodosDisponiveis.map((periodo) => (
                <TouchableOpacity
                  key={periodo}
                  style={[
                    styles.filterChip,
                    periodoSelecionado === periodo && styles.filterChipActive,
                  ]}
                  onPress={() => {
                    setPeriodoSelecionado(periodo);
                  }}
                >
                  <Text
                    style={[
                      styles.filterChipText,
                      periodoSelecionado === periodo && styles.filterChipTextActive,
                    ]}
                  >
                    {periodo}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <TouchableOpacity
            style={styles.filterButton}
            activeOpacity={0.9}
            onPress={carregarIncidentes}
          >
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
        {loading ? (
          <View style={{ padding: 20, alignItems: 'center' }}>
            <Text>Carregando...</Text>
          </View>
        ) : incidentesFiltrados.length === 0 ? (
          <View style={{ padding: 20, alignItems: 'center' }}>
            <Text>Nenhum incidente encontrado</Text>
          </View>
        ) : (
          incidentesFiltrados.map((item) => (
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
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
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
          ))
        )}

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
