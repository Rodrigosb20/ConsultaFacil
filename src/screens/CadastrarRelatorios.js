import React, { useState } from 'react'
import { ScrollView, Alert, View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native'
import firebase from '../database/firebase'

export default function MenuPrincipal(props) {

  const [state, setState] = useState([])
  // const { categoria } = props.route.params
  const [nomePaciente, setNomePaciente] = useState('')
  const [descricao, setDescricao] = useState('')
  const [observacao, setObservacao] = useState('')

  async function cadastrar() {
    const dados = {
      nomePaciente: nomePaciente,
      descricao: descricao,
      observacao: observacao
    }
    
    try {
      await firebase.db.collection('relatorio').add(dados)
      Alert.alert('AVISO', 'Salvo com sucesso')

      //navigation.navigate('MenuPrincipal')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <ScrollView>
      <View style={styles.container}  >
        <TextInput style={styles.input} value={nomePaciente} placeholder='Nome do Paciente' autoCorrect={false} onChangeText={(value) => setNomePaciente(value)} />
        <TextInput style={styles.input} value={descricao} placeholder='Descrição' autoCorrect={false} onChangeText={(value) => setDescricao(value)} />
        <TextInput style={styles.input} value={observacao} placeholder='Observação' autoCorrect={false} onChangeText={(value) => setObservacao(value)} />
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
