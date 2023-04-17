import { useNavigation } from "@react-navigation/native"
import React, { useState } from "react"
import { showToast } from "../utils/toast"
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native"
import * as Animatable from "react-native-animatable"
import { sendPasswordResetEmail, getAuth } from "firebase/auth"
import api from "../api/api"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState(false)

  const auth = getAuth()

  const handleDataUser = async () => {
    try {
      const response = await api.get(`/user/email/email_user?email=${email}`)
      if (response.data.name) {
        setStatus(true)
      }
      return response.data
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleSendEmailForRedefinitionPassword = async (status) => {
    const response = await handleDataUser()
    console.log(response)
    if (response) {
      setStatus(true)
      sendPasswordResetEmail(auth, email)
        .then(() => {
          // Password reset email sent!
          // ..
          setTimeout(() => {
            setStatus(false)
            setEmail("")
          }, 5000)
        })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          // ..
        })
    } else {
      showToast("Email não cadastrado em nosso banco de dados!")
    }
  }

  return (
    <View style={styles.container}>
      <Animatable.View style={styles.containerHeader} animation='fadeInLeft'>
        <Text style={styles.message}>
          Digite o email cadastrado para redefinir sua senha.
        </Text>
      </Animatable.View>

      <Animatable.View style={styles.containerForm} animation='fadeInUp'>
        <Text style={styles.title}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder='Digite o email cadastrado'
          value={email}
          onChangeText={(e) => setEmail(e)}
          keyboardType='email-address'
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleSendEmailForRedefinitionPassword}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
        <View>
          {status === true && (
            <View style={styles.viewMessages}>
              <Text style={styles.textMessage}>
                * Email para recuperação de senha enviado com sucesso!
              </Text>
              <Text style={styles.textMessage}>
                * Verifique sua caixa de email.
              </Text>
              <Text style={styles.textMessage}>
                * Caso não tenha recebido o email, refaça o processo!
              </Text>
            </View>
          )}
        </View>
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
    marginTop: "5%",
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
    marginTop: 15,
    fontWeight: "500",
  },
  input: {
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 16,
  },
  text: {
    fontSize: 18,
    color: "#FFF",
    textAlign: "justify",
    padding: 0,
    marginBottom: 20,
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
  viewMessages: {
    justifyContent: "center",
  },
  textMessage: {
    marginTop: "3%",
    fontSize: 16,
    width: "100%",
    fontWeight: "600",
    color: "#8A2BE2",
    textAlign: "justify",
  },
})
