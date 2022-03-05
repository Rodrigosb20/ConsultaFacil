import React, { useState, useEffect } from 'react'
import { View, KeyboardAvoidingView, Image, TextInput, TouchableOpacity, Text, StyleSheet, Animated } from 'react-native'

import firebase from '../database/firebase'

export default function Entrar(props) {
  async function entrar () {
    props.navigation.navigate('MenuPrincipal', { categoria: 'USER' })
    
     
  }
  return (
    <KeyboardAvoidingView style={styles.background}>
      <View style={styles.containerLogo}>
        <Image style={{height:  100, width: 300 }} source={require('../assets/logo.png')} />
      </View>
      <View style={styles.container}  >
        <TextInput style={styles.input} placeholder='Email' autoCorrect={false} onChangeText={() => { }} />
        <TextInput style={styles.input} placeholder='Senha' autoCorrect={false} onChangeText={() => { }} />
        <TouchableOpacity style={styles.btnSubmit} onPress={ entrar }>
          <Text style={styles.submitText}>Acessar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnRegister}>
          <Text style={styles.registerText}>Criar conta gratuita</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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