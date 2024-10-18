import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Text, TextInput, View } from 'react-native-web';
export default function Login() {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Estebanquito</Text>
      <TextInput style={styles.input} placeholder='Usuario' value={username} onChangeText={setUsername} />
      <TextInput
        style={styles.input}
        placeholder='Contraseña'
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button style={styles.button} title='Ingresar' />
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
    backgroundColor: '#f4f6f9', // Fondo blanco grisáceo
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: '#004b8d', // Azul oscuro
  },
  input: {
    height: 50,
    borderColor: '#004b8d', // Azul oscuro
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#ffffff', // Fondo blanco
  },
  button: {
    backgroundColor: '#0078d4', // Azul vibrante para el botón
    color: '#ffffff',
    borderRadius: 10,
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
    color: '#666666', // Texto más suave para el mensaje
  },
});
