import * as React from "react"
import { Button as Btn } from "react-native-paper"
import { ToastAndroid } from "react-native"

export default function Button({
  icon = null,
  mode = "contained",
  handleOnPress = null,
  nameBtn = "name btn",
  btnColor,
  disabled = false,
  textColor,
  width,
  height,
  fontSize,
}) {
  return (
    <Btn
      icon={icon}
      mode={mode}
      onPress={handleOnPress}
      textColor={textColor}
      buttonColor={btnColor}
      disabled={disabled}
      contentStyle={{
        width,
        height,
      }}
      labelStyle={{
        fontSize,
      }}>
      {nameBtn}
    </Btn>
  )
}
