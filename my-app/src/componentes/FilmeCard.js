import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function FilmeCard({ filme, onEditar, onExcluir, onStatus }) {
return (
  <View style={styles.card}>
    <View style={styles.cabecalho}>
      <Text style={styles.titulo}>{filme.titulo}</Text>

      <View style={styles.status}>
        <Text style={styles.statusTexto}>
          {filme.status}
        </Text>
      </View>
    </View>

    <Text style={styles.genero}>
      {filme.genero}
    </Text>

    {filme.status === "Assistido" && (
      <Text style={styles.nota}>
        ⭐ {filme.nota}/5
      </Text>
    )}

    <View style={styles.botoes}>
      <TouchableOpacity
        style={styles.botao}
        onPress={onStatus}
      >
        <Text style={styles.botaoTexto}>
          Alterar status
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botao}
        onPress={onEditar}
      >
        <Text style={styles.botaoTexto}>
          Editar
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoExcluir}
        onPress={onExcluir}
      >
        <Text style={styles.excluirTexto}>
          Excluir
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);
}

const styles = StyleSheet.create({
  card: {
    padding: 18,
    marginBottom: 12,
    backgroundColor: "#1E293B",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#334155",
  },

  cabecalho: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },

  titulo: {
    flex: 1,
    fontSize: 19,
    fontWeight: "bold",
    color: "#F8FAFC",
  },

  genero: {
    marginTop: 6,
    fontSize: 14,
    color: "#94A3B8",
  },

  status: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: "#312E81",
  },

  statusTexto: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#C7D2FE",
  },

  nota: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "bold",
    color: "#F8FAFC",
  },

  botoes: {
    flexDirection: "row",
    gap: 8,
    marginTop: 16,
  },

  botao: {
    flex: 1,
    paddingVertical: 9,
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "#334155",
  },

  botaoTexto: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#E2E8F0",
  },

  botaoExcluir: {
    flex: 1,
    paddingVertical: 9,
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "#3F1D2E",
  },

  excluirTexto: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#FDA4AF",
  },
});