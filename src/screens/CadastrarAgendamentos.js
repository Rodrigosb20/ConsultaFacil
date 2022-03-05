import React, { useState, useEffect } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import { ScrollView, Picker, Alert, Linking, Button, Platform, View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native'
import firebase from '../database/firebase'

export default function MenuPrincipal(props) {

  const [nomePaciente, setNomePaciente] = useState('')
  const [pacienteDB, setPacienteDB] = useState('')
  const [state, setState] = useState([])
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


  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };


  async function buscaPaciente(id) {
    const dbRef = firebase.db.collection('usuario').doc(id)
    const doc = await dbRef.get()
    const paciente = doc.data()
    setPacienteDB({ ...paciente, id: doc.id })
    // setLoading(false)
  }

  async function cadastrar() {

    await buscaPaciente(nomePaciente)

    const dados = {
      nomePaciente: pacienteDB.nomeCliente,
      data: date.toLocaleDateString(), //converter data tipo date para data tipo string
      horario: date.toLocaleTimeString() //converter hora tipo date para hora tipo string
    }

    try {
      await firebase.db.collection('agendamento').add(dados)
      Alert.alert('AVISO', 'Salvo com sucesso')
      Linking.canOpenURL("whatsapp://send?text=oi").then(supported => {
        if (supported) {
          return Linking.openURL(
            `whatsapp://send?phone=${pacienteDB.telefone}&text=Olá ${pacienteDB.nomeCliente}, você tem um novo agendamento no dia ${date.toLocaleDateString()} às ${date.toLocaleTimeString()}, entre no nosso aplicativo(Consulta Fácil) para conferir!`
          );
        } else {
          return Linking.openURL(
            `https://api.whatsapp.com/send?phone=${pacienteDB.telefone}&text=Olá ${pacienteDB.nomeCliente}, você tem um novo agendamento no dia ${date.toLocaleDateString()} às ${date.toLocaleTimeString()}, entre no nosso aplicativo(Consulta Fácil) para conferir!`
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
        <Text style={{ fontSize: 18 }}>Selecione o paciente: </Text>
        <Picker
          selectedValue={nomePaciente}
          style={{ height: 50, width: 280 }}
          onValueChange={(itemValue, itemIndex) => setNomePaciente(itemValue)}
        >
          <Picker.Item label="Não selecionou o paciente!" value="" />

          {state.map((item, i) => (
            <Picker.Item key={i} label={item.nomeCliente} value={item.id} />
          ))}

        </Picker>
        <View>
          <View>
            <TouchableOpacity onPress={showDatepicker} >
              < Text style={{ fontSize: 18, marginBottom: 20 }}>Selecione a data da consulta</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={showTimepicker} >
              <Text style={{ fontSize: 18, marginBottom: 20 }}>Selecione o horário da consulta</Text>
            </TouchableOpacity>
          </View>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
        </View>
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