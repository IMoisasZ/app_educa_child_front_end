import React, { useState, useEffect, useContext } from "react"
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native"
import { List } from "react-native-paper"
import DatePicker from "../components/DatePicker"
import Select from "../components/Select"
import api from "../api/api"
import { AuthContext } from "../contexts/auth"
import { showToast } from "../utils/toast"
import { genderList } from "../utils/defaultList"
import ChildList from "./ChildList"
import * as Animatable from "react-native-animatable"

export default function Child() {
  // useState
  const [childId, setChildId] = useState("")
  const [name, setName] = useState("")
  const [lastName, setLastName] = useState("")
  const [nickName, setNickName] = useState("")
  const [gender, setGender] = useState({
    icon: "human-male-female",
    gender: "Menino/Menina",
  })
  const [day, setDay] = useState("")
  const [month, setMonth] = useState("")
  const [year, setYear] = useState("")
  const [date, setDate] = useState("")
  const [type, setType] = useState("child")
  const [editChild, setEditChild] = useState("")
  const [typeHttp, setTypeHttp] = useState("post")
  const [messageDate, setMessageDate] = useState("")

  // context user logned
  const { userLogned, executeDashboard } = useContext(AuthContext)

  // create a child
  const handleCreateChild = async () => {
    handleCompleteDate()
    const newChild = {
      user_id: userLogned.id,
      name,
      lastName,
      nickName,
      gender_id: gender.gender === "Menino" ? 1 : 2,
      birthday: `${date.split("/")[2]}/${date.split("/")[1]}/${
        date.split("/")[0]
      }`,
    }
    if (typeHttp === "post") {
      try {
        await api.post("child", newChild)
        showToast(`Filho incluído com sucesso!`)
        setTimeout(() => {
          handleClear()
          executeDashboard()
        }, 2000)
      } catch (error) {
        showToast(error.response.data.msg)
      }
    } else {
      const childEditing = { id: childId, ...newChild }
      try {
        await api.patch("child", childEditing)
        showToast(`Filho alterado com sucesso!`)
        setTimeout(() => {
          handleClear()
          executeDashboard()
        }, 2000)
      } catch (error) {}
    }
  }

  // clear the fields of child
  const handleClear = () => {
    setName("")
    setLastName("")
    setNickName("")
    setGender({
      icon: "human-male-female",
      gender: "Menino/Menina",
    })
    setDay("")
    setMonth("")
    setYear("")
    setDate("")
    setEditChild("")
    setType("child")
    setTypeHttp("post")
    setMessageDate("")
  }

  useEffect(() => {
    if (editChild) {
      setName(editChild.name)
      setLastName(editChild.lastName)
      setNickName(editChild.nickName)
      setGender({
        icon: editChild.gender_id === 1 ? "face-man" : "face-woman",
        gender: editChild.gender_id === 1 ? "Menino" : "Menina",
      })
      setDate(
        `${editChild.birthday.split("-")[2].substring(0, 2).toString()}/${
          editChild.birthday.split("-")[1]
        }/${editChild.birthday.split("-")[0]}`
      )
      setDay("")
      setMonth("")
      setYear("")
      setChildId(editChild.id)
    }
  }, [editChild])

  const handleCompleteDate = () => {
    setMessageDate("")
    setDate("")
    if (day && month && year) {
      const data = `${year}/${month}/${day}`
      if (new Date(data).getDate() === Number(day)) {
        setDate(`${day}/${month}/${year}`)
      } else {
        setMessageDate("Data inválida!")
      }
    }
  }

  return (
    <>
      {type === "child" ? (
        <ScrollView>
          <View style={styles.container} setType={setType}>
            <Animatable.View
              style={styles.containerHeader}
              animation='fadeInLeft'
              delay={500}>
              <Text style={styles.message}>
                Preencha os dados abaixo para incluir uma criança
              </Text>
            </Animatable.View>

            <Animatable.View style={styles.containerForm} animation='fadeInUp'>
              <Text style={styles.title}>Nome</Text>
              <TextInput
                style={styles.input}
                placeholder='Digite o nome da criança'
                value={name}
                onChangeText={(e) => setName(e)}
                focusable={true}
              />

              <Text style={styles.title}>Sobrenome</Text>
              <TextInput
                style={styles.input}
                placeholder='Digite o sobrenome da criança'
                value={lastName}
                onChangeText={(e) => setLastName(e)}
              />

              <Text style={styles.title}>Apelido</Text>
              <TextInput
                style={styles.input}
                placeholder='Digite o apelido da criança'
                value={nickName}
                onChangeText={(e) => setNickName(e)}
              />

              <Select
                name={gender.gender}
                value={gender.gender}
                icon={gender.icon}>
                {genderList.map((item, index) => {
                  return (
                    <List.Item
                      key={index}
                      title={item.gender}
                      value={index}
                      onPress={() =>
                        setGender({ icon: item.icon, gender: item.gender })
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
              <DatePicker
                dateEvent={
                  date ? `Data de Nascimento: ${date}` : "Data de Nascimento: "
                }
                valueDay={day}
                handleDay={(e) => setDay(e)}
                handleCompleteDateDay={handleCompleteDate}
                valueMonth={month}
                handleMonth={(e) => setMonth(e)}
                handleCompleteDateMonth={handleCompleteDate}
                valueYear={year}
                handleYear={(e) => setYear(e)}
                handleCompleteDateYear={handleCompleteDate}
                handleDate={() => handleCompleteDate()}
              />
              {messageDate ? (
                <Text style={styles.dataMessage}>{messageDate}</Text>
              ) : (
                ""
              )}

              <TouchableOpacity
                onPress={handleCreateChild}
                style={
                  typeHttp === "patch" ? [styles.buttonPatch] : [styles.button]
                }>
                <Text style={styles.buttonText}>
                  {typeHttp === "post" ? "Incluir" : "Editar"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setType("list")}
                style={styles.button}>
                <Text style={styles.buttonText}>
                  {type === "child" ? "Minhas crianças" : "Incluir criança"}
                </Text>
              </TouchableOpacity>
            </Animatable.View>
          </View>
        </ScrollView>
      ) : (
        <View style={styles.container}>
          <ChildList
            setType={setType}
            editChild={setEditChild}
            typeHttp={setTypeHttp}
            clear={handleClear}
          />
        </View>
      )}
    </>
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
  dataMessage: {
    color: "#FF6347",
    fontWeight: "500",
  },
})
