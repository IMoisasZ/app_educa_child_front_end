import * as React from "react"
import { Avatar as Av } from "react-native-paper"

export default function Avatar({ name }) {
  return <Av.Text size={24} label={name} />
}
