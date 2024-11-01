import React, { useContext, useEffect, useState } from 'react'; // Importar useEffect
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { UserContext } from '../../UserContext';

export default function Loan() {
  const { userId } = useContext(UserContext);
  const [prestamo, setPrestamo] = useState([]);
  const [monto, setMonto] = useState(0);
  const [plazo, setPlazo] = useState(0);
  const [creacion, setCreacion] = useState('');
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

  const registrarPrestamo = () => {
    const fecha = new Date().toISOString().split('T')[0];
    fetch('http://localhost:3000/postPrestamo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cuenta_id: userId,
        monto: monto,
        plazo: plazo,
        estado: 'Aprobado',
        fecha: fecha,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCreacion('Transacción registrada exitosamente');
      })
      .catch((error) => {
        console.log(error);
        setCreacion('Error al registrar la transacción');
      });
  };

  const actualizarSaldo = (nuevoSaldo) => {
    fetch(`http://localhost:3000/putUsuario/${userId}/saldo`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nuevoSaldo }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCreacion('Saldo actualizado exitosamente');
      })
      .catch((error) => {
        console.log(error);
        setCreacion('Error al actualizar saldo');
      });
  };

  const actualizarIngreso = (nuevoIngreso) => {
    fetch(`http://localhost:3000/putReporte/${userId}/ingreso`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nuevoIngreso }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCreacion('Ingreso actualizado exitosamente');
      })
      .catch((error) => {
        console.log(error);
        setCreacion('Error al actualizar ingreso');
      });
  };

  const handleLoan = () => {
    registrarPrestamo();
    actualizarSaldo(monto);
    actualizarIngreso(monto);
  };

  const handleChangeMonto = (text) => {
    const numericText = text.replace(/[^0-9]/g, '');
    setMonto(text);
  };

  const handleChangePlazo = (text) => {
    const numericText = text.replace(/[^0-9]/g, '');
    setPlazo(text);
  };

  const sumaP = () => {
    let sumaPrestamo = 0;
    for (let i = 0; i < prestamo.length; i++) {
      sumaPrestamo += parseFloat(prestamo[i].monto);
    }
    return sumaPrestamo.toFixed(2);
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.header}>Deuda Actual</Text>
        {prestamo.length === 0 ? (
          <Text style={styles.debtAmount}>0</Text>
        ) : (
          <Text style={styles.debtAmount}>{sumaP()}</Text>
        )}
      </View>
      <View style={styles.section}>
        <Text style={styles.header}>Pedir préstamo</Text>
        <Text>Cantidad de dinero a prestar</Text>
        <TextInput
          style={styles.input}
          placeholder='Cantidad'
          keyboardType='numeric'
          onChangeText={handleChangeMonto}
        />
        <Text>Numero de cuotas</Text>
        <TextInput
          style={styles.input}
          placeholder='Numero de cuotas'
          keyboardType='numeric'
          onChangeText={handleChangePlazo}
        />
        <Button title='Confirmar' style={styles.button} onPress={handleLoan} />
        <Text>{creacion}</Text>
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
