import React, { useEffect, useState, useContext } from "react"
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native"
import { List } from "react-native-paper"
import Button from "../components/Button"
import api from "../api/api"
import { MaterialIcons } from "react-native-vector-icons"
import { AuthContext } from "../contexts/auth"
import { showToast } from "../utils/toast"
import * as Animatable from "react-native-animatable"

export default function EventAssociate({ setScreen, event }) {
  const [listChildren, setListChildren] = useState([])
  const [childAssociated, setChildAssociated] = useState("")
  const [listChildrenAssociated, setListChildrenAssociated] = useState([])

  const { userLogned } = useContext(AuthContext)
  const { id } = userLogned

  const allChildren = async () => {
    try {
      const response = await api.get(`/child/${id}`)
      setListChildren(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const allChildAssociated = async () => {
    try {
      const response = await api.get(`/event_data/all/${userLogned}}`)
      setListChildrenAssociated(response.data)
    } catch (error) {
      showToast(error)
    }
  }

  useEffect(() => {
    allChildren()
    allChildAssociated()
  }, [])

  const handleDelete = async (childId) => {
    try {
      let data = listChildrenAssociated.find(
        (child) => child.child_id === Number(childId)
      )
      const { id } = data
      await api.delete(`/event_data/${id}`)
      showToast("Evento não mais associado a criança!")
      setTimeout(() => {
        setScreen("list")
      }, 2000)
    } catch (error) {
      showToast(error)
    }
  }

  const handleSelectedChild = (id) => {
    setChildAssociated(id)
  }

  const Item = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleSelectedChild(item.id)}
      style={styles.item}>
      <View style={styles.containerItem}>
        <View style={styles.data_child}>
          <List.Icon color='#fff' icon='calendar' style={styles.icon} />
          <Text style={styles.nome}>
            Nome: {item.name} {item.lastName}
          </Text>
          <Text style={styles.apelido}>Apelido: {item.nickName}</Text>
          <Text style={styles.data}>Data de nascimento: {item.birthDay}</Text>
        </View>
        <View style={styles.selected}>
          {!listChildrenAssociated.find(
            (child) => child.child_id === item.id
          ) ? (
            <View>
              {childAssociated === item.id && (
                <MaterialIcons name='check-circle' color='#008000' size={32} />
              )}
            </View>
          ) : (
            <Button
              nameBtn=''
              icon={() => (
                <MaterialIcons name='delete' color='#DC143C' size={36} />
              )}
              btnColor='transparent'
              handleOnPress={() => handleDelete(item.id)}
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  )

  const renderItem = ({ item }) => <Item item={item} />

  const handleCreateAssociate = async () => {
    const newData = {
      user_id: userLogned.id,
      child_id: childAssociated,
      event_id: event.id,
      meriter: 0,
      demeriter: 0,
      point: 10,
    }
    try {
      await api.post(`/event_data`, newData)
      showToast("Evento associado a criança!")
      setTimeout(() => {
        handleListEvents()
      }, 2000)
    } catch (error) {}
  }

  const handleListEvents = () => {
    setScreen("list")
  }

  return (
    <Animatable.View animation='fadeInUp' style={styles.container}>
      <View style={styles.inputView}>
        <Text style={styles.title}>Evento</Text>
        <TextInput
          style={styles.input}
          value={event.event}
          selectTextOnFocus={false}
          editable={false}
        />
      </View>

      <View style={styles.container_flat}>
        <SafeAreaView>
          <FlatList
            data={listChildren}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </SafeAreaView>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleCreateAssociate}>
        <Text style={styles.buttonText}>Associar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleListEvents()}>
        <Text style={styles.buttonText}>Meus Eventos</Text>
      </TouchableOpacity>
    </Animatable.View>
  )
}

const styles = StyleSheet.create({
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

  nome: {
    fontSize: 22,
    fontWeight: "600",
  },

  apelido: {
    fontSize: 18,
  },

  data: {
    fontSize: 18,
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
    flexDirection: "row",
  },
  selected: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginTop: 15,
    fontWeight: "500",
    width: "100%",
    textAlign: "center",
  },
  input: {
    height: 50,
    marginBottom: 12,
    marginTop: 10,
    fontSize: 20,
    backgroundColor: "#FFFAFA",
    borderRadius: 5,
    textAlign: "center",
  },
})
