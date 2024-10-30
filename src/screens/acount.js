import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react'; // Importar useEffect
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { UserContext } from '../../UserContext';

export default function Acount() {
  const { userId } = useContext(UserContext);
  const [usuario, setUsuario] = useState({});
  const navigation = useNavigation();
  const route = useRoute();
  const urlBase = `http://localhost:3000/Usuario/${userId}`;

  useEffect(() => {
    if (userId) {
      getApi();
    }
  }, [userId]);

  const getApi = async () => {
    try {
      const response = await fetch(urlBase);
      const dataApi = await response.json();
      setUsuario(dataApi);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Button title='Perfil' onPress={() => navigation.navigate('Perfil')} />
      </View>
      <View style={styles.balanceSection}>
        <Text style={styles.balanceLabel}>Tu saldo</Text>
        <Text style={styles.balance}>{usuario.saldo}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.header}>Transacciones</Text>
        <FlatList />
      </View>
      <View style={styles.section}>
        <Button title='Realizar transaccion' onPress={() => navigation.navigate('Transacciones')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f6f9', // Fondo gris claro
  },
  section: {
    marginBottom: 30,
  },
  balanceSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  balanceLabel: {
    fontSize: 18,
    color: '#666666', // Color gris para la etiqueta
    marginBottom: 5,
  },
  balance: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#004b8d', // Azul oscuro
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#004b8d', // Azul oscuro para encabezados
    marginBottom: 15,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  transactionDescription: {
    fontSize: 16,
    color: '#004b8d', // Azul oscuro
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0078d4', // Azul vibrante para los montos
  },
});
