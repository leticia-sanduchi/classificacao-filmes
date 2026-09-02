import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function FilmeCard({ filme, onEditar, onExcluir, onStatus }) {
  return (
    <View style={styles.card}>
      <Text style={styles.titulo}>{filme.titulo}</Text>
      <Text>{filme.genero}</Text>
      <Text>Status: {filme.status}</Text>

      {filme.status === 'Assistido' && (
        <Text>⭐ Nota: {filme.nota}/5</Text>
      )}

      <View style={styles.botoes}>
        <TouchableOpacity onPress={onStatus}>
          <Text style={styles.botao}>Alterar status</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onEditar}>
          <Text style={styles.botao}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onExcluir}>
          <Text style={styles.excluir}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#eee',
    borderRadius: 10,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  botoes: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  botao: {
    fontWeight: 'bold',
  },
  excluir: {
    color: 'red',
    fontWeight: 'bold',
  },
});