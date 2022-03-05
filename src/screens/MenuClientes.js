import React, { useState, useEffect } from 'react'
import { ScrollView } from 'react-native'
import { Button, ListItem } from 'react-native-elements'
import { Title } from 'react-native-paper'
import firebase from '../database/firebase'

export default function MenuPrincipal(props) {

  const [state, setState] = useState([])
  // const { categoria } = props.route.params

  useEffect(() => {
    firebase.db.collection('usuario').onSnapshot((querySnapshot) => {
      const firebase = []
      querySnapshot.docs.forEach((doc) => {
        const { nomeCliente,email,telefone } = doc.data()

        firebase.push({ id: doc.id, nomeCliente,email,telefone })
      })
      setState(firebase)
    })
  }, [])
  return (

    <ScrollView>
      <Button color='#015227' title='CADASTRAR NOVO' onPress={() => props.navigation.navigate('CadastrarClientes')} />
      {
        state.map((item, i) => (
          <ListItem key={i} bottomDivider>
            <ListItem.Content>
              <Title>Nome do Cliente: {item.nomeCliente}</Title>
              <Title>Email: {item.email}</Title>
              <Title>Telefone: {item.telefone}</Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        ))
      }
    </ScrollView>



  )
}
