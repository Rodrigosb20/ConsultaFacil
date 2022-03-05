import React from 'react'
import { Button, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { ListItem, } from 'react-native-elements'
import { Title } from 'react-native-paper'

export default function MenuPrincipal(props) {

  // const { categoria } = props.route.params
  const opcoesUsuario = [
    { title: 'Agendamentos', route: 'MenuAgendamentos' },
    { title: 'Médicos', route: 'MenuMedicos' },
    { title: 'Clínicas', route: 'MenuClinicas' },
    { title: 'Pacientes', route: 'MenuClientes' },
    { title: 'Exames', route: 'MenuExames' },
    { title: 'Receitas', route: 'MenuReceitas' },
    // { title: 'Relatórios', route: 'MenuRelatorios' },
    // { title: 'Remédios', route: 'MenuRemedios' },
  ]

  return (
    <ScrollView>
      {
        opcoesUsuario.map((item, i) => (
          <TouchableOpacity onPress={() => props.navigation.navigate(item.route)}>
            <ListItem key={i} bottomDivider>
              <ListItem.Content>
                <Title>{item.title}</Title>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          </TouchableOpacity>
        ))
      }
    </ScrollView>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  button: {
    marginBottom: 15,
  }
})