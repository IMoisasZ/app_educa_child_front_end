import React, { useState, useEffect, useContext } from "react"
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from "react-native"
import { List } from "react-native-paper"
import DatePicker from "../components/DatePicker"
import { useNavigation } from "@react-navigation/native"
import { AuthContext } from "../contexts/auth"
import { showToast } from "../utils/toast"
import EventList from "./EventList"
import api from "../api/api"
import Select from "../components/Select"
import { listDefaultEvents } from "../utils/defaultList"
import * as Animatable from "react-native-animatable"

export default function Event() {
  const [eventId, setEventId] = useState("")
  const [type, setType] = useState({ id: "", description: "Tipo de evento" })
  const [event, setEvent] = useState("")
  const [description, setDescription] = useState("")
  const [day, setDay] = useState("")
  const [month, setMonth] = useState("")
  const [year, setYear] = useState("")
  const [date, setDate] = useState("")
  const [screen, setScreen] = useState("create")
  const [editEvent, setEditEvent] = useState("")
  const [messageDate, setMessageDate] = useState("")

  const { userLogned } = useContext(AuthContext)

  const navigation = useNavigation()

  useEffect(() => {
    if (day && month && year) {
      setDate(`${day}/${month}/${year}`)
    } else if (day) {
      setDate(`${day}/`)
    } else if (day && month) {
      setDate(`${day}/${month}/`)
    } else {
      setDate("")
    }
  }, [day, month, year])

  const handleCreateEvent = async () => {
    if (editEvent === "") {
      const newEvent = {
        user_id: userLogned,
        typeEvent_id: type.id,
        event,
        description,
        date,
      }
      try {
        await api.post("/event", newEvent)
        showToast("Evento incluído com sucesso!")
        setTimeout(() => {
          handleClear()
        }, 2000)
      } catch (error) {
        showToast(error.response.data.msg)
      }
    } else {
      console.log("here")
      await api.patch("/event", {
        id: 1,
        type_event: type,
        event,
        description,
        date,
      })
      showToast("Evento editado com sucesso!")
      setTimeout(() => {
        handleClear()
      }, 2000)
    }
  }

  const getDescriptionTypeEvent = (editEvent) => {
    const description = listDefaultEvents.find(
      (item) => item.id === editEvent.id
    )
    return description.description
  }

  useEffect(() => {
    if (editEvent != "") {
      setEventId(editEvent.id)
      setType({
        id: editEvent.typeEvent_id,
        description: getDescriptionTypeEvent(editEvent),
      })
      setEvent(editEvent.event)
      setDescription(editEvent.description)
    }
  }, [editEvent])

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

  const handleClear = () => {
    setEventId("")
    setType({ id: "", description: "Tipo de evento" })
    setEvent("")
    setDescription("")
    setDay("")
    setMonth("")
    setYear("")
    setDate("")
    setScreen("create")
    setEditEvent("")
    setMessageDate("")
  }

  return (
    <>
      {screen === "create" ? (
        <View style={styles.container}>
          <Animatable.View
            animation='fadeInLeft'
            delay={500}
            style={styles.containerHeader}>
            <Text style={styles.message}>Informe os dados do evento</Text>
          </Animatable.View>

          <Animatable.View animation='fadeInUp' style={styles.containerForm}>
            <Select name={type.description} value={type.id} icon='gift'>
              {listDefaultEvents.map((item) => {
                return (
                  <List.Item
                    key={item.id}
                    title={item.description}
                    value={item.id}
                    onPress={() =>
                      setType({ id: item.id, description: item.description })
                    }
                    left={(props) => (
                      <List.Icon
                        {...props}
                        icon='star'
                        color='#FFF'
                        style={item.icon}
                      />
                    )}
                  />
                )
              })}
            </Select>

            <Text style={styles.title}>Evento</Text>
            <TextInput
              style={styles.input}
              onChangeText={(e) => setEvent(e)}
              value={event}
              placeholder='Nome do evento'
            />

            <Text style={styles.title}>Descrição do evento</Text>
            <TextInput
              style={[styles.input, { height: "15%" }]}
              onChangeText={(e) => setDescription(e)}
              value={description}
              placeholder='Digite uma breve descrição do evento'
              multiline={true}
              numberOfLines={5}
            />

            <DatePicker
              dateEvent={date ? `Data do evento: ${date}` : "Data do evento: "}
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
              onPress={() => handleCreateEvent()}
              style={styles.button}>
              <Text style={styles.buttonText}>
                {editEvent !== "" ? "Editar" : "Incluir"}
              </Text>
              {/* btnColor={editEvent !== "" && "#DAA520"} */}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setScreen("list")}
              style={styles.button}>
              <Text style={styles.buttonText}>Meus Eventos</Text>
            </TouchableOpacity>
          </Animatable.View>
        </View>
      ) : (
        <View style={styles.container}>
          <EventList setScreenEvent={setScreen} editEvent={setEditEvent} />
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
  },
  input: {
    borderBottomWidth: 1,
    height: 30,
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
  dataMessage: {
    color: "#FF6347",
    fontWeight: "500",
  },
})
