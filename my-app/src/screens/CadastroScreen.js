import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
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
  const [review, setReview] = useState(filmeEditar?.review || "");

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
              review: status === "Assistido" ? review : "",
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
          review: status === "Assistido" ? review : "",
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
      autoCapitalize="sentences"
    />

<View style={styles.pickerContainer}>
  <Picker
    selectedValue={genero}
    onValueChange={(itemValue) => setGenero(itemValue)}
    dropdownIconColor="#F8FAFC"
  >
    <Picker.Item label="Selecione um gênero" value="" color="#94A3B8"/>
    <Picker.Item label="Ação" value="Ação" />
    <Picker.Item label="Aventura" value="Aventura" />
    <Picker.Item label="Comédia" value="Comédia" />
    <Picker.Item label="Drama" value="Drama" />
    <Picker.Item label="Fantasia" value="Fantasia" />
    <Picker.Item label="Ficção científica" value="Ficção científica" />
    <Picker.Item label="Terror" value="Terror" />
    <Picker.Item label="Romance" value="Romance" />
    <Picker.Item label="Suspense" value="Suspense" />
    <Picker.Item label="Musical" value="Musical" />
    <Picker.Item label="Animação" value="Animação" />
    <Picker.Item label="Documentário" value="Documentário" />
  </Picker>
</View>

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

            <Text style={styles.label}>Review</Text>

            <TextInput
              style={[styles.input, styles.reviewInput]}
              placeholder="O que você achou do filme?"
              placeholderTextColor="#94A3B8"
              value={review}
              onChangeText={setReview}
              multiline
              maxLength={300}
            />

            <Text style={styles.contador}>
              {review.length}/300
            </Text>
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
    backgroundColor: "#0F172A",
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  label: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#F8FAFC",
    marginTop: 18,
    marginBottom: 8,
  },

  input: {
    backgroundColor: "#1E293B",
    borderWidth: 1,
    borderColor: "#334155",
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: "#F8FAFC",
  },

  reviewInput: {
    height: 100,
    textAlignVertical: "top",
  },

  statusContainer: {
    gap: 8,
    marginTop: 6,
  },

  statusButton: {
    paddingVertical: 13,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: "#1E293B",
    borderWidth: 1,
    borderColor: "#334155",
    alignItems: "center",
  },

  statusAssistirAtivo: {
    backgroundColor: "#422006",
    borderColor: "#F59E0B",
  },

  statusAssistindoAtivo: {
    backgroundColor: "#172554",
    borderColor: "#3B82F6",
  },

  statusAssistidoAtivo: {
    backgroundColor: "#172554",
    borderColor: "#22C55E",
  },

  statusText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#94A3B8",
  },

  statusTextAtivo: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },

  salvar: {
    marginTop: 30,
    backgroundColor: "#6366F1",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#6366F1",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },

  salvarTexto: {
    fontWeight: "bold",
    fontSize: 17,
    color: "#FFFFFF",
  },

  pickerContainer: {
    backgroundColor: "#1E293B",
    borderWidth: 1,
    borderColor: "#334155",
    borderRadius: 12,
    overflow: "hidden",
},

  contador: {
    textAlign: "right",
    marginTop: 4,
    color: "#94A3B8",
    fontSize: 12,
  },
});