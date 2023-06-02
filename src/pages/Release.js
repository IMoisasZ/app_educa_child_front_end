import React, { useEffect, useState, useContext } from "react"
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native"
import { List } from "react-native-paper"
import Select from "../components/Select"
import Switch from "../components/Switch"
import DatePicker from "../components/DatePicker"
import ReleaseList from "./ReleaseList"
import { showToast } from "../utils/toast"
import { AuthContext } from "../contexts/auth"
import api from "../api/api"
import * as Animatable from "react-native-animatable"

export default function Release() {
  // useState
  const [idEventData, setIdEventData] = useState("")
  const [child, setChild] = useState({ id: "", name: "Criança" })
  const [listDataEvent, setListDataEvent] = useState([])
  const [listDataChildren, setListDataChildren] = useState([])
  const [description, setDescription] = useState("")
  const [background, setBackground] = useState("green")
  const [isSwitchOnMerito, setIsSwitchOnMerito] = useState(true)
  const [isSwitchOnDemerito, setIsSwitchOnDemerito] = useState(false)
  const [event, setEvent] = useState({
    description: "Evento",
    icon: "calendar",
  })
  const [day, setDay] = useState("")
  const [month, setMonth] = useState("")
  const [year, setYear] = useState("")
  const [date, setDate] = useState("")
  const [points, setPoints] = useState(0)
  const [screen, setScreen] = useState("release")
  const [gender, setGender] = useState("")
  const [editRelease, setEditRelease] = useState("")
  const [nameBtn, setNameBtn] = useState("Incluir Mérito")
  const [status, setStatus] = useState("normal")
  const [messageDate, setMessageDate] = useState("")

  // userContext
  const { userLogned, executeDashboard } = useContext(AuthContext)

  // userNavigation
  const user_id = userLogned.id

  // take all dataevents on the db
  const allDataEvents = async () => {
    try {
      const response = await api.get(`/event_data/all/${user_id}`)
      setListDataEvent(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  // take all children
  const allChildren = async () => {
    try {
      const response = await api.get(`/child/${user_id}`)
      setListDataChildren(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  // put on select the childreen and events
  useEffect(() => {
    allDataEvents()
    allChildren()
  }, [])

  console.log(typeof listDataEvent.child)
  console.log(typeof child.id)

  // datePicker
  useEffect(() => {
    if (day && month && year) {
      setDate(`${day}/${month}/${year}`)
    }
  }, [day, month, year])

  // meriter/demeriter
  // meriter
  const toggleSwitchMerito = () => {
    if (isSwitchOnMerito) {
      setIsSwitchOnMerito(false)
      setIsSwitchOnDemerito(true)
      setBackground("red")
      setNameBtn(status === "normal" ? "Incluir Demérito" : "Alterar Demérito")
    } else {
      setIsSwitchOnMerito(true)
      setIsSwitchOnDemerito(false)
      setBackground("green")
      setNameBtn(status === "normal" ? "Incluir Mérito" : "Alterar Mérito")
    }
  }
  // demeriter
  const toggleSwitchDemerito = () => {
    if (isSwitchOnDemerito) {
      setIsSwitchOnMerito(true)
      setIsSwitchOnDemerito(false)
      setBackground("green")
      setNameBtn(status === "normal" ? "Incluir Mérito" : "Alterar Mérito")
    } else {
      setIsSwitchOnMerito(false)
      setIsSwitchOnDemerito(true)
      setBackground("red")
      setNameBtn(status === "normal" ? "Incluir Demérito" : "Alterar Demérito")
    }
  }

  // function to create a release on db
  const handleCreateRelease = async () => {
    const newRelease = {
      user_id: userLogned.id,
      type: isSwitchOnDemerito ? "demerito" : "merito",
      child_id: child.id,
      event_id: event.id,
      date: `${date.split("/")[2]}/${date.split("/")[1]}/${date.split("/")[0]}`,
      description,
      point: points,
      idEventData,
    }
    if (editRelease === "") {
      try {
        await api.post("/release", newRelease)
        showToast(
          `${newRelease.type.toLocaleUpperCase()} realizado com sucesso!`
        )
        setTimeout(() => {
          handleClear()
          executeDashboard()
          allChildren()
        }, 2000)
      } catch (error) {
        showToast(error.response.data.msg)
      }
    } else {
      try {
        newRelease.id = editRelease.id
        await api.patch("/release", newRelease)
        showToast(
          `${newRelease.type.toLocaleUpperCase()} realizado com sucesso!`
        )
        setTimeout(() => {
          handleClear()
          executeDashboard()
        }, 2000)
      } catch (error) {
        showToast(error.response.data.msg)
      }
    }
  }

  // function to clear all fields of screen
  const handleClear = () => {
    setIdEventData("")
    setChild({ id: "", name: "Criança" })
    setListDataEvent([])
    setDescription("")
    setBackground("green")
    setIsSwitchOnMerito(true)
    setIsSwitchOnDemerito(false)
    setEvent({
      description: "Evento",
      icon: "calendar",
    })
    setDate("")
    setDay("")
    setMonth("")
    setYear("")
    setPoints(0)
    allDataEvents()
    setEditRelease("")
    setNameBtn("Incluir Mérito")
    setStatus("normal")
    setGender("")
    setMessageDate("")
  }

  useEffect(() => {
    if (editRelease !== "") {
      if (editRelease.type === "merito") {
        setIsSwitchOnMerito(true)
        setIsSwitchOnDemerito(false)
      } else {
        setIsSwitchOnMerito(false)
        setIsSwitchOnDemerito(true)
      }
      setChild({ id: editRelease.child.id, name: editRelease.child.name })
      setEvent({ description: editRelease.event.description, icon: "calendar" })
      setDay("")
      setMonth("")
      setYear("")
      setDate(
        `${editRelease.date.split("-")[2].substring(0, 2).toString()}/${
          editRelease.date.split("-")[1]
        }/${editRelease.date.split("-")[0]}`
      )
      setDescription(editRelease.description)
      setPoints(editRelease.point.toString())
      setGender(editRelease.child.gender_id)
      setIdEventData(editRelease.idEventData)
    }
  }, [editRelease])

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
    <KeyboardAvoidingView style={styles.container} behavior='height'>
      {screen === "release" ? (
        <ScrollView>
          <Animatable.View
            animation='fadeInLeft'
            delay={500}
            style={styles.containerHeader}>
            <Text style={styles.message}>
              Preencha os campos abaixo para definir pontos de Mérito ou
              Demérito para a criança
            </Text>
          </Animatable.View>
          <Animatable.View
            animation='fadeInUp'
            style={
              isSwitchOnMerito
                ? [styles.containerForm, { backgroundColor: "#3CB371" }]
                : [styles.containerForm, { backgroundColor: "#FA8072" }]
            }>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
              }}>
              <Switch
                value={isSwitchOnMerito}
                onToggleSwitch={toggleSwitchMerito}
                color='green'
                nameSwitch='Mérito'
              />

              <Switch
                value={isSwitchOnDemerito}
                onToggleSwitch={toggleSwitchDemerito}
                color='red'
                nameSwitch='Demérito'
              />
            </View>
            <Select name={child.name} value={child.id} icon='gift'>
              {listDataChildren.map((item) => {
                return (
                  <List.Item
                    key={item.id}
                    title={item.name}
                    value={item.id}
                    onPress={() => {
                      setChild({ id: item.id, name: item.name })
                      setIdEventData(item.id)
                      setGender(item.gender_id)
                      allDataEvents()
                    }}
                    left={(props) => (
                      <List.Icon
                        {...props}
                        icon='star'
                        color='#FFF'
                        style={styles.icon}
                      />
                    )}
                  />
                )
              })}
            </Select>

            <Select
              name={event.description}
              value={event.description}
              icon={event.icon}>
              {listDataEvent
                .filter((it) => it.child.id === child.id)
                .map((item) => {
                  return (
                    <List.Item
                      key={item.event.id}
                      title={item.event.event}
                      value={item.event.id}
                      onPress={() =>
                        setEvent({
                          id: item.event.id,
                          description: item.event.event,
                          icon: "check",
                        })
                      }
                      left={(props) => (
                        <List.Icon
                          {...props}
                          icon='star'
                          color='#FFF'
                          style={styles.icon}
                        />
                      )}
                    />
                  )
                })}
            </Select>
            <DatePicker
              dateEvent={date ? `Data: ${date}` : "Data: "}
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
            <Text style={styles.title}>Descrição</Text>
            <TextInput
              style={styles.input}
              value={description}
              onChangeText={(e) => setDescription(e)}
              placeholder='Digite a descrição do ocorrido'
              multiline={true}
              numberOfLines={2}
            />
            <Text style={styles.title}>
              {!isSwitchOnDemerito ? "Pontos de merito" : "Pontos de demerito"}
            </Text>
            <TextInput
              style={styles.input}
              value={points}
              onChangeText={(e) => setPoints(e)}
              placeholder={
                isSwitchOnMerito
                  ? "Digite os pontos de Mérito"
                  : "Digite os pontos de Demérito"
              }
              keyboardType='numeric'
            />
            {gender === "" ? (
              <View>
                <TouchableOpacity
                  style={
                    isSwitchOnMerito
                      ? [styles.button, { backgroundColor: "#006400" }]
                      : [styles.button, { backgroundColor: "#FF0000" }]
                  }
                  onPress={handleCreateRelease}>
                  <Text style={styles.buttonText}>{nameBtn}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.button}
                  onPress={() => setScreen("list")}>
                  <Text style={styles.buttonText}>Apontamentos</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}>
                <View style={{ width: "60%" }}>
                  <TouchableOpacity
                    style={
                      isSwitchOnMerito
                        ? [styles.button, { backgroundColor: "#006400" }]
                        : [styles.button, { backgroundColor: "#FF0000" }]
                    }
                    onPress={handleCreateRelease}>
                    <Text style={styles.buttonText}>{nameBtn}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      setScreen("list")
                      handleClear()
                    }}>
                    <Text style={styles.buttonText}>Apontamentos</Text>
                  </TouchableOpacity>
                </View>

                <View style={{ width: "40%" }}>
                  {gender === 1 && isSwitchOnMerito && (
                    <Image
                      source={require("../../assets/avatar_menino_feliz.png")}
                      resizeMethod='auto'
                    />
                  )}
                  {gender === 1 && isSwitchOnDemerito && (
                    <Image
                      source={require("../../assets/avatar_menino_triste.png")}
                      resizeMethod='auto'
                    />
                  )}
                  {gender === 2 && isSwitchOnMerito && (
                    <Image
                      source={require("../../assets/avatar_menina_feliz.png")}
                      resizeMethod='auto'
                    />
                  )}
                  {gender === 2 && isSwitchOnDemerito && (
                    <Image
                      source={require("../../assets/avatar_menina_triste.png")}
                      resizeMethod='auto'
                    />
                  )}
                </View>
              </View>
            )}
          </Animatable.View>
        </ScrollView>
      ) : (
        <ReleaseList
          screen={setScreen}
          editRelease={setEditRelease}
          status={setStatus}
          nameBtn={setNameBtn}
          clear={handleClear}
        />
      )}
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8A2BE2",
  },
  containerHeader: {
    backgroundColor: "#8A2BE2",
    marginBottom: "2%",
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
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: "5%",
    paddingEnd: "5%",
    paddingBottom: "35%",
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
    marginBottom: 10,
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
  dataMessage: {
    color: "#FF0000",
    fontWeight: "bold",
  },
})
