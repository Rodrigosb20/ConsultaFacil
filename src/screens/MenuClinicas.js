import React, { useState, useEffect } from 'react'
import { ScrollView } from 'react-native'
import { Button, ListItem } from 'react-native-elements'
import { Title } from 'react-native-paper'
import firebase from '../database/firebase'

export default function MenuPrincipal(props) {

  const [state, setState] = useState([])
  // const { categoria } = props.route.params

  useEffect(() => {
    firebase.db.collection('clinica').onSnapshot((querySnapshot) => {
      const firebase = []
      querySnapshot.docs.forEach((doc) => {
        const { nomeClinica,email, rua, numero, bairro } = doc.data()

        firebase.push({ id: doc.id, nomeClinica,email, rua, numero, bairro })
      })
      setState(firebase)
    })
  }, [])
  return (
    <ScrollView>
      <Button color='#015227' title='CADASTRAR NOVO' onPress={() => props.navigation.navigate('CadastrarClinicas')} />
      {
        state.map((item, i) => (
          <ListItem key={i} bottomDivider>
            <ListItem.Content>
              <Title>Nome da clínica: {item.nomeClinica}</Title>
              <Title>Email: {item.email}</Title>
              <Title>Endereço: {item.rua} {item.numero} {item.bairro}</Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        ))
      }
    </ScrollView>

  )
}
