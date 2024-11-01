import React, { useContext, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { UserContext } from '../../UserContext';

export default function Transactions() {
  const { userId } = useContext(UserContext);
  const [montodeposito, setMontoDeposito] = useState(0);
  const [montoretiro, setMontoRetiro] = useState(0);
  const [montotransaccion, setMontoTransaccion] = useState(0);
  const [cuenta, setCuenta] = useState(0);
  const [creacion, setCreacion] = useState('');

  const postTransaccion = (tipo, monto) => {
    const fecha = new Date().toISOString().split('T')[0];
    fetch('http://localhost:3000/postTransaccion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cuenta_id: userId,
        tipo: tipo,
        monto: monto,
        fecha: fecha,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCreacion('Transacción registrada exitosamente');
        if (tipo === 'Deposito') {
          actualizarSaldo(monto);
          actualizarIngreso(monto);
        }
        if (tipo === 'Retiro') {
          actualizarSaldo(-monto);
          actualizarEgreso(monto);
        }
        if (tipo.includes('Envio a')) {
          actualizarSaldo(-monto);
          actualizarSaldoTransferencia(monto);
          postTransaccionTransferencia(`Recibe de ${userId}`, monto);
          actualizarIngresoTransferencia(monto);
          actualizarEgreso(monto);
        }
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

  const actualizarIngresoTransferencia = (nuevoIngreso) => {
    console.log(nuevoIngreso);
    console.log(cuenta);
    fetch(`http://localhost:3000/putReporte/${cuenta}/ingresobycuenta`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nuevoIngreso }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCreacion('Ingreso transferencia actualizado exitosamente');
      })
      .catch((error) => {
        console.log(error);
        setCreacion('Error al actualizar ingreso  transferencia');
      });
  };

  const actualizarEgreso = (nuevoEgreso) => {
    fetch(`http://localhost:3000/putReporte/${userId}/egreso`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nuevoEgreso }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCreacion('Egreso actualizado exitosamente');
      })
      .catch((error) => {
        console.log(error);
        setCreacion('Error al actualizar egreso');
      });
  };

  const postTransaccionTransferencia = (tipo, monto) => {
    const fecha = new Date().toISOString().split('T')[0];
    fetch('http://localhost:3000/postTransaccionTransferencia', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cuenta_id: cuenta,
        tipo: tipo,
        monto: monto,
        fecha: fecha,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCreacion('Transacción transferencia registrada exitosamente');
      })
      .catch((error) => {
        console.log(error);
        setCreacion('Error al registrar la transacción transferencia');
      });
  };

  const actualizarSaldoTransferencia = (nuevoSaldo) => {
    fetch(`http://localhost:3000/putUsuario/${cuenta}/saldobycuenta`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nuevoSaldo }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCreacion('Reporte actualizado exitosamente');
      })
      .catch((error) => {
        console.log(error);
        setCreacion('Error al actualizar reporte');
      });
  };

  const handleChangeMontoDeposito = (text) => {
    const numericText = text.replace(/[^0-9]/g, '');
    setMontoDeposito(text);
  };

  const handleChangeMontoRetiro = (text) => {
    const numericText = text.replace(/[^0-9]/g, '');
    setMontoRetiro(text);
  };

  const handleChangeMontoTransaccion = (text) => {
    const numericText = text.replace(/[^0-9]/g, '');
    setMontoTransaccion(text);
  };

  const handleChangeCuenta = (text) => {
    const numericText = text.replace(/[^0-9]/g, '');
    setCuenta(text);
  };
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.header}>Depositar dinero a mi cuenta</Text>
        <TextInput
          style={styles.input}
          keyboardType='numeric'
          placeholder='Cantidad'
          onChangeText={handleChangeMontoDeposito}
        />
        <Button title='Confirmar' style={styles.button} onPress={() => postTransaccion('Deposito', montodeposito)} />
      </View>
      <View style={styles.section}>
        <Text style={styles.header}>Retirar dinero</Text>
        <TextInput
          style={styles.input}
          keyboardType='numeric'
          placeholder='Cantidad'
          onChangeText={handleChangeMontoRetiro}
        />
        <Button title='Confirmar' style={styles.button} onPress={() => postTransaccion('Retiro', montoretiro)} />
      </View>
      <View style={styles.section}>
        <Text style={styles.header}>Transferir dinero a otra cuenta</Text>
        <TextInput
          style={styles.input}
          placeholder='Cantidad'
          keyboardType='numeric'
          onChangeText={handleChangeMontoTransaccion}
        />
        <TextInput
          style={styles.input}
          placeholder='Numero de cuenta'
          keyboardType='numeric'
          onChangeText={handleChangeCuenta}
        />
        <Button
          title='Confirmar'
          style={styles.button}
          onPress={() => postTransaccion(`Envio a ${cuenta}`, montotransaccion)}
        />
      </View>
      <Text>{creacion}</Text>
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
  input: {
    height: 40,
    borderColor: '#004b8d',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    backgroundColor: '#ffffff',
  },
  button: {
    backgroundColor: '#0078d4',
    color: '#ffffff',
    borderRadius: 10,
    paddingVertical: 5,
  },
});
