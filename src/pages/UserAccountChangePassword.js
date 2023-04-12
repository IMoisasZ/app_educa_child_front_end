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

export default function UserAccountChangePassword({ statusChangePassword }) {
  const [password, setPassword] = useState("")
  const [confirmePassword, setConfirmPassword] = useState("")

  const { userLogned } = useContext(AuthContext)

  const handleOnChangePassword = () => {}
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
          value={confirmePassword}
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
