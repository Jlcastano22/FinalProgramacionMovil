import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { Button, FlatList, Text, View } from 'react-native-web';

export default function Acount() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Button title='Perfil' onPress={() => navigation.navigate('Perfil')} />
      </View>
      <View style={styles.balanceSection}>
        <Text style={styles.balanceLabel}>Tu saldo</Text>
        <Text style={styles.balance}>5645.00</Text>
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
