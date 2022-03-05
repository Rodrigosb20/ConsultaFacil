import React, { useState, useEffect } from 'react'
import { ScrollView, Alert, Linking, Picker, Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import firebase from '../database/firebase'

export default function MenuPrincipal(props) {

  const [state, setState] = useState([])
  const [paciente, setPaciente] = useState('')
  const [pacienteDB, setPacienteDB] = useState('')
  const [descricao, setDescricao] = useState('')
  const [observacao, setObservacao] = useState('')
  // const { categoria } = props.route.params

  useEffect(() => {
    firebase.db.collection('usuario').onSnapshot((querySnapshot) => {
      const firebase = []
      querySnapshot.docs.forEach((doc) => {
        const { nomeCliente } = doc.data()

        firebase.push({ id: doc.id, nomeCliente })
      })
      setState(firebase)
    })
  }, [])


  async function buscaPaciente(id) {
    const dbRef = firebase.db.collection('usuario').doc(id)
    const doc = await dbRef.get()
    const paciente = doc.data()
    setPacienteDB({ ...paciente, id: doc.id })
    // setLoading(false)
  }



  async function cadastrar() {
    const dados = {
      nomePaciente: pacienteDB.nomeCliente,
      descricao: descricao,
      observacao: observacao
    }

    buscaPaciente(paciente)


    try {
      await firebase.db.collection('exame').add(dados)
      Alert.alert('AVISO', 'Salvo com sucesso')
      Linking.canOpenURL("whatsapp://send?text=oi").then(supported => {
        if (supported) {
          return Linking.openURL(
            `whatsapp://send?phone=${pacienteDB.telefone}&text=Olá ${pacienteDB.nomeCliente}, você tem um novo exame agendado, entre no nosso aplicativo(Consulta Fácil) para conferir!`
          );
        } else {
          return Linking.openURL(
            `https://api.whatsapp.com/send?phone=${pacienteDB.telefone}&text=Olá ${pacienteDB.nomeCliente}, você tem um novo exame agendado, entre no nosso aplicativo(Consulta Fácil) para conferir!`
          );
        }
      }) 
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <ScrollView>
      <View style={styles.container}  >
        <Picker
          selectedValue={paciente}
          style={{ height: 50, width: 280 }}
          onValueChange={(itemValue, itemIndex) => setPaciente(itemValue)}
        >
          <Picker.Item label="Não selecionou o paciente!" value="" />
          {state.map((item, i) => (
            <Picker.Item key={i} label={item.nomeCliente} value={item.id} />
          ))}
        </Picker>
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
