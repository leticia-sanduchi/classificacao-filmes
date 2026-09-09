import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CHAVE_STORAGE = "@cinelist_filmes";

export default function CadastroScreen({ navigation, route }) {
  const filmeEditar = route.params?.filme;

  const [titulo, setTitulo] = useState(filmeEditar?.titulo || "");
  const [genero, setGenero] = useState(filmeEditar?.genero || "");
  const [status, setStatus] = useState(
    filmeEditar?.status || "Assistir"
  );

  const [nota, setNota] = useState(
    filmeEditar?.nota !== undefined && filmeEditar?.nota !== null
      ? String(filmeEditar.nota)
      : ""
  );

  async function salvar() {
    if (!titulo || !genero) {
      Alert.alert("Atenção", "Preencha o título e o gênero.");
      return;
    }

    if (status === "Assistido" && !nota) {
      Alert.alert("Atenção", "Digite uma nota para o filme.");
      return;
    }

    try {
      const dados = await AsyncStorage.getItem(CHAVE_STORAGE);
      const filmes = dados ? JSON.parse(dados) : [];

      if (filmeEditar) {
        const novaLista = filmes.map((filme) => {
          if (filme.id === filmeEditar.id) {
            return {
              ...filme,
              titulo,
              genero,
              status,
              nota: status === "Assistido" ? nota : null,
            };
          }

          return filme;
        });

        await AsyncStorage.setItem(
          CHAVE_STORAGE,
          JSON.stringify(novaLista)
        );
      } else {
        const novoFilme = {
          id: Date.now(),
          titulo,
          genero,
          status,
          nota: status === "Assistido" ? nota : null,
        };

        filmes.push(novoFilme);

        await AsyncStorage.setItem(
          CHAVE_STORAGE,
          JSON.stringify(filmes)
        );
      }

      navigation.goBack();
    } catch (error) {
      console.log("Erro ao salvar no storage:", error);
    }
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.label}>Título</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome do filme"
        placeholderTextColor="#999"
        value={titulo}
        onChangeText={setTitulo}
      />

      <Text style={styles.label}>Gênero</Text>

      <TextInput
        style={styles.input}
        placeholder="Ex: Terror, Ação, Comédia..."
        placeholderTextColor="#999"
        value={genero}
        onChangeText={setGenero}
      />

      <Text style={styles.label}>Status</Text>

      <View style={styles.statusContainer}>
        <TouchableOpacity
          style={[
            styles.statusButton,
            status === "Assistir" && styles.statusAssistirAtivo,
          ]}
          onPress={() => setStatus("Assistir")}
        >
          <Text
            style={[
              styles.statusText,
              status === "Assistir" && styles.statusTextAtivo,
            ]}
          >
            🟡 Assistir
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.statusButton,
            status === "Assistindo" && styles.statusAssistindoAtivo,
          ]}
          onPress={() => setStatus("Assistindo")}
        >
          <Text
            style={[
              styles.statusText,
              status === "Assistindo" && styles.statusTextAtivo,
            ]}
          >
            🔵 Assistindo
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.statusButton,
            status === "Assistido" && styles.statusAssistidoAtivo,
          ]}
          onPress={() => setStatus("Assistido")}
        >
          <Text
            style={[
              styles.statusText,
              status === "Assistido" && styles.statusTextAtivo,
            ]}
          >
            🟢 Assistido
          </Text>
        </TouchableOpacity>
      </View>

      {status === "Assistido" && (
        <>
          <Text style={styles.label}>Nota ⭐</Text>

          <TextInput
            style={styles.input}
            placeholder="De 1 a 5"
            placeholderTextColor="#999"
            keyboardType="decimal-pad"
            value={nota}
            onChangeText={(texto) => {
              // Aceita vírgula ou ponto
              const valor = texto.replace(",", ".");

              // Permite apagar
              if (valor === "") {
                setNota("");
                return;
              }

              // Permite apenas números e no máximo 1 casa decimal
              if (!/^\d*\.?\d{0,1}$/.test(valor)) {
                return;
              }

              // Não permite nota maior que 5
              if (Number(valor) > 5) {
                return;
              }

              setNota(valor);
            }}
          />
        </>
      )}

      <TouchableOpacity
        style={styles.salvar}
        onPress={salvar}
      >
        <Text style={styles.salvarTexto}>
          Salvar filme
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F9",
  },

  content: {
    padding: 20,
  },

  label: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#2C3E50",
    marginTop: 16,
    marginBottom: 6,
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E0E6ED",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: "#2C3E50",
  },

  statusContainer: {
    gap: 8,
    marginTop: 6,
  },

  statusButton: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E0E6ED",
    alignItems: "center",
  },

  statusAssistirAtivo: {
    backgroundColor: "#FFF9E6",
    borderColor: "#F1C40F",
  },

  statusAssistindoAtivo: {
    backgroundColor: "#EBF5FB",
    borderColor: "#3498DB",
  },

  statusAssistidoAtivo: {
    backgroundColor: "#E8F8F5",
    borderColor: "#2ECC71",
  },

  statusText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#7F8C8D",
  },

  statusTextAtivo: {
    color: "#2C3E50",
    fontWeight: "bold",
  },

  salvar: {
    marginTop: 32,
    backgroundColor: "#6C5CE7",
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#6C5CE7",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },

  salvarTexto: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#fff",
  },
});