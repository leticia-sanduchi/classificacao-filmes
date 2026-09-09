import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FilmeCard from '../componentes/FilmeCard';

const CHAVE_STORAGE = '@cinelist_filmes';

export default function HomeScreen({ navigation }) {
  const [filmes, setFilmes] = useState([]);
  const [filtro, setFiltro] = useState('Assistir');
  const [carregou, setCarregou] = useState(false);

useFocusEffect(
  React.useCallback(() => {
    async function carregarFilmes() {
      try {
        const dados = await AsyncStorage.getItem(CHAVE_STORAGE);

        if (dados) {
          setFilmes(JSON.parse(dados));
        } else {
          setFilmes([]);
        }
      } catch (error) {
        console.log('Erro ao buscar filmes:', error);
      }
    }

    carregarFilmes();
  }, [])
);

  function filmesFiltrados() {
    return filmes.filter((filme) => filme.status === filtro);
  }

  function excluirFilme(id) {
    Alert.alert(
      'Excluir filme',
      'Tem certeza que deseja excluir?',
      [
        { text: 'Cancelar' },
        {
          text: 'Excluir',
          onPress: () => {
            setFilmes((atuais) => {
              const novaLista = atuais.filter((filme) => filme.id !== id);

              AsyncStorage.setItem(
                CHAVE_STORAGE,
                JSON.stringify(novaLista)
              );

              return novaLista;
            });
          },
        },
      ]
    );
  }

  function alterarStatus(filme) {
    let novoStatus;

    if (filme.status === 'Assistir') {
      novoStatus = 'Assistindo';
    } else if (filme.status === 'Assistindo') {
      novoStatus = 'Assistido';
    } else {
      novoStatus = 'Assistir';
    }

    setFilmes((atuais) => {
      const novaLista = atuais.map((item) => {
        if (item.id === filme.id) {
          return {
            ...item,
            status: novoStatus,
            nota: novoStatus === 'Assistido' ? item.nota : null,
          };
        }

        return item;
      });

      AsyncStorage.setItem(
        CHAVE_STORAGE,
        JSON.stringify(novaLista)
      );

      return novaLista;
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>🎬 Meus Filmes</Text>

      <View style={styles.filtros}>
        <TouchableOpacity onPress={() => setFiltro('Assistir')}>
          <Text style={filtro === 'Assistir' ? styles.ativo : styles.filtro}>
            Assistir
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setFiltro('Assistindo')}>
          <Text style={filtro === 'Assistindo' ? styles.ativo : styles.filtro}>
            Assistindo
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setFiltro('Assistido')}>
          <Text style={filtro === 'Assistido' ? styles.ativo : styles.filtro}>
            Assistidos
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filmesFiltrados()}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <FilmeCard
            filme={item}
            onExcluir={() => excluirFilme(item.id)}
            onStatus={() => alterarStatus(item)}
            onEditar={() =>
              navigation.navigate('Cadastro', {
                filme: item,
              })
            }
          />
        )}
        ListEmptyComponent={
          <Text style={styles.vazio}>
            Nenhum filme nessa categoria.
          </Text>
        }
      />

      <TouchableOpacity
        style={styles.adicionar}
        onPress={() => navigation.navigate('Cadastro')}
      >
        <Text style={styles.adicionarTexto}>＋ Adicionar filme</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  filtros: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  filtro: {
    padding: 10,
  },
  ativo: {
    padding: 10,
    fontWeight: 'bold',
  },
  vazio: {
    textAlign: 'center',
    marginTop: 30,
  },
  adicionar: {
    padding: 15,
    alignItems: 'center',
  },
  adicionarTexto: {
    fontSize: 17,
    fontWeight: 'bold',
  },
});