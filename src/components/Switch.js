import React, { useState } from "react"
import { Switch as Toggle } from "react-native-paper"
import { View, Text, StyleSheet } from "react-native"

export default function Switch({
  onToggleSwitch,
  value,
  key,
  color,
  nameSwitch = "name switch",
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.switchName}>{nameSwitch}</Text>
      <Toggle
        style={styles.switch}
        value={value}
        onValueChange={onToggleSwitch}
        key={key}
        color={color}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  switchName: {
    fontSize: 18,
    fontWeight: "600",
  },
})
