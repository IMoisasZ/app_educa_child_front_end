import React from "react"
import { TextInput } from "react-native-paper"
import { StyleSheet } from "react-native"

export default function Input({
  label = "name input",
  value = "",
  handleOnChange = null,
  focus = false,
  type = "name",
  secureText = false,
  keyboard = "",
  multiline = false,
  numberLines = multiline ? 4 : 1,
  disabled = false,
}) {
  return (
    <TextInput
      label={label}
      value={value}
      onChangeText={handleOnChange}
      autoFocus={focus}
      contentStyle={{ width: "100%" }}
      mode='flat'
      textContentType={type}
      secureTextEntry={secureText}
      keyboardType={keyboard}
      multiline={multiline}
      numberOfLines={numberLines}
      disabled={disabled}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    width: "100%",
  },
})
