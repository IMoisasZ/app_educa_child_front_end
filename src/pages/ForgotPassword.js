import { useNavigation } from "@react-navigation/native"
import React, { useState } from "react"
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native"
import Button from "../components/Button"
import Input from "../components/Input"
import * as Animatable from "react-native-animatable"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")

  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <Animatable.View style={styles.containerHeader} animation='fadeInLeft'>
        <Text style={styles.message}>
          Digite o email cadastrado para que possamos enviar uma nova senha.
        </Text>
      </Animatable.View>

      <Animatable.View style={styles.containerForm} animation='fadeInUp'>
        <Text style={styles.title}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder='Digite o email cadastrado'
          value={email}
          onChange={(e) => setEmail(e)}
          keyboardType='email-address'
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("SignIn")}>
          <Text style={styles.buttonText}>Enviar</Text>
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
})
