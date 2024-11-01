import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { UserContext } from '../../UserContext';

export default function Acount() {
  const { userId } = useContext(UserContext);
  const [usuario, setUsuario] = useState({});
  const [transaccion, setTransaccion] = useState([]);
  const navigation = useNavigation();
  const urlBase = `http://localhost:3000/Usuario/${userId}`;
  const urlTransaccion = `http://localhost:3000/Transaccion/${userId}`;

  useEffect(() => {
    if (userId) {
      getApi();
      getApiTransaccion();
    }
  }, [userId]);

  const getApi = async () => {
    fetch(urlBase)
      .then((response) => response.json())
      .then((dataApi) => setUsuario(dataApi))
      .catch((error) => console.log(error));
  };

  const getApiTransaccion = async () => {
    fetch(urlTransaccion)
      .then((response) => response.json())
      .then((dataApi) => setTransaccion(dataApi))
      .catch((error) => console.log(error));
  };

  const transaccionesRelevantes = transaccion.filter((item) => item.id);
  
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Button title='Perfil' onPress={() => navigation.navigate('Perfil')} />
      </View>
      <View style={styles.balanceSection}>
        <Text style={styles.balanceLabel}>Tu saldo</Text>
        <Text style={styles.balance}>{usuario.saldo}</Text>
      </View>
      <View style={styles.sectionTransaccion}>
        <Text style={styles.header}>Transacciones</Text>
        {transaccionesRelevantes.length > 0 ? (
          <FlatList
            style={{ flex: 1 }}
            data={transaccion}
            extraData={transaccion}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.transactionItem}>
                <Text style={styles.transactionDescription}>{item.tipo}</Text>
                <Text style={styles.transactionAmount}>{item.monto}</Text>
                <Text>{item.fecha.substring(0, 10)}</Text>
              </View>
            )}
          />
        ) : (
          <Text>No hay transacciones disponibles</Text>
        )}
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
    backgroundColor: '#f4f6f9',
  },

  section: {
    marginBottom: 30,
  },
  sectionTransaccion: {
    marginBottom: 30,
    height: '50%',
    width: '100%',
  },
  balanceSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  balanceLabel: {
    fontSize: 18,
    color: '#666666',
    marginBottom: 5,
  },
  balance: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#004b8d',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#004b8d',
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
    color: '#004b8d',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0078d4',
  },
});
