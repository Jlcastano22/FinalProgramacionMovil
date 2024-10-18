import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native-web';

export default function Profile() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Detalle de mi cuenta</Text>
      <View style={styles.detailItem}>
        <Text style={styles.label}>Nombre:</Text>
        <Text style={styles.value}>Estebanquito</Text>
      </View>
      <View style={styles.detailItem}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>esteban@correo.com</Text>
      </View>
      <View style={styles.detailItem}>
        <Text style={styles.label}>Número de cuenta:</Text>
        <Text style={styles.value}>1234567890</Text>
      </View>
      <View style={styles.detailItem}>
        <Text style={styles.label}>Tipo:</Text>
        <Text style={styles.value}>Cuenta de ahorros</Text>
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
});
