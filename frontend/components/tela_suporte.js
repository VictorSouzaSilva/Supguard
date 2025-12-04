import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const YELLOW = '#ffc700';
const BLACK = '#000000';
const RED = '#d50000';

const FAQ_ITEMS = [
  {
    id: 1,
    question: 'Como enviar uma denúncia?',
    answer:
      'No menu principal, toque em "Nova Denúncia", preencha as informações solicitadas, adicione fotos se necessário e confirme o envio.',
  },
  {
    id: 2,
    question: 'Minhas denúncias são anônimas?',
    answer:
      'Sim. Seus dados pessoais não são exibidos para outros usuários. As informações são usadas apenas pelos órgãos responsáveis.',
  },
  {
    id: 3,
    question: 'Como funciona o mapa de calor?',
    answer:
      'O mapa de calor mostra as áreas com maior concentração de denúncias em um período, ajudando a identificar regiões mais críticas.',
  },
  {
    id: 4,
    question: 'O que fazer em caso de emergência?',
    answer:
      'Em situações de risco imediato, ligue para 190 (Polícia) ou 192 (SAMU). Use o SupGuard apenas para registrar a ocorrência.',
  },
  {
    id: 5,
    question: 'Como são verificadas as denúncias?',
    answer:
      'As denúncias passam por análise de uma equipe responsável, que verifica a consistência das informações e aciona os órgãos competentes.',
  },
  {
    id: 6,
    question: 'Posso editar ou excluir uma denúncia enviada?',
    answer:
      'Você pode acompanhar o status das denúncias em "Meus Relatórios". Para alterações específicas, entre em contato pelo formulário de suporte.',
  },
];

export default function SuporteScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [assunto, setAssunto] = useState('Selecione o motivo');
  const [mensagem, setMensagem] = useState('');
  const [openFaqId, setOpenFaqId] = useState(null);

  function handleEnviar() {
    // aqui você integra com sua API / backend
    console.log({ nome, email, assunto, mensagem });
  }

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
        <Text style={styles.headerTitle}>SUPORTE</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Banner de emergência */}
        <View style={styles.emergencyBanner}>
          <Ionicons
            name="warning-outline"
            size={22}
            color="#fff"
            style={{ marginRight: 10 }}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.emergencyTitle}>Em caso de emergência</Text>
            <Text style={styles.emergencyText}>
              Ligue 190 (Polícia) ou 192 (SAMU) imediatamente
            </Text>
          </View>
        </View>

        {/* Card Fale Conosco */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardHeaderText}>Fale Conosco</Text>
          </View>

          <View style={styles.cardBody}>
            <Text style={styles.label}>Nome</Text>
            <TextInput
              style={styles.input}
              placeholder="Seu nome"
              placeholderTextColor="#b3b3b3"
              value={nome}
              onChangeText={setNome}
            />

            <Text style={styles.label}>E-mail</Text>
            <TextInput
              style={styles.input}
              placeholder="seu@email.com"
              placeholderTextColor="#b3b3b3"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />

            <Text style={styles.label}>Assunto</Text>
            {/* Simulação de select - troque por Picker/Modal se quiser */}
            <TouchableOpacity style={styles.select} activeOpacity={0.8}>
              <Text style={styles.selectText}>{assunto}</Text>
              <Ionicons name="chevron-down" size={18} color="#000" />
            </TouchableOpacity>

            <Text style={styles.label}>Mensagem</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Descreva sua dúvida, problema ou sugestão..."
              placeholderTextColor="#b3b3b3"
              value={mensagem}
              onChangeText={setMensagem}
              multiline
              textAlignVertical="top"
            />

            <TouchableOpacity
              style={styles.submitButton}
              activeOpacity={0.9}
              onPress={handleEnviar}
            >
              <Ionicons name="paper-plane-outline" size={18} color="#000" />
              <Text style={styles.submitButtonText}>Enviar Mensagem</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Card FAQ */}
        <View style={[styles.card, { marginBottom: 24 }]}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardHeaderText}>Perguntas Frequentes</Text>
          </View>

          <View style={styles.cardBody}>
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openFaqId === item.id;
              const isLast = index === FAQ_ITEMS.length - 1;

              return (
                <View
                  key={item.id}
                  style={[
                    styles.faqItem,
                    !isLast && { borderBottomWidth: 1, borderBottomColor: '#eee' },
                  ]}
                >
                  <TouchableOpacity
                    style={styles.faqQuestionRow}
                    activeOpacity={0.8}
                    onPress={() =>
                      setOpenFaqId((prev) => (prev === item.id ? null : item.id))
                    }
                  >
                    <Text style={styles.faqQuestion}>{item.question}</Text>
                    <Ionicons
                      name={isOpen ? 'chevron-up' : 'chevron-down'}
                      size={18}
                      color="#555"
                    />
                  </TouchableOpacity>

                  {isOpen && (
                    <Text style={styles.faqAnswer}>{item.answer}</Text>
                  )}
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

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
  },
  emergencyBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: RED,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 18,
  },
  emergencyTitle: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
    marginBottom: 2,
  },
  emergencyText: {
    color: '#fff',
    fontSize: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    marginBottom: 18,
    overflow: 'hidden',
    elevation: 1,
  },
  cardHeader: {
    backgroundColor: BLACK,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  cardHeaderText: {
    color: YELLOW,
    fontSize: 15,
    fontWeight: '700',
  },
  cardBody: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  label: {
    fontSize: 13,
    color: '#222',
    marginBottom: 4,
    marginTop: 8,
  },
  input: {
    backgroundColor: '#fafafa',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#000',
  },
  textArea: {
    height: 110,
    paddingTop: 10,
  },
  select: {
    backgroundColor: '#fafafa',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectText: {
    fontSize: 14,
    color: '#000',
  },
  submitButton: {
    marginTop: 18,
    backgroundColor: YELLOW,
    borderRadius: 10,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    marginLeft: 6,
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
  },
  faqItem: {
    paddingVertical: 10,
  },
  faqQuestionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestion: {
    flex: 1,
    fontSize: 14,
    color: '#222',
    marginRight: 12,
  },
  faqAnswer: {
    marginTop: 6,
    fontSize: 13,
    color: '#555',
    lineHeight: 18,
  },
});
