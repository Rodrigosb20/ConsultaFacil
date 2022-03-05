import React from 'react';
import { StyleSheet } from 'react-native';

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Componentes GERAIS - COMUNS A TODOS OS PERFIS DE USUÁRIOS
import Entrar from './src/screens/Entrar'
import MenuPrincipal from './src/screens/MenuPrincipal'

import CadastrarAgendamentos from './src/screens/CadastrarAgendamentos'
import MenuAgendamentos from './src/screens/MenuAgendamentos'

import CadastrarClientes from './src/screens/CadastrarClientes'
import MenuClientes from './src/screens/MenuClientes'

import MenuClinicas from './src/screens/MenuClinicas'
import CadastrarClinicas from './src/screens/CadastrarClinicas'

import MenuExames from './src/screens/MenuExames'
import CadastrarExames from './src/screens/CadastrarExames'

import MenuMedicos from './src/screens/MenuMedicos'
import CadastrarMedicos from './src/screens/CadastrarMedicos'

import MenuReceitas from './src/screens/MenuReceitas'
import CadastrarReceitas from './src/screens/CadastrarReceitas'

// import MenuRelatorios from './src/screens/MenuRelatorios'
// import CadastrarRelatorios from './src/screens/CadastrarRelatorios'

import MenuRemedios from './src/screens/MenuRemedios'
import CadastrarRemedios from './src/screens/CadastrarRemedios'

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator initialRouteName='Entrar' screenOptions={{ headerStyle: { backgroundColor: '#2a94d3' }, headerTintColor: '#fff', headerTitleStyle: { fontWeight: 'bold' } }}  >
      {/* STACKS GERAIS */}
      <Stack.Screen name='Entrar' component={Entrar} options={{ title: 'Consulta Fácil' }} />
      <Stack.Screen name='MenuPrincipal' component={MenuPrincipal} options={{ title: 'Menu Principal' }} />

      {/* STACKS MENUS */}
      <Stack.Screen name='MenuAgendamentos' component={MenuAgendamentos} options={{ title: 'Agendamentos' }} />
      <Stack.Screen name='MenuClientes' component={MenuClientes} options={{ title: 'Pacientes ' }} />
      <Stack.Screen name='MenuClinicas' component={MenuClinicas} options={{ title: 'Clínicas' }} />
      <Stack.Screen name='MenuExames' component={MenuExames} options={{ title: 'Exames' }} />
      <Stack.Screen name='MenuMedicos' component={MenuMedicos} options={{ title: 'Médicos' }} />
      <Stack.Screen name='MenuReceitas' component={MenuReceitas} options={{ title: 'Receitas' }} />
      {/* <Stack.Screen name='MenuRelatorios' component={MenuRelatorios} options={{ title: 'Relatórios' }} /> */}
      <Stack.Screen name='MenuRemedios' component={MenuRemedios} options={{ title: 'Remédios' }} />

      {/* STACKS CADASTROS */}
      <Stack.Screen name='CadastrarAgendamentos' component={CadastrarAgendamentos} options={{ title: 'Agendamentos' }} />
      <Stack.Screen name='CadastrarClientes' component={CadastrarClientes} options={{ title: 'Pacientes ' }} />
      <Stack.Screen name='CadastrarClinicas' component={CadastrarClinicas} options={{ title: 'Clínicas' }} />
      <Stack.Screen name='CadastrarExames' component={CadastrarExames} options={{ title: 'Exames' }} />
      <Stack.Screen name='CadastrarMedicos' component={CadastrarMedicos} options={{ title: 'Médicos' }} />
      <Stack.Screen name='CadastrarReceitas' component={CadastrarReceitas} options={{ title: 'Receitas' }} />
      {/* <Stack.Screen name='CadastrarRelatorios' component={CadastrarRelatorios} options={{ title: 'Relatórios' }} /> */}
      <Stack.Screen name='CadastrarRemedios' component={CadastrarRemedios} options={{ title: 'Remédios' }} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}