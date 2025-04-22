import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';

export default function TelaDenuncia({ navigation }) {
  const [tipoIncidente, setTipoIncidente] = useState('');
  const [detalhes, setDetalhes] = useState('');
  const [imagem, setImagem] = useState(null);

  return (
    <View style={stylesTelaDenuncia.container}>
      <ScrollView contentContainerStyle={stylesTelaDenuncia.scrollContent}>
        <Text style={stylesTelaDenuncia.textoTopo}>
          Denuncie com <Text style={stylesTelaDenuncia.bold}>cuidado</Text>, se possível dê o <Text style={stylesTelaDenuncia.bold}>máximo de informações!</Text>
        </Text>
        <View style={stylesTelaDenuncia.formContainer}>
          <Image
            source={require('../assets/logo.png')}
            style={stylesTelaDenuncia.logo}
            resizeMode="contain"
          />
          <View style={stylesTelaDenuncia.inputWrapper}>
            <Picker
              selectedValue={tipoIncidente}
              onValueChange={(itemValue) => setTipoIncidente(itemValue)}
              style={stylesTelaDenuncia.picker}
              dropdownIconColor="#000"
            >
              <Picker.Item label="(Obrigatório)" value="" color="#666" />
              <Picker.Item label="Assalto" value="Homicídio" />
              <Picker.Item label="Vandalismo" value="Assalto" />
              <Picker.Item label="Agressão física" value="Agressão física" />
              <Picker.Item label="Estupro / abuso Sexual" value="Estupro / abuso Sexual" />
              <Picker.Item label="Vandalismo" value="Vandalismo" />
              <Picker.Item label="Arrombamento" value="Arrombamento" />
              <Picker.Item label="Disparo de arma de fogo" value="Disparo de arma de fogo" />
              <Picker.Item label="Acidente de trânsito" value="Acidente de trânsito" />
              <Picker.Item label="Corrida Clandestina" value="Corrida Clandestina" />
              <Picker.Item label="Tráfico" value="Tráfico" />
            </Picker>
          </View>
          <TextInput
            style={stylesTelaDenuncia.input}
            placeholder="Detalhes (Opcional)"
            placeholderTextColor="#555"
            multiline
            numberOfLines={3}
            value={detalhes}
            onChangeText={setDetalhes}
          />
          <TouchableOpacity style={stylesTelaDenuncia.inputIcon}>
            <Text style={stylesTelaDenuncia.placeholderText}>Imagem (Opcional)</Text>
            <Ionicons name="camera" size={20} color="#1e1a1a" />
          </TouchableOpacity>
          <TouchableOpacity style={stylesTelaDenuncia.button}>
            <Text style={stylesTelaDenuncia.buttonText}>Enviar Denúncia</Text>
          </TouchableOpacity>
        </View>
        <Text style={stylesTelaDenuncia.aviso}>
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
    fontSize: 20,
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
    top: 2,
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
    fontSize: 17,
  },
  aviso: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 30,
    paddingHorizontal: 20,
  },
});