import React, { useEffect, useState, useContext } from "react"
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native"
import Select from "../components/Select"
import { List } from "react-native-paper"
import { AuthContext } from "../contexts/auth"
import { listKinship } from "../utils/defaultList"
import { useNavigation } from "@react-navigation/native"
import UserAccountChangePassword from "./UserAccountChangePassword"
import * as Animatable from "react-native-animatable"
import api from "../api/api"
import { showToast } from "../utils/toast"

export default function UserAccountEdit({ user, status }) {
  const [name, setName] = useState("")
  const [lastname, setLastname] = useState("")
  const [nickname, setNickname] = useState("")
  const [email, setEmail] = useState("")
  const [kinship, setKinship] = useState({ id: "", description: "Parentesco" })
  const [statusChangePassword, setStatusChangePassword] = useState("editUser")

  useEffect(() => {
    setName(user.name)
    setLastname(user.lastName)
    setNickname(user.nickName)
    setEmail(user.email)
    const dataKinship = listKinship.find((it) => it.id === user.kinship_id)
    setKinship({ id: dataKinship.id, description: dataKinship.description })
  }, [])

  const { userLogned } = useContext(AuthContext)

  // navigation
  const navigation = useNavigation()

  const handleChangeUser = async () => {
    const userData = {
      id: userLogned.id,
      id_user_firebase: userLogned.id_user_firebase,
      name,
      lastName: lastname,
      nickName: nickname,
      kinship_id: kinship.id,
      email,
    }
    try {
      await api.patch(`/user`, userData)
      showToast("Dados do usuário alterado com sucesso!")
      setTimeout(() => {
        status("user")
      }, 2000)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.container}>
      {statusChangePassword === "editUser" ? (
        <>
          <Animatable.View
            style={styles.containerHeader}
            animation='fadeInLeft'
            delay={500}>
            <Text style={styles.message}>Edite seus dados</Text>
          </Animatable.View>

          <Animatable.View style={styles.containerForm} animation='fadeInUp'>
            <Text style={styles.title}>Nome</Text>
            <TextInput
              style={styles.input}
              placeholder='Digite o nome'
              value={name}
              onChangeText={(e) => setName(e)}
            />

            <Text style={styles.title}>Sobrenome</Text>
            <TextInput
              style={styles.input}
              placeholder='Digite o sobrenome'
              value={lastname}
              onChangeText={(e) => setLastname(e)}
            />

            <Text style={styles.title}>Apelido</Text>
            <TextInput
              style={styles.input}
              placeholder='Digite o apelido'
              value={nickname}
              onChangeText={(e) => setNickname(e)}
            />

            <Text style={styles.title}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder='Digite o email'
              value={email}
              onChangeText={(e) => setEmail(e)}
            />

            <View style={styles.viewPassword}>
              <View style={styles.viewInput}>
                <Text style={styles.title}>Senha</Text>
                <TextInput
                  style={styles.input}
                  placeholder='Digite o password'
                  value='***'
                  secureTextEntry={true}
                  editable={false}
                />
              </View>
              <View style={styles.viewButton}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => setStatusChangePassword("changePass")}>
                  <Text style={styles.buttonText}>Alterar Senha</Text>
                </TouchableOpacity>
              </View>
            </View>

            <Select
              name={kinship.description}
              value={kinship.description}
              icon={kinship.icon}>
              {listKinship.map((item, index) => {
                return (
                  <List.Item
                    key={index}
                    title={item.description}
                    value={item.id}
                    onPress={() =>
                      setKinship({
                        id: item.id,
                        description: item.description,
                      })
                    }
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
            <TouchableOpacity style={styles.button} onPress={handleChangeUser}>
              <Text style={styles.buttonText}>Alterar Dados</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => status("user")}>
              <Text style={styles.buttonText}>Dados do Usuário</Text>
            </TouchableOpacity>
          </Animatable.View>
        </>
      ) : (
        <UserAccountChangePassword
          statusChangePassword={setStatusChangePassword}
        />
      )}
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
