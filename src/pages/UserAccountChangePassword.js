import React, { useState, useContext } from "react"
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native"
import * as Animatable from "react-native-animatable"
import { AuthContext } from "../contexts/auth"
import api from "../api/api"
import {
  getAuth,
  updatePassword,
  reauthenticateWithCredential,
} from "firebase/auth"
import { showToast } from "../utils/toast"

export default function UserAccountChangePassword({ statusChangePassword }) {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const auth = getAuth()
  const { userLogned } = useContext(AuthContext)
  const user = auth.currentUser
  console.log(user)

  const handleReautenticUser = () => {
    // TODO(you): prompt the user to re-provide their sign-in credentials
    const credential = promptForCredentials()
    reauthenticateWithCredential(user, credential)
      .then(() => {
        // User re-authenticated.
        console.log(user)
      })
      .catch((error) => {
        // An error ocurred
        // ...
        console.log({ error })
      })
  }

  const handleChagePasswordOnFirebase = () => {
    const newPassword = password
    updatePassword(user, newPassword)
      .then(() => {
        // Update successful.
        showToast("Senha alterada com sucesso!")
        setTimeout(() => {
          setPassword("")
          setConfirmPassword("")
          statusChangePassword("editUser")
        }, 2000)
      })
      .catch((error) => {
        // An error ocurred
        // ...
        console.log({ error })
      })
  }

  const handleOnChangePassword = async () => {
    if (!password) {
      return showToast("Senha não informada!")
    }
    if (!confirmPassword) {
      return showToast("A confirmação da senha não foi informada")
    }
    if (password !== confirmPassword) {
      return showToast("As senhas não conferem!")
    }
    try {
      await api.put("user", {
        id: userLogned.id,
        password,
        confirmPassword,
      })
      handleChagePasswordOnFirebase()
      handleReautenticUser()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <View style={styles.container}>
      <Animatable.View
        style={styles.containerHeader}
        animation='fadeInLeft'
        delay={500}>
        <Text style={styles.message}>Altere sua Senha</Text>
      </Animatable.View>

      <Animatable.View style={styles.containerForm} animation='fadeInUp'>
        <Text style={styles.title}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder='Digite seu email'
          value={userLogned.email}
          editable={false}
        />

        <Text style={styles.title}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder='Digite sua senha'
          value={password}
          onChangeText={(e) => setPassword(e)}
          secureTextEntry={true}
        />

        <Text style={styles.title}>Confirmar Senha</Text>
        <TextInput
          style={styles.input}
          placeholder='Confirme sua senha'
          value={confirmPassword}
          onChangeText={(e) => setConfirmPassword(e)}
          secureTextEntry={true}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleOnChangePassword}>
          <Text style={styles.buttonText}>Alterar Senha</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => statusChangePassword("editUser")}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerHeader: {
    marginTop: "5%",
    marginBottom: "8%",
    paddingStart: "5%",
    paddingEnd: "5%",
  },
  message: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "justify",
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
    fontSize: 18,
    marginTop: 15,
    fontWeight: "500",
    width: "100%",
  },
  input: {
    borderBottomWidth: 1,
    height: 30,
    marginBottom: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#9370DB",
    width: "100%",
    borderRadius: 10,
    paddingVertical: 8,
    marginTop: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  viewPassword: {
    width: "100%",
    flexDirection: "row",
  },
  viewInput: {
    width: "60%",
  },
  viewButton: {
    width: "40%",
  },
})
