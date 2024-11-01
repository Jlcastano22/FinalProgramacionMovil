import { useState } from 'react';
import { Button, Picker, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Register() {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [Contrasena, setContrasena] = useState('');
  const [cuenta, setCuenta] = useState('');
  const [creacion, setCreacion] = useState('');

  const postUsuario = () => {
    fetch('http://localhost:3000/Usuario', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombre: nombre,
        email: correo,
        contraseña: Contrasena,
        numero_cuenta: telefono,
        tipo: cuenta,
        saldo: 0,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCreacion('Usuario registrado exitosamente');
      })
      .catch((error) => {
        console.log(error);
        setCreacion('Error al registrar usuario');
      });
  };

  const postReporte = () => {
    fetch('http://localhost:3000/postReporte', {
      method: 'POST',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCreacion('Usuario registrado exitosamente');
      })
      .catch((error) => {
        console.log(error);
        setCreacion('Error al registrar usuario');
      });
  };

  const handleRegister = () => {
    postUsuario();
    postReporte();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Registrate</Text>
      <Text>{creacion}</Text>
      <TextInput style={styles.input} placeholder='Nombre' value={nombre} onChangeText={setNombre} />
      <TextInput style={styles.input} placeholder='Telefono' value={telefono} onChangeText={setTelefono} />
      <TextInput style={styles.input} placeholder='Correo' value={correo} onChangeText={setCorreo} />
      <TextInput
        style={styles.input}
        placeholder='Contraseña'
        secureTextEntry
        value={Contrasena}
        onChangeText={setContrasena}
      />
      <Picker
        selectedValue={cuenta}
        style={styles.input}
        onValueChange={(itemValue, itemIndex) => setCuenta(itemValue)}
      >
        <Picker.Item label='Selecciona el tipo de cuenta' value='' />
        <Picker.Item label='Ahorro' value='ahorro' />
        <Picker.Item label='Corriente' value='corriente' />
      </Picker>

      <Button style={styles.button} title='Registrarse' onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f4f6f9',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: '#004b8d',
  },
  input: {
    height: 50,
    borderColor: '#004b8d',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#ffffff',
  },
  button: {
    backgroundColor: '#0078d4',
    color: '#ffffff',
    borderRadius: 10,
    paddingVertical: 10,
  },
});
