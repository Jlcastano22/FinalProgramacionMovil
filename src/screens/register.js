import { StyleSheet } from 'react-native';
import { Button, Text, TextInput, View } from 'react-native-web';

export default function Register() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Registrate</Text>
      <TextInput style={styles.input} placeholder='Nombre' />
      <TextInput style={styles.input} placeholder='Telefono' />
      <TextInput style={styles.input} placeholder='Correo' />
      <TextInput style={styles.input} placeholder='Contraseña' secureTextEntry />
      <TextInput style={styles.input} placeholder='Tipo de cuenta' />
      <Button style={styles.button} title='Registrarse' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f4f6f9', // Fondo claro y limpio
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
    backgroundColor: '#ffffff', // Fondo blanco para inputs
  },
  button: {
    backgroundColor: '#0078d4', // Azul vibrante para el botón
    color: '#ffffff',
    borderRadius: 10,
    paddingVertical: 10,
  },
});
