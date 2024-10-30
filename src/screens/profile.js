import React, { useContext, useEffect, useState } from 'react'; // Importar useEffect
import { Button, StyleSheet, Text, View } from 'react-native';
import { UserContext } from '../../UserContext';

export default function Profile() {
  const { userId, setUserId } = useContext(UserContext);
  const [usuario, setUsuario] = useState({});
  const urlUsuario = `http://localhost:3000/Usuario/${userId}`;

  useEffect(() => {
    if (userId) {
      getApiUsuario();
    }
  }, [userId]);

  const getApiUsuario = async () => {
    fetch(urlUsuario)
      .then((response) => response.json())
      .then((dataApi) => setUsuario(dataApi))
      .catch((error) => console.log(error));
  };
  const handleLogout = () => {
    setUserId(null);
    navigation.navigate('Ingreso');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Detalle de mi cuenta</Text>
      <View style={styles.detailItem}>
        <Text style={styles.label}>Nombre:</Text>
        <Text style={styles.value}>{usuario.nombre}</Text>
      </View>
      <View style={styles.detailItem}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{usuario.email}</Text>
      </View>
      <View style={styles.detailItem}>
        <Text style={styles.label}>Número de cuenta:</Text>
        <Text style={styles.value}>{usuario.numero_cuenta}</Text>
      </View>
      <View style={styles.detailItem}>
        <Text style={styles.label}>Tipo:</Text>
        <Text style={styles.value}>{usuario.tipo}</Text>
      </View>
      <Button style={styles.button} title='Cerrar sesion' onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f6f9', // Fondo claro
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004b8d', // Azul oscuro
    textAlign: 'center',
    marginBottom: 30,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc', // Borde gris claro
  },
  label: {
    fontSize: 18,
    color: '#666666', // Color gris suave
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#004b8d', // Azul oscuro para los valores
  },
  button: {
    backgroundColor: '#f4f6f9',
    color: '#fff',
    borderRadius: 4,
    marginBottom: 20,
  },
});
