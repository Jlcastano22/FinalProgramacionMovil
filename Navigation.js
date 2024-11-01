import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet } from 'react-native';
//screens
import Acount from './src/screens/acount';
import Loan from './src/screens/loan';
import Login from './src/screens/login';
import Profile from './src/screens/profile';
import Register from './src/screens/register';
import Report from './src/screens/report';
import Transactions from './src/screens/transactions';

const TabNav = createBottomTabNavigator();
const LoginStack = createNativeStackNavigator();
const AcountStack = createNativeStackNavigator();

export function LoginStackScreen() {
  return (
    <LoginStack.Navigator initialRouteName='Ingreso'>
      <LoginStack.Screen
        name='Ingreso'
        component={Login}
        options={{ headerStyle: styles.header, headerTitleStyle: styles.headerTitle }}
      />
      <LoginStack.Screen
        name='Registrarse'
        component={Register}
        options={{ headerStyle: styles.header, headerTitleStyle: styles.headerTitle, headerTintColor: 'blue' }}
      />
      <LoginStack.Screen
        name='RoutingTabs'
        component={RoutingTabs}
        options={{ headerShown: false, headerBackTitleVisible: false }}
      />
    </LoginStack.Navigator>
  );
}

export function AcountStackScreen() {
  return (
    <AcountStack.Navigator initialRouteName='Cuenta'>
      <AcountStack.Screen
        name='Cuenta'
        component={Acount}
        options={{ headerStyle: styles.header, headerTitleStyle: styles.headerTitle, headerBackTitleVisible: false }}
      />
      <AcountStack.Screen
        name='Perfil'
        component={Profile}
        options={{ headerStyle: styles.header, headerTitleStyle: styles.headerTitle, headerTintColor: 'blue' }}
      />
      <AcountStack.Screen
        name='Transacciones'
        component={Transactions}
        options={{ headerStyle: styles.header, headerTitleStyle: styles.headerTitle, headerTintColor: 'blue' }}
      />
    </AcountStack.Navigator>
  );
}

function RoutingTabs() {
  return (
    <TabNav.Navigator
      initialRouteName='Cuenta'
      screenOptions={{
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'black',
        tabBarStyle: styles.tabBar,
      }}
    >
      <TabNav.Screen
        name='Cuenta'
        component={AcountStackScreen}
        options={{
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name='face-man' size={24} color='gray' />,
          headerShown: false,
        }}
      />
      <TabNav.Screen
        name='Prestamo'
        component={Loan}
        options={{
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name='face-man' size={24} color='gray' />,
        }}
      />
      <TabNav.Screen
        name='Reporte'
        component={Report}
        options={{
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name='face-man' size={24} color='gray' />,
        }}
      />
    </TabNav.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <LoginStackScreen />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
  },
  headerTitle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 24,
  },
  tabBar: {
    backgroundColor: '',
    borderTopColor: 'blue',
  },
});
