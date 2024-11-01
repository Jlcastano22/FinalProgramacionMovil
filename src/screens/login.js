import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Image, StyleSheet, Text, TextInput, View } from 'react-native';
import { UserContext } from '../../UserContext';

export default function Login() {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usuario, setUsuario] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const { setUserId } = useContext(UserContext);
  const urlBase = 'http://localhost:3000/Usuario';

  useEffect(() => {
    getApi();
  }, []);

  const getApi = async () => {
    fetch(urlBase)
      .then((response) => response.json())
      .then((dataApi) => setUsuario(dataApi))
      .catch((error) => console.log(error));
  };

  const handleLogin = () => {
    const usuarioValido = usuario.find((user) => user.email === username && user.contraseña === password);
    if (usuarioValido) {
      setUserId(usuarioValido.id);
      navigation.replace('RoutingTabs');
    } else {
      setErrorMessage('Usuario o contraseña incorrectos');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={'/src/Images/Logo.png'} style={styles.image} />
      <Text>{errorMessage}</Text>
      <TextInput style={styles.input} placeholder='Usuario' value={username} onChangeText={setUsername} />
      <TextInput
        style={styles.input}
        placeholder='Contraseña'
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button style={styles.button} title='Ingresar' onPress={handleLogin} />
      <Text style={styles.footerText}>¿No tienes una cuenta?</Text>
      <Button style={styles.button} title='Registrarse' onPress={() => navigation.navigate('Registrarse')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f4f6f9',
    alignItems: 'stretch',
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
    backgroundColor: '#f4f6f9',
    color: '#fff',
    borderRadius: 4,
    marginBottom: 20,
  },
  footer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    marginRight: 10,
    color: '#666666',
  },
  image: {
    width: '100%',
    height: '35%',
    marginBottom: 50,
  },
});
