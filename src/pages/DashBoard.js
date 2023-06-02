import React, { useContext, useState, useEffect } from "react"
import { View, Text, StyleSheet, ScrollView, Image } from "react-native"
import { List } from "react-native-paper"
import Tooltip from "../components/Tooltip"
import { AuthContext } from "../contexts/auth"
import * as Animatable from "react-native-animatable"

export default function DashBoard() {
  // useContext
  const [helperMessage, setHelperMessage] = useState("")
  // context to execute the informations about dashboard
  const { executeDashboard, listChild, listDataEvent } = useContext(AuthContext)

  // useefeect to change dashboard about child and events
  useEffect(() => {
    const execute = async () => await executeDashboard()
    execute()
  }, [])

  useEffect(() => {
    if (helperMessage) {
      setTimeout(() => {
        setHelperMessage("")
      }, 5000)
    }
  }, [helperMessage])

  const showHelper = () => {
    setHelperMessage({
      descr: "P: Total de Pontos | M: Total de Méritos | D: Total de Deméritos",
      pontosFeliz: "Pontuação: 7 a 10 pontos - Criança feliz!",
      pontosPreocupada: "Pontuação: 1 a 6 pontos - Criança preocupada!",
      pontosTriste: "Pontuação: 0 pontos - Criança triste!",
    })
  }

  // if (listDataEvent.length > 0) {
  return (
    <ScrollView style={[styles.container, { height: "100%" }]}>
      <View
        style={{
          alignItems: "flex-end",
          width: "99%",
          marginBottom: "1%",
        }}>
        <Tooltip handleMessage={() => showHelper()} />
        {helperMessage ? (
          <Animatable.View
            animation='fadeIn'
            duration={2000}
            style={{
              alignItems: "center",
              backgroundColor: "#Fff",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Text
              style={{
                color: "#000",
                fontWeight: "bold",
                textAlign: "justify",
                marginBottom: "2%",
                paddingHorizontal: "1%",
              }}>
              {helperMessage.descr}
            </Text>
            <Text
              style={{
                color: "#000",
                fontWeight: "bold",
                textAlign: "justify",
                marginBottom: "2%",
                paddingHorizontal: "0.5%",
              }}>
              {helperMessage.pontosFeliz}
            </Text>
            <Text
              style={{
                color: "#000",
                fontWeight: "bold",
                textAlign: "justify",
                marginBottom: "2%",
                paddingHorizontal: "0.5%",
              }}>
              {helperMessage.pontosPreocupada}
            </Text>
            <Text
              style={{
                color: "#000",
                fontWeight: "bold",
                textAlign: "justify",
                marginBottom: "2%",
                paddingHorizontal: "0.5%",
              }}>
              {helperMessage.pontosTriste}
            </Text>
          </Animatable.View>
        ) : (
          ""
        )}
      </View>
      <Animatable.View
        animation='fadeIn'
        delay={600}
        duration={1000}
        style={{ alignItems: "flex-end", width: "100%" }}></Animatable.View>
      {listDataEvent
        ? listChild.map((item) => {
            return (
              <Animatable.View
                style={{
                  marginBottom: 10,
                  marginStart: "2%",
                  marginEnd: "2%",
                }}
                animation='fadeIn'
                duration={5000}
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
                              <List.Icon {...props} icon='star' color='#fff' />
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
                            {itemEvent.point >= 1 && itemEvent.point <= 6 && (
                              <View style={{ width: "50%" }}>
                                <Image
                                  source={require("../../assets/avatar_menina_assustada.png")}
                                  style={{
                                    resizeMode: "contain",
                                    width: "100%",
                                    height: 100,
                                    padding: 0,
                                  }}
                                />
                              </View>
                            )}
                            {itemEvent.point < 1 && (
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
                            <View style={styles.status}>
                              <View
                                style={
                                  itemEvent.point >= 7
                                    ? styles.point
                                    : itemEvent.point >= 1 &&
                                      itemEvent.point <= 6
                                    ? [
                                        styles.point,
                                        { backgroundColor: "#FFD700" },
                                      ]
                                    : [
                                        styles.point,
                                        { backgroundColor: "#FF6347" },
                                      ]
                                }>
                                <View>
                                  <Text style={styles.text_points}>
                                    {itemEvent.point}
                                  </Text>
                                </View>
                                <Text style={styles.text_points_name}>P</Text>
                              </View>
                              <View style={styles.point}>
                                <Text style={styles.text_points}>
                                  {itemEvent.meriter}
                                </Text>
                                <Text style={styles.text_points_name}>M</Text>
                              </View>
                              <View
                                style={[
                                  styles.point,
                                  { backgroundColor: "#FF6347" },
                                ]}>
                                <Text style={styles.text_points}>
                                  {itemEvent.demeriter}
                                </Text>
                                <Text style={styles.text_points_name}>D</Text>
                              </View>
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
    </ScrollView>
  )
}
//  else {
//   return (
//     <View
//       style={[
//         styles.container,
//         { alignItems: "center", justifyContent: "center" },
//       ]}>
//       <View>
//         <Text style={{ color: "#fff", fontWeight: "600", fontSize: 18 }}>
//           Não há dados para apresentar!
//         </Text>
//       </View>
//     </View>
//   )
// }
// }

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
    borderRadius: 100,
    width: "40%",
    borderWidth: 1,
    backgroundColor: "#3CB371",
    marginRight: 10,
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
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },

  status: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
})
