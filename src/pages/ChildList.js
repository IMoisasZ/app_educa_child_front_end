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
import api from "../api/api"
import { MaterialIcons } from "react-native-vector-icons"
import { showToast } from "../utils/toast"
import * as Animatable from "react-native-animatable"

export default function ChildList({ setType, editChild, typeHttp, clear }) {
  // usestate
  const [listChild, setListChild] = useState([])

  // context user logned
  const { userLogned } = useContext(AuthContext)

  // variable with the user_id of user logned
  const user_id = userLogned.id

  // get all children
  const allChildreen = async () => {
    try {
      const response = await api.get(`/child/${user_id}`)
      setListChild(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  // change birthday
  const changeBirthday = (date) => {
    const newBirthday = new Date(date)
    const day =
      newBirthday.getDate() < Number(10)
        ? `0${newBirthday.getDate()}`
        : newBirthday.getDate()
    const month =
      newBirthday.getMonth() + 1 < Number(10)
        ? `0${newBirthday.getMonth() + 1}`
        : newBirthday.getMonth() + 1
    const year = newBirthday.getFullYear()
    return `${day}/${month}/${year}`
  }

  // useefect to get all children when get in the screen
  useEffect(() => {
    allChildreen()
  }, [])

  // handle edit child
  const handleEdit = async (child) => {
    try {
      const dayBirthday = new Date(child.birthday).getDate()
      const monthBirthday = new Date(child.birthday).getMonth() + 1
      const yearBirthday = new Date(child.birthday).getFullYear()
      const newChild = { dayBirthday, monthBirthday, yearBirthday, ...child }

      editChild(newChild)
      typeHttp("patch")
      setType("child")
    } catch (error) {
      console.log({ error })
    }
  }

  // handle delete a child
  const handleDelete = async (id) => {
    try {
      await api.delete(`child/${Number(id)}`)
      showToast("Filho deletado com sucesso!")
      setTimeout(() => {
        allChildreen()
      }, 2000)
    } catch (error) {
      showToast("Filho com apontamentos. Não é possivel deletar!")
    }
  }

  // item to be show in the screen
  const Item = ({ item }) => (
    <View
      style={
        item.gender_id === 2 ? styles.item_feminino : styles.item_masculino
      }>
      <View style={styles.data_child}>
        <View style={styles.viewIcon}>
          <List.Icon
            color='#fff'
            icon={item.gender_id === 2 ? "face-woman" : "face-man"}
          />
        </View>
        <View style={styles.viewItens}>
          <Text style={styles.name}>
            {item.name} {item.lastName}
          </Text>
          <Text style={styles.nickName}>{item.nickName}</Text>
          <Text style={styles.birthday}>{changeBirthday(item.birthday)}</Text>
        </View>
      </View>
      <View style={styles.btnItens}>
        <View>
          <Button
            icon={() => <MaterialIcons name='edit' size={36} color='#FFD700' />}
            nameBtn=''
            width='100%'
            btnColor='transparent'
            handleOnPress={() => handleEdit(item)}
          />
        </View>
        <View>
          <Button
            icon={() => (
              <MaterialIcons name='delete' size={36} color='#DC143C' />
            )}
            nameBtn=''
            width='100%'
            btnColor='transparent'
            handleOnPress={() => handleDelete(item.id)}
          />
        </View>
      </View>
    </View>
  )

  // component to render the item
  const renderItem = ({ item }) => <Item item={item} />

  return (
    <Animatable.View animation='fadeInUp' style={styles.container}>
      <Animatable.View animation='fadeInLeft' delay={500}>
        <TouchableOpacity
          onPress={() => {
            setType("child")
            clear()
          }}
          style={styles.button}>
          <Text style={styles.buttonText}>Incluir Criança</Text>
        </TouchableOpacity>
      </Animatable.View>
      <SafeAreaView>
        <FlatList
          showsVerticalScrollIndicator={false}
          style={styles.flatList}
          data={listChild}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    </Animatable.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: "15%",
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
  flatList: {
    marginTop: "5%",
  },
  viewIcon: {
    alignItems: "flex-start",
    marginBottom: 5,
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

  item_feminino: {
    backgroundColor: "#BA55D3",
    marginBottom: 15,
    padding: 20,
    flexDirection: "row",
    borderRadius: 15,
  },

  item_masculino: {
    backgroundColor: "#836FFF",
    marginBottom: 15,
    padding: 20,
    flexDirection: "row",
    borderRadius: 15,
  },
})
