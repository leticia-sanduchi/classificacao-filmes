import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';

export default function FilmeCard({ filme, onEditar, onExcluir, onStatus }) {
  const [modalVisivel, setModalVisivel] = useState(false);
return (
  <>
    <TouchableOpacity
      style={styles.card}
      onPress={() => setModalVisivel(true)}
      activeOpacity={0.8}
    >
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
    </TouchableOpacity>

    <Modal
      visible={modalVisivel}
      transparent
      animationType="fade"
      onRequestClose={() => setModalVisivel(false)}
    >
      <View style={styles.modalFundo}>
        <View style={styles.modal}>

          <Text style={styles.modalTitulo}>
            {filme.titulo}
          </Text>

          <Text style={styles.modalGenero}>
            {filme.genero}
          </Text>

          <Text style={styles.modalStatus}>
            {filme.status}
          </Text>

          {filme.status === "Assistido" && (
            <>
              <Text style={styles.modalNota}>
                ⭐ {filme.nota}/5
              </Text>

              <Text style={styles.modalReviewTitulo}>
                Minha review
              </Text>

              <Text style={styles.modalReview}>
                {filme.review || "Nenhum comentário foi adicionado."}
              </Text>
            </>
          )}

          <TouchableOpacity
            style={styles.fechar}
            onPress={() => setModalVisivel(false)}
          >
            <Text style={styles.fecharTexto}>
              Fechar
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  </>
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

    modalFundo: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.65)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  modal: {
    width: "100%",
    backgroundColor: "#1E293B",
    borderRadius: 18,
    padding: 22,
    borderWidth: 1,
    borderColor: "#334155",
  },

  modalTitulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#F8FAFC",
    marginBottom: 6,
  },

  modalGenero: {
    fontSize: 14,
    color: "#94A3B8",
    marginBottom: 14,
  },

  modalStatus: {
    alignSelf: "flex-start",
    backgroundColor: "#052E16",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 14,
    color: "#86EFAC",
    fontWeight: "bold",
  },

  modalNota: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#F8FAFC",
    marginBottom: 18,
  },

  modalReviewTitulo: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#F8FAFC",
    marginBottom: 6,
  },

  modalReview: {
    fontSize: 15,
    lineHeight: 22,
    color: "#CBD5E1",
    marginBottom: 20,
  },

  fechar: {
    backgroundColor: "#6366F1",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  fecharTexto: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 15,
  },
});