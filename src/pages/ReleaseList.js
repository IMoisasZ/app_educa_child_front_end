import React, { useState, useContext, useEffect } from "react"
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native"
import Button from "../components/Button"
import { AuthContext } from "../contexts/auth"
import api from "../api/api"
import { MaterialIcons } from "react-native-vector-icons"
import { showToast } from "../utils/toast"
import * as Animatable from "react-native-animatable"

export default function ReleaseList({ screen, editRelease, status, nameBtn }) {
  const [listRelease, setListRelease] = useState([])

  const { userLogned } = useContext(AuthContext)
  const user_id = userLogned.id

  const allReleases = async () => {
    const response = await api.get(`/release/user/${user_id}`)
    setListRelease(response.data)
  }

  useEffect(() => {
    allReleases()
  }, [])

  const handleDelete = async (item) => {
    try {
      const data = {
        idRelease: item.id,
        child_id: item.child_id,
        event_id: item.event_id,
        type: item.type,
        point: item.point,
        idEventData: item.idEventData,
      }
      await api.delete(`release`, {
        data,
      })
      showToast("Apontamento excluído com sucesso!")
      setTimeout(() => {
        allReleases()
      }, 2000)
    } catch (error) {
      showToast(error)
    }
  }

  const handleEdit = (item) => {
    try {
      console.debug("edit", item)
      editRelease(item)
      screen("release")
      status("editar")
      nameBtn(item.type === "demerito" ? "Alterar Demérito" : "Alterar Merito")
    } catch (error) {
      console.log(error)
    }
  }

  const Item = ({ item }) => (
    <View
      style={
        item.type === "merito"
          ? [styles.containerItem, { backgroundColor: "#3CB371" }]
          : styles.containerItem
      }>
      <Text style={styles.item}>
        Criança: {item.child.nickName} - Tipo: {item.type.toUpperCase()}{" "}
      </Text>
      <Text style={styles.item}>Evento: {item.event.event}</Text>
      <Text style={styles.item}>Pontos: {item.point}</Text>
      <Text style={styles.item}>Descrição:</Text>
      <Text style={styles.itemDescription}>{item.description}</Text>
      <View style={styles.buttonView}>
        <Button
          nameBtn=''
          icon={() => <MaterialIcons name='delete' color='red' size={36} />}
          btnColor='transparent'
          handleOnPress={() => handleDelete(item)}
        />
        <Button
          nameBtn=''
          icon={() => <MaterialIcons name='edit' size={36} color='#FFD700' />}
          btnColor='transparent'
          handleOnPress={() => handleEdit(item)}
        />
      </View>
    </View>
  )

  return (
    <Animatable.View animation='fadeInUp' style={styles.container}>
      <Animatable.View animation='fadeInLeft' delay={500}>
        <TouchableOpacity
          onPress={() => screen("release")}
          style={styles.button}>
          <Text style={styles.buttonText}>Incluir Mérito/Demérito</Text>
        </TouchableOpacity>
      </Animatable.View>
      <SafeAreaView style={styles.container_flat}>
        <FlatList
          data={listRelease}
          renderItem={({ item }) => <Item item={item} />}
          keyExtractor={(item) => String(item.id)}
        />
      </SafeAreaView>
    </Animatable.View>
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
  containerItem: {
    backgroundColor: "#BA55D3",
    marginBottom: 10,
    padding: 20,
    borderRadius: 15,
    marginTop: "5%",
  },
  item: {
    fontSize: 15,
    fontWeight: "600",
  },
  itemDescription: {
    fontStyle: "italic",
    textAlign: "justify",
    textDecorationLine: "underline",
    flexWrap: "wrap",
    fontSize: 16,
  },
  buttonView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "2%",
  },
})
