import React, { useContext, useEffect, useState } from 'react'; // Importar useEffect
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { UserContext } from '../../UserContext';
export default function Report() {
  const { userId } = useContext(UserContext);
  const [prestamo, setPrestamo] = useState([]);
  const [reporte, setReporte] = useState([]);

  const urlPrestamo = `http://localhost:3000/Prestamo/${userId}`;
  const urlReporte = `http://localhost:3000/Reporte/${userId}`;

  useEffect(() => {
    if (userId) {
      getApiPrestamo();
      getApiReporte();
    }
  }, [userId]);

  const getApiPrestamo = async () => {
    fetch(urlPrestamo)
      .then((response) => response.json())
      .then((dataApi) => setPrestamo(dataApi))
      .catch((error) => console.log(error));
  };

  const getApiReporte = async () => {
    fetch(urlReporte)
      .then((response) => response.json())
      .then((dataApi) => setReporte(dataApi))
      .catch((error) => console.log(error));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Detalle de mi cuenta</Text>
      <View style={styles.detailItem}>
        <Text style={styles.label}>Total ingresos:</Text>
        <Text style={styles.value}>{reporte.length > 0 ? reporte[0].historico_ingresos : 'No disponible'}</Text>
      </View>
      <View style={styles.detailItem}>
        <Text style={styles.label}>Total egresos:</Text>
        <Text style={styles.value}>{reporte.length > 0 ? reporte[0].historico_egresos : 'No disponible'}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.header}>Historial de prestamos</Text>
        {prestamo.length > 0 ? (
          <FlatList
            style={{ flex: 1 }}
            data={prestamo}
            extraData={prestamo}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.prestamoItem}>
                <Text style={styles.prestamoAmount}>{item.monto}</Text>
                <Text style={styles.prestamoDescription}>{item.plazo}</Text>
                <Text style={styles.prestamoDescription}>{item.estado}</Text>
                <Text>{item.fecha_solicitud.substring(0, 10)}</Text>
              </View>
            )}
          />
        ) : (
          <Text>No hay prestamos registrados</Text>
        )}
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
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  label: {
    fontSize: 18,
    color: '#666666',
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#004b8d',
  },
  prestamoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  prestamoDescription: {
    fontSize: 16,
    color: '#004b8d',
  },
  prestamoAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0078d4',
  },
});
