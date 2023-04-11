import React, { useState } from "react"
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native"
import Select from "../components/Select"
import { List } from "react-native-paper"
import { listKinship } from "../utils/defaultList"
import { useNavigation } from "@react-navigation/native"
import { showToast } from "../utils/toast"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { app } from "../configFirebase/config"
import api from "../api/api"
import * as Animatable from "react-native-animatable"

export default function User() {
  // initialize a config firebase
  const initializeApp = () => app
  initializeApp()
  const auth = getAuth()

  // useState
  const [name, setName] = useState("")
  const [lastName, setLastName] = useState("")
  const [nickName, setNickName] = useState("")
  const [email, setEmail] = useState("")
  const [kinship, setKinship] = useState({
    description: "Parentesco",
    icon: "account-multiple",
  })
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [userFirebase, setUserFirebase] = useState("")
  const [msgError, setMsgError] = useState("")

  // list kinship
  const handleChangeKinship = (item) => {
    setKinship({ id: item.id, description: item.description, icon: item.icon })
  }

  // navigation
  const navigation = useNavigation()

  // function to create an user into firebase
  const createUserFirebase = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        setUserFirebase(user)
        // ...
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        setMsgError({ ErrorCode: errorCode, MsgError: errorMessage })
        showToast(errorCode)
        // ..
      })
  }

  // create an user to mysql and firebase
  const createUser = async () => {
    createUserFirebase(email, password)
    const newUser = {
      user_id_firebase: userFirebase.uid,
      name,
      lastName,
      nickName,
      kinship_id: kinship.id,
      email,
      password,
      confirmPassword,
    }
    try {
      if (userFirebase.uid) {
        const response = await api.post(`/user`, newUser)
        console.debug("user", response)
        showToast("Usuário cadastrado com sucesso!")
        handleClear()
        navigation.navigate("SignIn")
      } else {
        showToast(`${msgError.ErrorCode} - ${msgError.MsgError}`)
      }
    } catch (error) {
      console.log({ error })
    }
  }

  const handleClear = () => {
    name = ""
    lastName = ""
    nickName = ""
    email = ""
    kinship = {
      description: "Parentesco",
      icon: "account-multiple",
    }
    password = ""
    confirmPassword = ""
    userFirebase = ""
    msgError = ""
  }

  return (
    <View style={styles.container}>
      <Animatable.View
        style={styles.containerHeader}
        animation='fadeInLeft'
        delay={500}>
        <Text style={styles.message}>Preencha os dados abaixo:</Text>
      </Animatable.View>

      <Animatable.View style={styles.containerForm} animation='fadeInUp'>
        <Text style={styles.title}>Nome</Text>
        <TextInput
          style={styles.input}
          placeholder='Digite seu nome'
          value={name}
          onChange={(e) => setName(e)}
          focusable={true}
        />

        <Text style={styles.title}>Sobrenome</Text>
        <TextInput
          style={styles.input}
          placeholder='Digite seu sobrenome'
          value={lastName}
          onChange={(e) => setLastName(e)}
        />

        <Text style={styles.title}>Apelido</Text>
        <TextInput
          style={styles.input}
          placeholder='Digite seu apelido'
          value={nickName}
          onChange={(e) => setNickName(e)}
        />

        <Text style={styles.title}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder='Digite seu email'
          value={email}
          onChange={(e) => setEmail(e)}
          keyboardType='email-address'
        />

        <View style={styles.select}>
          <Select
            name={kinship.description}
            value={kinship.description}
            icon={kinship.icon}>
            {listKinship.map((item) => {
              return (
                <List.Item
                  key={item.id}
                  title={item.description}
                  value={item.id}
                  onPress={() => handleChangeKinship(item)}
                  left={(props) => (
                    <List.Icon
                      {...props}
                      icon={item.icon}
                      color='#FFF'
                      style={styles.icon}
                    />
                  )}
                />
              )
            })}
          </Select>
        </View>
        <Text style={styles.title}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder='Digite sua senha'
          value={password}
          onChange={(e) => setPassword(e)}
          secureTextEntry={true}
        />

        <Text style={styles.title}>Confirmar a senha</Text>
        <TextInput
          style={styles.input}
          placeholder='Confirme sua senha'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e)}
          secureTextEntry={true}
        />

        <TouchableOpacity style={styles.button} onPress={createUser}>
          <Text style={styles.buttonText}>Cadastrar</Text>
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
    height: 35,
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
})
