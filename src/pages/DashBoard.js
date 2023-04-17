import React, { useContext, useState, useEffect } from "react"
import { View, Text, StyleSheet, Image } from "react-native"
import { List } from "react-native-paper"
import { AuthContext } from "../contexts/auth"
import api from "../api/api"
import * as Animatable from "react-native-animatable"

export default function DashBoard() {
  // useState
  const [listChild, setListChild] = useState([])
  const [listDataEvent, setListDataEvent] = useState([])

  // context with info user logned
  const { userLogned } = useContext(AuthContext)

  // take the user_id into userLogned
  const user_id = userLogned.id

  // all children
  const allChildren = async () => {
    try {
      const response = await api.get(`/child/${user_id}`)
      setListChild(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  // all dataEvents. it is where have all informations about associate and refresh events
  const allDataEvents = async (user_id = 1) => {
    try {
      const response = await api.get(`/event_data/all/${user_id}`)
      setListDataEvent(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  // useefeect to change dashboard about child and events
  useEffect(() => {
    allChildren()
    allDataEvents()
  }, [])

  if (listDataEvent.length > 0) {
    return (
      <View style={styles.container}>
        {listDataEvent
          ? listChild.map((item) => {
              return (
                <Animatable.View
                  style={{
                    marginBottom: 10,
                    marginStart: "2%",
                    marginEnd: "2%",
                  }}
                  animation='fadeInUp'
                  key={item.id}>
                  <List.Accordion
                    title={item.nickName}
                    titleStyle={{
                      color: "#fff",
                      fontWeight: "800",
                      fontSize: 22,
                      width: "100%",
                    }}
                    id='1'
                    style={
                      item.gender_id === 2
                        ? styles.main_accordion_feminino
                        : styles.main_accordion_masculino
                    }>
                    {listDataEvent
                      .filter((childId) => childId.child_id === item.id)
                      .map((itemEvent) => {
                        return (
                          <List.Accordion
                            key={itemEvent.id}
                            style={
                              item.gender_id === 2
                                ? styles.second_accordion_feminino
                                : styles.second_accordion_masculino
                            }
                            titleStyle={{
                              color: "#000",
                              fontWeight: "800",
                              fontSize: 18,
                            }}
                            title={itemEvent.event.description}
                            id='1'
                            left={(props) => {
                              return (
                                <List.Icon
                                  {...props}
                                  icon='star'
                                  color='#fff'
                                />
                              )
                            }}>
                            <View style={styles.container_points}>
                              {itemEvent.point >= 7 && (
                                <View style={{ width: "50%" }}>
                                  <Image
                                    source={require("../../assets/avatar_menina_feliz.png")}
                                    style={{
                                      resizeMode: "contain",
                                      width: "100%",
                                      height: 100,
                                      padding: 0,
                                    }}
                                  />
                                </View>
                              )}
                              {itemEvent.point >= 3 && itemEvent.point <= 6 && (
                                <View style={{ width: "50%" }}>
                                  <Image
                                    source={require("../../assets/avatar_menina_triste.png")}
                                    style={{
                                      resizeMode: "contain",
                                      width: "100%",
                                      height: 100,
                                      padding: 0,
                                    }}
                                  />
                                </View>
                              )}
                              <View style={styles.point}>
                                <View>
                                  <Text style={styles.text_points}>
                                    {itemEvent.point}
                                  </Text>
                                </View>
                                <Text style={styles.text_points_name}>
                                  Pontos
                                </Text>
                              </View>
                              <View style={styles.point}>
                                <Text style={styles.text_points}>
                                  {itemEvent.meriter}
                                </Text>
                                <Text style={styles.text_points_name}>
                                  Meritos
                                </Text>
                              </View>
                              <View style={styles.point}>
                                <Text style={styles.text_points}>
                                  {itemEvent.demeriter}
                                </Text>
                                <Text style={styles.text_points_name}>
                                  Demeritos
                                </Text>
                              </View>
                            </View>
                          </List.Accordion>
                        )
                      })}
                  </List.Accordion>
                </Animatable.View>
              )
            })
          : ""}
      </View>
    )
  } else {
    return (
      <Animatable.View
        style={[
          styles.container,
          { alignItems: "center", justifyContent: "center" },
        ]}>
        <Animatable.View>
          <Animatable.Text
            animation='pulse'
            easing='ease-out'
            iterationCount='infinite'
            style={{ color: "#fff", fontWeight: "600", fontSize: 18 }}>
            Não há crianças cadastradas!
          </Animatable.Text>
        </Animatable.View>
      </Animatable.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8A2BE2",
  },

  main_accordion_feminino: {
    backgroundColor: "#FF00FF",
    paddingBottom: 10,
  },

  main_accordion_masculino: {
    backgroundColor: "#7B68EE",
    paddingBottom: 10,
  },

  second_accordion_feminino: {
    paddingLeft: 20,
    backgroundColor: "#BA55D3",
  },

  second_accordion_masculino: {
    paddingLeft: 20,
    backgroundColor: "#9370DB",
  },

  container_points: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingRight: 150,
  },

  point: {
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: "#3CB371",
    marginVertical: 10,
    paddingHorizontal: 5,
    paddingVertical: 10,
    textAlign: "center",
  },

  text_points: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 20,
    color: "#fff",
  },

  text_points_name: {
    fontSize: 14,
    fontWeight: "500",
  },
})
