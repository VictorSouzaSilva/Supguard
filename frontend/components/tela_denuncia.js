import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';

export default function TelaDenuncia({ navigation }) {
  const [tipoIncidente, setTipoIncidente] = useState('');
  const [detalhes, setDetalhes] = useState('');
  const [imagem, setImagem] = useState(null);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.textoTopo}>
          Denuncie com <Text style={styles.bold}>cuidado</Text>, se possível dê o <Text style={styles.bold}>máximo de informações!</Text>
        </Text>
        <View style={styles.formContainer}>
          <Image
            source={require('../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <View style={styles.inputWrapper}>
            <Picker
              selectedValue={tipoIncidente}
              onValueChange={(itemValue) => setTipoIncidente(itemValue)}
              style={styles.picker}
              dropdownIconColor="#000"
            >
              <Picker.Item label="(Obrigatório)" value="" color="#666" />
              <Picker.Item label="Assalto" value="assalto" />
              <Picker.Item label="Vandalismo" value="vandalismo" />
              <Picker.Item label="Tráfico" value="trafico" />
              <Picker.Item label="Outros" value="outros" />
            </Picker>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Detalhes (Opcional)"
            placeholderTextColor="#555"
            multiline
            numberOfLines={3}
            value={detalhes}
            onChangeText={setDetalhes}
          />
          <TouchableOpacity style={styles.inputIcon}>
            <Text style={styles.placeholderText}>Imagem (Opcional)</Text>
            <Ionicons name="camera" size={20} color="#1e1a1a" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Enviar Denúncia</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.aviso}>
          <Text style={{ fontWeight: 'bold' }}>Atenção:</Text> ao executar esta função, sua localização será usada para fins de registro e processamento conforme descrito em nossos Termos de Uso e Política de Privacidade.
        </Text>
      </ScrollView>
    </View>
  );
}

const stylesTelaDenuncia = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1a1a',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoTopo: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  bold: {
    fontWeight: 'bold',
  },
  formContainer: {
    backgroundColor: '#f2c300',
    borderRadius: 20,
    padding: 24,
    paddingTop: 70,
    width: '100%',
    alignItems: 'center',
    gap: 20,
    position: 'relative',
  },
  logo: {
    width: 60,
    height: 60,
    position: 'absolute',
    top: -25,
    backgroundColor: '#1e1a1a',
    borderRadius: 30,
    padding: 8,
  },
  inputWrapper: {
    backgroundColor: '#f2c300',
    borderColor: '#1e1a1a',
    borderWidth: 1,
    borderRadius: 30,
    width: '100%',
    paddingHorizontal: 10,
  },
  picker: {
    height: 50,
    color: '#000',
    width: '100%',
  },
  input: {
    backgroundColor: '#f2c300',
    borderColor: '#1e1a1a',
    borderWidth: 1,
    borderRadius: 30,
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 12,
    color: '#000',
    fontSize: 16,
    textAlignVertical: 'top',
  },
  inputIcon: {
    backgroundColor: '#f2c300',
    borderColor: '#1e1a1a',
    borderWidth: 1,
    borderRadius: 30,
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#555',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#1e1a1a',
    paddingVertical: 14,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#f2c300',
    fontWeight: 'bold',
    fontSize: 16,
  },
  aviso: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 30,
    paddingHorizontal: 20,
  },
});
