import React, { useState } from 'react'
import { ScrollView, Alert, View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native'
import firebase from '../database/firebase'

export default function MenuPrincipal(props) {


  const [nomeClinica, setNomeClinica] = useState('')
  const [email, setEmail] = useState('')
  const [rua, setRua] = useState('')
  const [numero, setNumero] = useState('')
  const [bairro, setBairro] = useState('')

  async function cadastrar() {
    const dados = {
      nomeClinica: nomeClinica,
      email: email,
      rua: rua,
      numero: numero,
      bairro: bairro
    }
    
    try {
      await firebase.db.collection('clinica').add(dados)
      Alert.alert('AVISO', 'Salvo com sucesso')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <ScrollView>
      <View style={styles.container}  >
        <TextInput style={styles.input} value={nomeClinica} placeholder='Nome da Clínica' autoCorrect={false} onChangeText={(value) => setNomeClinica(value)} />
        <TextInput style={styles.input} value={email} placeholder='Email' autoCorrect={false} onChangeText={(value) => setEmail(value)} />
        <TextInput style={styles.input} value={rua} placeholder='Nome da Rua' autoCorrect={false} onChangeText={(value) => setRua(value)} />
        <TextInput style={styles.input} value={numero} placeholder='Numero' autoCorrect={false} onChangeText={(value) => setNumero(value)} />
        <TextInput style={styles.input} value={bairro} placeholder='Bairro' autoCorrect={false} onChangeText={(value) => setBairro(value)} />
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
