import React, { useMemo, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
  Modal,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import api from './config/api';

// Categorias para mapeamento de cores e tipos
const categoriasLeves = ["Vandalismo", "Corrida Clandestina"];
const categoriasMedias = ["Agressão física", "Acidente de trânsito", "Arrombamento"];
const categoriasGraves = ["Assalto", "Homicídio", "Estupro / abuso Sexual", "Disparo de arma de fogo", "Tráfico"];

// ✅ Lista base para o menu já nascer completo
const TIPOS_BASE = [
  ...categoriasLeves,
  ...categoriasMedias,
  ...categoriasGraves,
];

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

// ✅ Normaliza status do backend
function normalizeStatus(status = '') {
  return String(status).trim().toLowerCase();
}

// ✅ Label amigável e consistente
function mapStatusLabel(status = '') {
  const s = normalizeStatus(status);
  if (s === 'validado' || s === 'verificado') return 'Verificado';
  if (s === 'em análise' || s === 'em analise') return 'Em análise';
  if (s === 'resolvido') return 'Resolvido';
  if (!status) return 'Desconhecido';
  return status.charAt(0).toUpperCase() + status.slice(1);
}

// ✅ Componente de Select (dropdown com Modal)
function SelectMenu({ label, value, options, onChange }) {
  const [visible, setVisible] = useState(false);

  return (
    <View>
      <Text style={styles.filterLabel}>{label}</Text>

      <TouchableOpacity
        style={styles.select}
        activeOpacity={0.85}
        onPress={() => setVisible(true)}
      >
        <Text style={styles.selectText} numberOfLines={1}>
          {value}
        </Text>
        <Ionicons name="chevron-down" size={18} color="#000" />
      </TouchableOpacity>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setVisible(false)}
        >
          <Pressable style={styles.modalContent} onPress={() => {}}>
            <Text style={styles.modalTitle}>{label}</Text>

            <ScrollView
              style={{ maxHeight: 320 }}
              showsVerticalScrollIndicator={false}
            >
              {options.map((opt) => {
                const selected = opt === value;
                return (
                  <TouchableOpacity
                    key={opt}
                    style={[
                      styles.modalOption,
                      selected && styles.modalOptionSelected,
                    ]}
                    onPress={() => {
                      onChange(opt);
                      setVisible(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.modalOptionText,
                        selected && styles.modalOptionTextSelected,
                      ]}
                    >
                      {opt}
                    </Text>
                    {selected && (
                      <Ionicons name="checkmark" size={18} color="#000" />
                    )}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setVisible(false)}
            >
              <Text style={styles.modalCloseButtonText}>Fechar</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

export default function MeusRelatoriosScreen({ navigation }) {
  const [tipoSelecionado, setTipoSelecionado] = useState('Todos os tipos');
  const [periodoSelecionado, setPeriodoSelecionado] = useState('Hoje');
  const [incidentes, setIncidentes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Carrega incidentes da API ao montar
  useEffect(() => {
    carregarIncidentes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        dataHora: inc.created_at
          ? new Date(inc.created_at).toLocaleString('pt-BR')
          : 'Data desconhecida',
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

  const totalVerificados = incidentesFiltrados.filter((i) => {
    const s = normalizeStatus(i.status);
    return s === 'validado' || s === 'verificado';
  }).length;

  const totalEmAnalise = incidentesFiltrados.filter((i) => {
    const s = normalizeStatus(i.status);
    return s === 'em análise' || s === 'em analise';
  }).length;

  // ✅ Agora o menu já vem completo antes do filtro
  const tiposDisponiveis = useMemo(() => {
    const tiposDaApi = incidentes.map((inc) => inc.tipo).filter(Boolean);

    return [
      'Todos os tipos',
      ...new Set([...TIPOS_BASE, ...tiposDaApi]),
    ];
  }, [incidentes]);

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

        {/* Filtros com MENUS */}
        <View style={styles.filtersContainer}>
          <SelectMenu
            label="Tipo de Incidente"
            value={tipoSelecionado}
            options={tiposDisponiveis}
            onChange={setTipoSelecionado}
          />

          <View style={{ height: 14 }} />

          <SelectMenu
            label="Período"
            value={periodoSelecionado}
            options={periodosDisponiveis}
            onChange={setPeriodoSelecionado}
          />

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
          incidentesFiltrados.map((item) => {
            const statusLabel = mapStatusLabel(item.status);

            return (
              <View key={item.id} style={styles.incidentCard}>
                <View style={styles.incidentHeader}>
                  <View style={styles.incidentTitleRow}>
                    <View
                      style={[
                        styles.typeDot,
                        { backgroundColor: item.corTipo },
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
                      {statusLabel}
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
            );
          })
        )}

        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
}

// helpers de estilo dinâmico
function getStatusTagStyle(status) {
  const s = normalizeStatus(status);
  let backgroundColor = '#d1d1d1';

  if (s === 'validado' || s === 'verificado') backgroundColor = '#c3f7c8';
  if (s === 'em análise' || s === 'em analise') backgroundColor = '#ffe9a6';
  if (s === 'resolvido') backgroundColor = '#c6dbff';

  return {
    ...styles.statusTag,
    backgroundColor,
  };
}

function getStatusTextStyle(status) {
  const s = normalizeStatus(status);
  let color = '#333';

  if (s === 'validado' || s === 'verificado') color = '#1f7a2e';
  if (s === 'em análise' || s === 'em analise') color = '#a67c00';
  if (s === 'resolvido') color = '#1f4fa6';

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

  // Select
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
    flexShrink: 1,
    paddingRight: 8,
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

  // Modal do Select
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 10,
  },
  modalTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
    marginBottom: 10,
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  modalOptionSelected: {
    backgroundColor: '#f3f4f6',
  },
  modalOptionText: {
    fontSize: 14,
    color: '#111',
  },
  modalOptionTextSelected: {
    fontWeight: '700',
  },
  modalCloseButton: {
    marginTop: 10,
    alignSelf: 'flex-end',
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  modalCloseButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000',
  },
});
