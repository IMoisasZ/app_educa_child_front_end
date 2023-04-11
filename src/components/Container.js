import React from "react"
import { View, StyleSheet } from "react-native"

export const defaultBackground = "#8A2BE2"
export default function Container({ children, background = "" }) {
  return (
    <View
      style={
        background === "green"
          ? styles.container_green
          : background === "red"
          ? styles.container_red
          : styles.container
      }>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    backgroundColor: defaultBackground,
  },

  container_green: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    backgroundColor: "#90EE90",
  },

  container_red: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    backgroundColor: "#FA8072",
  },
})
