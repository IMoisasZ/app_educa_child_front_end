import React, { useState, useContext, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import { AuthContext } from "../contexts/auth"
import { showToast } from "../utils/toast"
import * as Animatable from "react-native-animatable"

export default function SignIn() {
  // usestate
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // context
  const { login } = useContext(AuthContext)

  // navigation
  const navigation = useNavigation()

  // functions
  const handleAuth = async () => {
    if (!email) {
      return showToast("Email não informado!")
    }
    try {
      login(email, password)
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
          onChangeText={(e) => setEmail(e)}
          keyboardType='email-address'
        />

        <Text style={styles.title}>Senha</Text>
        <TextInput
          placeholder='Sua senha'
          style={styles.input}
          value={password}
          onChangeText={(e) => setPassword(e)}
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
