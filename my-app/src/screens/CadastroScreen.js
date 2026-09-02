import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CHAVE_STORAGE = '@cinelist_filmes';

export default function CadastroScreen({ navigation, route }) {
  const filmeEditar = route.params?.filme;

  const [titulo, setTitulo] = useState(filmeEditar?.titulo || '');
  const [genero, setGenero] = useState(filmeEditar?.genero || '');
  const [status, setStatus] = useState(filmeEditar?.status || 'Assistir');
  const [nota, setNota] = useState(filmeEditar?.nota || '');

  async function salvar() {
    if (!titulo || !genero) {
      Alert.alert('Atenção', 'Preencha o título e o gênero.');
      return;
    }

    if (status === 'Assistido' && !nota) {
      Alert.alert('Atenção', 'Digite uma nota para o filme.');
      return;
    }

    try {
      // Busca a lista atual salva no dispositivo
      const dados = await AsyncStorage.getItem(CHAVE_STORAGE);
      const filmes = dados ? JSON.parse(dados) : [];

      if (filmeEditar) {
        // Atualiza o filme existente
        const novaLista = filmes.map((filme) => {
          if (filme.id === filmeEditar.id) {
            return {
              ...filme,
              titulo,
              genero,
              status,
              nota: status === 'Assistido' ? nota : null,
            };
          }
          return filme;
        });

        await AsyncStorage.setItem(CHAVE_STORAGE, JSON.stringify(novaLista));
      } else {
        // Adiciona um filme novo
        const novoFilme = {
          id: Date.now(),
          titulo,
          genero,
          status,
          nota: status === 'Assistido' ? nota : null,
        };

        filmes.push(novoFilme);
        await AsyncStorage.setItem(CHAVE_STORAGE, JSON.stringify(filmes));
      }

      navigation.goBack();
    } catch (error) {
      console.log('Erro ao salvar no storage:', error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do filme"
        value={titulo}
        onChangeText={setTitulo}
      />

      <Text style={styles.label}>Gênero</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Terror, Ação, Comédia..."
        value={genero}
        onChangeText={setGenero}
      />

      <Text style={styles.label}>Status</Text>
      <View style={styles.status}>
        <TouchableOpacity onPress={() => setStatus('Assistir')}>
          <Text>🟡 Assistir</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setStatus('Assistindo')}>
          <Text>🔵 Assistindo</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setStatus('Assistido')}>
          <Text>🟢 Assistido</Text>
        </TouchableOpacity>
      </View>

      {status === 'Assistido' && (
        <>
          <Text style={styles.label}>Nota ⭐</Text>
          <TextInput
            style={styles.input}
            placeholder="De 1 a 5"
            keyboardType="numeric"
            value={nota.toString()}
            onChangeText={setNota}
          />
        </>
      )}

      <TouchableOpacity style={styles.salvar} onPress={salvar}>
        <Text style={styles.salvarTexto}>Salvar filme</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  },
  status: {
    gap: 15,
    marginTop: 10,
  },
  salvar: {
    marginTop: 30,
    padding: 15,
    alignItems: 'center',
  },
  salvarTexto: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});