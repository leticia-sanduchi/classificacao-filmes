import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  StatusBar,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FilmeCard from "../componentes/FilmeCard";

const CHAVE_STORAGE = "@cinelist_filmes";

export default function HomeScreen({ navigation }) {
  const [filmes, setFilmes] = useState([]);
  const [filtro, setFiltro] = useState("Assistir");

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
          console.log("Erro ao buscar filmes:", error);
        }
      }

      carregarFilmes();
    }, []),
  );

  function filmesFiltrados() {
    return filmes.filter((filme) => filme.status === filtro);
  }

  function excluirFilme(id) {
    Alert.alert("Excluir filme", "Tem certeza que deseja excluir?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: () => {
          setFilmes((atuais) => {
            const novaLista = atuais.filter((filme) => filme.id !== id);

            AsyncStorage.setItem(CHAVE_STORAGE, JSON.stringify(novaLista));

            return novaLista;
          });
        },
      },
    ]);
  }

  function alterarStatus(filme) {
    let novoStatus;

    if (filme.status === "Assistir") {
      novoStatus = "Assistindo";
    } else if (filme.status === "Assistindo") {
      novoStatus = "Assistido";
    } else {
      novoStatus = "Assistir";
    }

    setFilmes((atuais) => {
      const novaLista = atuais.map((item) => {
        if (item.id === filme.id) {
          return {
            ...item,
            status: novoStatus,
            nota: novoStatus === "Assistido" ? item.nota : null,
          };
        }

        return item;
      });

      AsyncStorage.setItem(CHAVE_STORAGE, JSON.stringify(novaLista));

      return novaLista;
    });
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />

      <Text style={styles.titulo}>🎬 Meus Filmes</Text>

      <View style={styles.filtros}>
        <TouchableOpacity
          style={[
            styles.botaoFiltro,
            filtro === "Assistir" && styles.botaoFiltroAtivo,
          ]}
          onPress={() => setFiltro("Assistir")}
        >
          <Text
            style={
              filtro === "Assistir" ? styles.textoAtivo : styles.textoFiltro
            }
          >
            Assistir
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.botaoFiltro,
            filtro === "Assistindo" && styles.botaoFiltroAtivo,
          ]}
          onPress={() => setFiltro("Assistindo")}
        >
          <Text
            style={
              filtro === "Assistindo" ? styles.textoAtivo : styles.textoFiltro
            }
          >
            Assistindo
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.botaoFiltro,
            filtro === "Assistido" && styles.botaoFiltroAtivo,
          ]}
          onPress={() => setFiltro("Assistido")}
        >
          <Text
            style={
              filtro === "Assistido" ? styles.textoAtivo : styles.textoFiltro
            }
          >
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
              navigation.navigate("Cadastro", {
                filme: item,
              })
            }
          />
        )}
        ListEmptyComponent={
          <Text style={styles.vazio}>Nenhum filme nessa categoria.</Text>
        }
      />

      <TouchableOpacity
        style={styles.adicionar}
        onPress={() => navigation.navigate("Cadastro")}
      >
        <Text style={styles.adicionarTexto}>＋ Adicionar filme</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#0F172A", // Azul escuro / Slate
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#F8FAFC",
    marginBottom: 20,
    marginTop: 10,
  },
  filtros: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#1E293B",
    padding: 6,
    borderRadius: 12,
    marginBottom: 20,
  },
  botaoFiltro: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 8,
  },
  botaoFiltroAtivo: {
    backgroundColor: "#6366F1", // Roxo/Índigo vibrante
  },
  textoFiltro: {
    color: "#94A3B8",
    fontWeight: "600",
    fontSize: 14,
  },
  textoAtivo: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
  },
  vazio: {
    textAlign: "center",
    marginTop: 40,
    color: "#64748B",
    fontSize: 15,
  },
  adicionar: {
    backgroundColor: "#6366F1",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#6366F1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  adicionarTexto: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  status: {
    gap: 10,
    marginTop: 10,
  },
  statusBotao: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#334155",
    backgroundColor: "#1E293B",
    borderRadius: 8,
  },
  statusSelecionado: {
    padding: 12,
    borderWidth: 2,
    borderColor: "#6366F1",
    borderRadius: 8,
    backgroundColor: "#312E81",
  },
});
