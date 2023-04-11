import React, { useState } from "react"
import { View, Text, TextInput, StyleSheet } from "react-native"
export default function DataPicker({
  handleDay,
  valueDay,
  handleMonth,
  valueMonth,
  handleYear,
  valueYear,
  dateEvent = "Data do evento:",
  disabled = false,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{dateEvent}</Text>
      <View style={styles.containerForm}>
        <View style={styles.viewInput}>
          <Text style={styles.title}>Dia</Text>
          <TextInput
            style={styles.input}
            placeholder='Dia'
            value={Number(valueDay)}
            onChangeText={handleDay}
            keyboardType='numeric'
          />
        </View>

        <View style={styles.viewInput}>
          <Text style={styles.title}>Mês</Text>
          <TextInput
            style={styles.input}
            placeholder='Mês'
            value={valueMonth}
            onChangeText={handleMonth}
            keyboardType='numeric'
          />
        </View>

        <View style={styles.viewInput}>
          <Text style={styles.title}>Ano</Text>
          <TextInput
            style={styles.input}
            placeholder='Ano'
            value={valueYear}
            onChangeText={handleYear}
            keyboardType='numeric'
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFAFA",
    padding: "5%",
    borderRadius: 10,
  },
  containerForm: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
    textAlign: "center",
  },
  input: {
    height: 60,
    width: 60,
    borderBottomWidth: 1,
    textAlign: "center",
  },
})
