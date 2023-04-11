import React from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import * as Animatable from "react-native-animatable"

export default function Home() {
  const navigation = useNavigation()

  return (
    // <Container>
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Animatable.Image
          animation='flipInY'
          source={require("../../assets/mizp.png")}
          style={{ width: "90%" }}
          resizeMode='contain'
        />
      </View>
      <Animatable.View
        delay={600}
        animation='fadeInUp'
        style={styles.containerForm}>
        <Text style={styles.title}>
          Mostre a seus filhos a importância de obedecer os pais/responsáveis
        </Text>
        <Text style={styles.text}>Faça o login para começar</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("SignIn")}>
          <Text style={styles.buttonText}>Acessar</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8A2BE2",
  },
  containerLogo: {
    flex: 2,
    backgroundColor: "#8A2BE2",
    justifyContent: "center",
    alignItems: "center",
  },
  containerForm: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: "5%",
    paddingEnd: "5%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 28,
    marginBottom: 12,
  },
  text: {
    color: "#a1a1a1",
  },
  button: {
    position: "absolute",
    backgroundColor: "#8A2BE2",
    borderRadius: 50,
    paddingVertical: 8,
    width: "60%",
    alignSelf: "center",
    bottom: "15%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
})
