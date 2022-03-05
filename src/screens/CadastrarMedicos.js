import React, { useState } from 'react'
import { ScrollView, Alert, View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native'
import firebase from '../database/firebase'

export default function MenuPrincipal(props) {

  const [state, setState] = useState([])
  // const { categoria } = props.route.params
  const [nomeMedico, setNomeMedico] = useState('')
  const [crm, setCRM] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  async function cadastrar() {
    const dados = {
      nomeMedico: nomeMedico,
      crm: crm,
      email: email,
      telefone: telefone
    }
    
      try {
      await firebase.db.collection('medico').add(dados)
      Alert.alert('AVISO', 'Salvo com sucesso')

      //navigation.navigate('MenuPrincipal')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <ScrollView>
      <View style={styles.container}  >
        <TextInput style={styles.input} value={nomeMedico} placeholder='Nome do Médico' autoCorrect={false} onChangeText={(value) => setNomeMedico(value)} />
        <TextInput style={styles.input} value={crm} placeholder='CRM' autoCorrect={false} onChangeText={(value) => setCRM(value)} />
        <TextInput style={styles.input} value={email} placeholder='Email' autoCorrect={false} onChangeText={(value) => setEmail(value)} />
        <TextInput style={styles.input} value={telefone} placeholder='Telefone' autoCorrect={false} onChangeText={(value) => setTelefone(value)} />
        <TouchableOpacity style={styles.btnSubmit} onPress={cadastrar}>
          <Text style={styles.submitText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>

  )
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2a94d333'
  },
  containerLogo: {
    paddingBottom: 50,
    paddingTop: 30,
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    paddingBottom: 50,
    paddingTop: 30,
  },
  input: {
    backgroundColor: '#FFF',
    marginBottom: 15,
    height: 40,
    padding: 10,
    width: '90%',
    color: '#222',
    fontSize: 17,
    borderRadius: 7
  },
  btnSubmit: {
    backgroundColor: '#2a94d3',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    height: 40,
    borderRadius: 7
  },
  submitText: {
    color: '#FFF',
    fontSize: 18
  },
  btnRegister: {
    marginTop: 20,
  },
  registerText: {
    color: '#FFF'
  }

})
