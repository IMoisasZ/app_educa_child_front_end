import React, { useState, useEffect } from "react"
import { List } from "react-native-paper"
import { defaultBackground } from "./Container"
import { StyleSheet } from "react-native"

const Select = ({ name, children, icon = "folder" }) => {
  const [expanded, setExpanded] = useState(false)

  const handlePress = () => setExpanded(!expanded)

  useEffect(() => {
    setExpanded(false)
  }, [name])

  return (
    <List.Section style={styles.container}>
      <List.Accordion
        style={styles.select}
        title={name}
        left={(props) => <List.Icon {...props} icon={icon} color='#8A2BE2' />}
        expanded={expanded}
        onPress={handlePress}>
        {children}
      </List.Accordion>
    </List.Section>
  )
}

export default Select

const styles = StyleSheet.create({
  container: {
    padding: 0,
    marginBottom: 12,
    width: "100%",
    backgroundColor: "#8A2BE2",
  },
  select: {
    marginBottom: -10,
    height: 60,
  },
})
