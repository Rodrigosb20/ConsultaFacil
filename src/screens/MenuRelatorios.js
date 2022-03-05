import React, { useState, useEffect } from 'react'
import { ScrollView } from 'react-native'
import { Button, ListItem } from 'react-native-elements'
import { Title } from 'react-native-paper'
import firebase from '../database/firebase'

export default function MenuPrincipal(props) {

  const [state, setState] = useState([])
  // const { categoria } = props.route.params

  useEffect(() => {
    firebase.db.collection('relatorio').onSnapshot((querySnapshot) => {
      const firebase = []
      querySnapshot.docs.forEach((doc) => {
        const { descricao, nomePaciente, observacao } = doc.data()
        firebase.push({ id: doc.id, descricao, nomePaciente, observacao })
      })
      setState(firebase)
    })
  }, [])
  return (
    <ScrollView>
      <Button color='#015227' title='CADASTRAR NOVO' onPress={() => props.navigation.navigate('CadastrarRelatorios')} />
      {
        state.map((item, i) => (
          <ListItem key={i} bottomDivider>
            <ListItem.Content>
              <Title>Nome Paciente: {item.nomePaciente}</Title>
              <Title>Descrição: {item.descricao}</Title>
              <Title>Observação: {item.observacao}</Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        ))
      }
    </ScrollView>

  )
}
