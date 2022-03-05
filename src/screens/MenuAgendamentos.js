import React, { useState, useEffect } from 'react'
import { ScrollView } from 'react-native'
import { Button, ListItem } from 'react-native-elements'
import { Title } from 'react-native-paper'
import firebase from '../database/firebase'

export default function MenuPrincipal(props) {

  const [state, setState] = useState([])
  // const { categoria } = props.route.params

  useEffect(() => {
    firebase.db.collection('agendamento').onSnapshot((querySnapshot) => {
      const firebase = []
      querySnapshot.docs.forEach((doc) => {
        console.log(doc.data())
        const { data, nomePaciente, horario } = doc.data()
        firebase.push({ id: doc.id, data, nomePaciente, horario })
      })
      setState(firebase)
    })
  }, [])
  return (
    <ScrollView>
      <Button color='#015227' title='CADASTRAR NOVO' onPress={() => props.navigation.navigate('CadastrarAgendamentos')} />
      {
        state.map((item, i) => (
          <ListItem key={i} bottomDivider>
            <ListItem.Content>
              <Title>Nome do Paciente: {item.nomePaciente}</Title>
              <Title>Data da Consulta: {item.data}</Title>
              <Title>Hora da Consulta: {item.horario}</Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        ))
      }
    </ScrollView>

  )
}
