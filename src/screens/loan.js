import React, { useContext, useEffect, useState } from 'react'; // Importar useEffect
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { UserContext } from '../../UserContext';

export default function Loan() {
  const { userId } = useContext(UserContext);
  const [prestramo, setPrestamo] = useState({});
  const urlPrestamo = `http://localhost:3000/Prestamo/${userId}`;

  useEffect(() => {
    if (userId) {
      getApiPrestamo();
    }
  }, [userId]);

  const getApiPrestamo = async () => {
    fetch(urlPrestamo)
      .then((response) => response.json())
      .then((dataApi) => setPrestamo(dataApi))
      .catch((error) => console.log(error));
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.header}>Deuda Actual</Text>
        <Text style={styles.debtAmount}>{prestramo.monto}</Text>
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
    backgroundColor: '#f4f6f9',
  },
  section: {
    marginBottom: 30,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#004b8d', 
    marginBottom: 10,
  },
  debtAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#d10000',
  },
  input: {
    height: 50,
    borderColor: '#004b8d', 
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#ffffff', 
  },
  button: {
    backgroundColor: '#0078d4', 
    color: '#ffffff',
    borderRadius: 10,
    paddingVertical: 10,
  },
});
