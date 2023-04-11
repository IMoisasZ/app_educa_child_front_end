import React, { useState, useContext, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native"
import Container from "../components/Container"
import Input from "../components/Input"
// import Button from "../components/Button"
import Divider from "../components/Divider"
import { useNavigation } from "@react-navigation/native"
import { AuthContext } from "../contexts/auth"
import { showToast } from "../utils/toast"
import api from "../api/api"
import * as Animatable from "react-native-animatable"

export default function SignIn() {
  // usestate
  const [email, setEmail] = useState("mopri08@gmail.com")
  const [password, setPassword] = useState("123456")
  const [dataUser, setDataUser] = useState([])

  // context
  const { login } = useContext(AuthContext)

  // data user mysql
  const getDataUser = async () => {
    try {
      const response = await api.get(`/user?email=${email}`)
      setDataUser(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getDataUser()
  }, [email])

  // navigation
  const navigation = useNavigation()

  // functions
  const handleAuth = async () => {
    try {
      if (dataUser) {
        console.log(email, password, dataUser)
        login(email, password, dataUser)
      }
    } catch (error) {
      showToast(error)
    }
  }

  return (
    <View style={styles.container}>
      <Animatable.View
        animation='fadeInLeft'
        delay={500}
        style={styles.containerHeader}>
        <Text style={styles.message}>Bem vindo (a)</Text>
      </Animatable.View>

      <Animatable.View animation='fadeInUp' style={styles.containerForm}>
        <Text style={styles.title}>Email</Text>
        <TextInput
          placeholder='Digite um Email'
          style={styles.input}
          value={email}
          keyboardType='email-address'
        />

        <Text style={styles.title}>Senha</Text>
        <TextInput
          placeholder='Sua senha'
          style={styles.input}
          value={password}
          secureTextEntry={true}
        />

        <TouchableOpacity style={styles.button} onPress={() => handleAuth()}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.registerOrForgotButton}
          onPress={() => navigation.navigate("ForgotPassword")}>
          <Text style={styles.registerOrForgotButtonText}>
            Esqueceu a senha, clique aqui!
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.registerOrForgotButton}
          onPress={() => navigation.navigate("User")}>
          <Text style={styles.registerOrForgotButtonText}>
            Não tem cadastro, clique aqui e cadastre-se!
          </Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8A2BE2",
  },
  containerHeader: {
    marginTop: "14%",
    marginBottom: "8%",
    paddingStart: "5%",
  },
  message: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF",
  },
  containerForm: {
    backgroundColor: "#fff",
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: "5%",
    paddingEnd: "5%",
  },
  title: {
    fontSize: 20,
    marginTop: 28,
    fontWeight: "500",
  },
  input: {
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#8A2BE2",
    width: "100%",
    borderRadius: 10,
    paddingVertical: 8,
    marginTop: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  registerOrForgotButton: {
    marginTop: 14,
    alignSelf: "center",
  },
  registerOrForgotButtonText: {
    color: "#a1a1a1",
  },
})
