import React from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Loan() {
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.header}>Deuda Actual</Text>
        <Text style={styles.debtAmount}>$1525.00</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.header}>Pedir préstamo</Text>
        <TextInput style={styles.input} placeholder='Cantidad' keyboardType='numeric' />
        <Button title='Confirmar' style={styles.button} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f6f9', // Fondo claro
  },
  section: {
    marginBottom: 30,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#004b8d', // Azul oscuro
    marginBottom: 10,
  },
  debtAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#d10000', // Rojo para el monto de deuda
  },
  input: {
    height: 50,
    borderColor: '#004b8d', // Azul oscuro para el borde
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#ffffff', // Fondo blanco para el input
  },
  button: {
    backgroundColor: '#0078d4', // Azul vibrante para el botón
    color: '#ffffff',
    borderRadius: 10,
    paddingVertical: 10,
  },
});
