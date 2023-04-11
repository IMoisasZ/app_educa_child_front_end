import React, { useContext, useEffect, useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native"
import { AuthContext } from "../contexts/auth"
import { listKinship } from "../utils/defaultList"
import UserAccountEdit from "./UserAccountEdit"
import * as Animatable from "react-native-animatable"

export default function UserAccount() {
  const { logOut, userLogned } = useContext(AuthContext)

  useEffect(() => {
    setName(userLogned.name)
    setLastName(userLogned.lastName)
    setNickname(userLogned.nickName)
    setEmail(userLogned.email)
    setPassword("*****")
    setKinship(kinshipUser.description)
  }, [])

  const [name, setName] = useState("")
  const [lastName, setLastName] = useState("")
  const [nickname, setNickname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [kinship, setKinship] = useState({
    description: "Parentesco",
    icon: "account-multiple",
  })
  const [status, setStatus] = useState("user")

  // list kinship
  const kinshipUser = listKinship.find(
    (item) => item.id === userLogned.kinship_id
  )

  return (
    <View style={styles.container}>
      {status === "user" ? (
        <>
          <Animatable.View
            animation='fadeInLeft'
            delay={500}
            style={styles.containerHeader}>
            <Text style={styles.message}>Dados do usuário</Text>
          </Animatable.View>
          <Animatable.View style={styles.containerForm} animation='fadeInUp'>
            <Text style={styles.title}>Nome</Text>
            <TextInput style={styles.input} value={name} editable={false} />

            <Text style={styles.title}>Sobrenome</Text>
            <TextInput style={styles.input} value={lastName} editable={false} />

            <Text style={styles.title}>Apelido</Text>
            <TextInput style={styles.input} value={nickname} editable={false} />

            <Text style={styles.title}>Email</Text>
            <TextInput style={styles.input} value={email} editable={false} />

            <Text style={styles.title}>Parentesco</Text>
            <TextInput style={styles.input} value={kinship} editable={false} />

            <Text style={styles.title}>Senha</Text>
            <TextInput style={styles.input} value={password} editable={false} />

            <TouchableOpacity
              style={styles.button}
              onPress={() => setStatus("editUser")}>
              <Text style={styles.buttonText}>Editar Usuário</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => logOut()}>
              <Text style={styles.buttonText}>Sair</Text>
            </TouchableOpacity>
          </Animatable.View>
        </>
      ) : (
        <UserAccountEdit user={userLogned} status={setStatus} />
      )}
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
  viewDate: {
    width: "30%",
  },
  dataPicker: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FFFAFA",
    padding: "5%",
    borderRadius: 10,
  },
  titleDate: {
    fontSize: 18,
    marginTop: 15,
    fontWeight: "500",
    width: "100%",
    textAlign: "center",
  },
  inputDate: {
    borderBottomWidth: 1,
    height: 60,
    marginBottom: 12,
    fontSize: 16,
    textAlign: "center",
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
  buttonPatch: {
    backgroundColor: "#DAA520",
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
  childList: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
})
