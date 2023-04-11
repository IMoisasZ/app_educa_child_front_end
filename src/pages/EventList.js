import React, { useEffect, useState, useContext } from "react"
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native"
import { List } from "react-native-paper"
import { AuthContext } from "../contexts/auth"
import Button from "../components/Button"
import EventAssociate from "./EventAssociate"
import { MaterialIcons } from "react-native-vector-icons"
import api from "../api/api"
import { showToast } from "../utils/toast"
import * as Animatable from "react-native-animatable"

export default function EventList({ setScreenEvent, editEvent }) {
  const [listEvent, setListEvent] = useState([])
  const [eventAssociate, setEventAssociate] = useState("")
  const [screen, setScreen] = useState("list")

  const { userLogned } = useContext(AuthContext)

  const handleAssociate = (item) => {
    setScreen("associate")
    setEventAssociate(item)
  }

  const allEvents = async (user_id = 1) => {
    try {
      const response = await api.get(`/event/${user_id}`)
      setListEvent(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    allEvents()
  }, [])

  const handleEditEvent = (event) => {
    const dayDate = new Date(event.date).getDate()
    const monthDate = new Date(event.date).getMonth() + 1
    const yearDate = new Date(event.date).getFullYear()
    const newEvent = { dayDate, monthDate, yearDate, ...event }
    editEvent(newEvent)
    setScreenEvent("create")
  }

  const handleDeleteEvent = async (id) => {
    try {
      await api.delete(`event/${Number(id)}`)
      showToast("Evento deletado com sucesso!")
      setTimeout(() => {
        allEvents()
      }, 2000)
    } catch (error) {
      showToast("Não é possivel deletar um evento que esta em execução")
    }
  }

  const Item = ({ item }) => (
    <>
      <View style={styles.containerItem}>
        <View style={styles.viewItem}>
          <List.Icon color='#fff' icon='calendar' style={styles.icon} />
          <Text style={styles.txtEvent}>{item.event}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.date}>{item.date}</Text>
        </View>
        <View style={styles.viewIcon}>
          <Button
            nameBtn=''
            icon={() => <MaterialIcons name='edit' size={36} color='#FFD700' />}
            btnColor='transparente'
            handleOnPress={() => handleEditEvent(item)}
          />
          <Button
            nameBtn=''
            icon={() => (
              <MaterialIcons name='delete' size={36} color='#DC143C' />
            )}
            btnColor='transparente'
            handleOnPress={() => handleDeleteEvent(item.id)}
          />
          <Button
            nameBtn=''
            handleOnPress={() => handleAssociate(item)}
            icon={() => <MaterialIcons name='link' size={36} color='#000080' />}
            btnColor='transparente'
          />
        </View>
      </View>
    </>
  )

  const renderItem = ({ item }) => <Item item={item} />

  return (
    <View style={styles.container}>
      {screen === "list" ? (
        <Animatable.View animation='fadeInUp'>
          <Animatable.View animation='fadeInLeft' delay={500}>
            <TouchableOpacity
              onPress={() => setScreenEvent("create")}
              style={styles.button}>
              <Text style={styles.buttonText}>Incluir Evento</Text>
            </TouchableOpacity>
          </Animatable.View>
          <SafeAreaView style={styles.container_flat}>
            <FlatList
              style={styles.flatList}
              data={listEvent}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
          </SafeAreaView>
        </Animatable.View>
      ) : (
        <EventAssociate setScreen={setScreen} event={eventAssociate} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: "8%",
    paddingStart: "5%",
    paddingEnd: "5%",
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
  icon: {
    alignItems: "flex-start",
    marginBottom: "5%",
  },
  viewIcon: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: "2%",
  },
  txtEvent: {
    fontSize: 22,
    fontWeight: "bold",
  },
  description: {
    fontSize: 18,
  },
  date: {
    fontSize: 18,
  },
  flatList: {
    marginTop: "5%",
  },
  viewBtn: {
    marginBottom: 10,
    marginHorizontal: 10,
  },
  data_child: {
    width: "90%",
  },
  btnItens: {
    justifyContent: "space-between",
    width: "10%",
  },

  name: {
    fontSize: 28,
    fontWeight: "600",
  },

  nickName: {
    fontSize: 20,
    fontWeight: "600",
    textDecorationLine: "underline",
  },

  birthday: {
    fontSize: 20,
    fontWeight: "600",
    textDecorationLine: "underline",
  },

  containerItem: {
    backgroundColor: "#BA55D3",
    marginBottom: 10,
    padding: 20,
    borderRadius: 15,
  },
})
