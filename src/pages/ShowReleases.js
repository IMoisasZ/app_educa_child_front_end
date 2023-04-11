import React, { useState, useContext, useEffect } from "react"
import { SafeAreaView, View, Text, FlatList, StyleSheet } from "react-native"
import Button from "../components/Button"
import { List } from "react-native-paper"
import Switch from "../components/Switch"
import Select from "../components/Select"
import { AuthContext } from "../contexts/auth"
import * as Animatable from "react-native-animatable"
import api from "../api/api"
import { MaterialCommunityIcons } from "react-native-vector-icons"

export default function ShowReleases() {
  const [isSwitchOnMerito, setIsSwitchOnMerito] = useState(true)
  const [isSwitchOnDemerito, setIsSwitchOnDemerito] = useState(false)
  const [background, setBackground] = useState("green")
  const [child, setChild] = useState({ id: "", name: "Criança", icon: "star" })
  const [listChild, setListChild] = useState([])
  const [listRelease, setListRelease] = useState([])

  // import user logaded
  const { userLogned } = useContext(AuthContext)

  const allChild = async () => {
    const response = await api.get(`/child/${userLogned.id}`)
    setListChild(response.data)
  }

  const allRelease = async () => {
    const response = await api.get(`/release/user/${userLogned.id}`)
    return response.data
  }

  useEffect(() => {
    const execute = async () => {
      await allChild()
      const response = await allRelease()
      if (child.id === "") {
        if (isSwitchOnMerito) {
          setListRelease(response.filter((item) => item.type === "merito"))
        } else {
          setListRelease(response.filter((item) => item.type === "demerito"))
        }
      } else {
        if (isSwitchOnMerito) {
          setListRelease(
            response.filter(
              (item) => item.type === "merito" && item.child.id === child.id
            )
          )
        } else {
          setListRelease(
            response.filter(
              (item) => item.type === "demerito" && item.child.id === child.id
            )
          )
        }
      }
    }
    execute()
  }, [isSwitchOnMerito, child])

  const handleClearFilters = () => {
    setIsSwitchOnMerito(true)
    setIsSwitchOnDemerito(false)
    setChild({ id: "", name: "Criança", icon: "star" })
  }

  const toggleSwitchMerito = () => {
    if (isSwitchOnMerito) {
      setIsSwitchOnMerito(false)
      setIsSwitchOnDemerito(true)
      setBackground("red")
    } else {
      setIsSwitchOnMerito(true)
      setIsSwitchOnDemerito(false)
      setBackground("green")
    }
  }

  const toggleSwitchDemerito = () => {
    if (isSwitchOnDemerito) {
      setIsSwitchOnMerito(true)
      setIsSwitchOnDemerito(false)
      setBackground("green")
    } else {
      setIsSwitchOnMerito(false)
      setIsSwitchOnDemerito(true)
      setBackground("red")
    }
  }

  const Item = ({ item }) => (
    <View style={styles.containerItem}>
      <Text style={styles.item}>Apelido: {item.child.nickName}</Text>
      <Text style={styles.item}>
        Nome da Criança: {item.child.name} {item.child.lastName}
      </Text>
      <Text style={styles.item}>Tipo de Evento: {item.type.toUpperCase()}</Text>
      <Text style={styles.item}>
        {item.type === "merito" ? "MÉRITO: " : "DEMÉRITO: "} {item.description}
      </Text>
      <Text style={styles.item}>Ponto(s): {item.point}</Text>
    </View>
  )

  const renderItem = ({ item }) => <Item item={item} />

  return (
    <View style={styles.container}>
      <Animatable.View
        style={styles.containerHeader}
        animation='fadeInLeft'
        delay={500}>
        <Text style={styles.message}>Lançamentos</Text>
        <Button
          nameBtn=''
          icon={() => (
            <MaterialCommunityIcons
              name='filter-remove-outline'
              color='black'
              size={30}
            />
          )}
          btnColor='transparent'
          handleOnPress={() => handleClearFilters()}
        />
      </Animatable.View>
      <Animatable.View
        animation='fadeInUp'
        style={
          isSwitchOnMerito
            ? [styles.containerForm, { backgroundColor: "#3CB371" }]
            : [styles.containerForm, { backgroundColor: "#FA8072" }]
        }>
        <View style={styles.viewSwitch}>
          <Switch
            value={isSwitchOnMerito}
            onToggleSwitch={toggleSwitchMerito}
            key={1}
            color='green'
            nameSwitch='Merito'
          />

          <Switch
            value={isSwitchOnDemerito}
            onToggleSwitch={toggleSwitchDemerito}
            key={2}
            color='red'
            nameSwitch='Demerito'
          />
        </View>

        <Select name={child.name} value={child.id} icon='star'>
          {listChild.map((item) => {
            return (
              <List.Item
                key={item.id}
                title={item.name}
                value={item.id}
                onPress={() =>
                  setChild({ id: item.id, name: item.name, icon: "star" })
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

        <SafeAreaView style={styles.container_flat}>
          <FlatList
            data={listRelease}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </SafeAreaView>
      </Animatable.View>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    padding: 10,
    borderRadius: 15,
    marginTop: "2%",
  },
  item: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
  },
  viewSwitch: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
})
