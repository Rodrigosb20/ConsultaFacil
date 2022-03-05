import React, { useState, useEffect } from 'react'
import { ScrollView } from 'react-native'
import { Button, ListItem } from 'react-native-elements'
import { Title } from 'react-native-paper'
import firebase from '../database/firebase'

export default function MenuPrincipal(props) {

  const [state, setState] = useState([])
  // const { categoria } = props.route.params

  useEffect(() => {
    firebase.db.collection('medico').onSnapshot((querySnapshot) => {
      const firebase = []
      querySnapshot.docs.forEach((doc) => {
        const { nomeMedico, crm, email, telefone } = doc.data()
        firebase.push({ id: doc.id, crm, nomeMedico, email, telefone })
      })
      setState(firebase)
    })
  }, [])
  return (
    <ScrollView>
      <Button color='#015227' title='CADASTRAR NOVO' onPress={() => props.navigation.navigate('CadastrarMedicos')} />
      {
        state.map((item, i) => (
          <ListItem key={i} bottomDivider>
            <ListItem.Content>
              <Title>Nome do Médico: {item.nomeMedico}</Title>
              <Title>CRM do Médico: {item.crm}</Title>
              <Title>Email do Médico: {item.email}</Title>
              <Title>Telefone do Médico: {item.telefone}</Title>

            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        ))
      }
    </ScrollView>

  )
}
