import React, { useState, useEffect, useContext } from "react"
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native"
import { List } from "react-native-paper"
import Input from "../components/Input"
import DatePicker from "../components/DatePicker"
import Button from "../components/Button"
import Select from "../components/Select"
import api from "../api/api"
import { AuthContext } from "../contexts/auth"
import { showToast } from "../utils/toast"
import { genderList } from "../utils/defaultList"
import ChildList from "./ChildList"
import { changeBirthday } from "../utils/alterDate"
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
  const [day, setDay] = useState(20)
  const [month, setMonth] = useState("")
  const [year, setYear] = useState("")
  const [date, setDate] = useState("")
  const [type, setType] = useState("child")
  const [editChild, setEditChild] = useState([])
  const [typeHttp, setTypeHttp] = useState("post")

  // context user logned
  const { userLogned } = useContext(AuthContext)
  console.log(userLogned.id)
  // create a child
  const handleCreateChild = async () => {
    const newChild = {
      user_id: userLogned.id,
      name,
      lastName,
      nickName,
      gender_id: gender === "menino" ? 1 : 2,
      birthday: date,
    }
    if (typeHttp === "post") {
      try {
        await api.post("child", newChild)
        showToast(`Filho incluído com sucesso!`)
        setTimeout(() => {
          handleClear()
        }, 2000)
      } catch (error) {
        console.log(error.response.data)
      }
    } else {
      const childEditing = { id: childId, ...newChild }
      try {
        await api.patch("child", childEditing)
        showToast(`Filho alterado com sucesso!`)
        setTimeout(() => {
          handleClear()
        }, 2000)
      } catch (error) {}
    }
  }

  // clear the fields of child
  const handleClear = () => {
    setName("")
    setLastName("")
    setNickName("")
    setDay("")
    setMonth("")
    setYear("")
    setDate("")
    setTypeHttp("post")
  }

  useEffect(() => {
    setName(editChild.name)
    setLastName(editChild.lastName)
    setNickName(editChild.nickName)
    setGender({
      icon: editChild.gender_id === 1 ? "face-man" : "face-woman",
      gender: editChild.gender_id === 1 ? "Menino" : "Menina",
    })
    setDay(Number(editChild.dayBirthday))
    setMonth(Number(editChild.monthBirthday))
    setYear(Number(editChild.yearBirthday))
    handleCompleteDate()
    setChildId(editChild.id)
  }, [editChild])

  const handleCompleteDate = () => {
    return `${day}/${month}/${year}`
  }

  console.debug("zzzzzzzzzzzzzzzzzz", name)
  return (
    <>
      {type === "child" ? (
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
            <View style={styles.dataPicker}>
              <View style={styles.viewDate}>
                <Text style={styles.titleDate}>Dia</Text>
                <TextInput
                  style={styles.inputDate}
                  placeholder='Dia'
                  value={day}
                  onChange={(e) => setDay(e)}
                  keyboardType='numeric'
                />
              </View>
              <View style={styles.viewDate}>
                <Text style={styles.titleDate}>Mês</Text>
                <TextInput
                  style={styles.inputDate}
                  placeholder='Mês'
                  value={month}
                  onChange={(e) => setMonth(e)}
                  keyboardType='numeric'
                />
              </View>
              <View style={styles.viewDate}>
                <Text style={styles.titleDate}>Ano</Text>
                <TextInput
                  style={styles.inputDate}
                  placeholder='Ano'
                  value={year}
                  onChange={(e) => setYear(e)}
                  keyboardType='numeric'
                />
              </View>
            </View>
            {/* <DatePicker
              dateEvent={
                typeHttp === "patch"
                  ? `Data de nascimento: ${day < 10 ? `0${day}` : day}/${
                      month < 10 ? `0${month}` : month
                    }/${year}`
                  : "Data de nascimento:"
              }
              valueDay={day}
              handleDay={(e) => setDay(e)}
              valueMonth={month}
              handleMonth={(e) => setMonth(e)}
              valueYear={year}
              handleYear={(e) => setYear(e)}
              handleDate={() => handleCompleteDate()}
            /> */}

            <TouchableOpacity
              onPress={() => handleCreateChild()}
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
})
