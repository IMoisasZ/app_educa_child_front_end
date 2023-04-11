import * as React from "react"
import { Modal, Portal, Button, Provider } from "react-native-paper"
import { Text, TextInput, View, StyleSheet } from "react-native"

const MyComponent = () => {
  const [visible, setVisible] = React.useState(false)

  const showModal = () => setVisible(true)
  const hideModal = () => setVisible(false)
  const containerStyle = {
    backgroundColor: "white",
  }

  return (
    <Provider style={styles.container}>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}>
          <View style={{ width: "100%" }}>
            <Text>Example Modal. Click outside this area to dismiss.</Text>
            <TextInput placeholder='Digite sua senha' />
          </View>
        </Modal>
      </Portal>
      <Button style={{ marginTop: 30 }} onPress={showModal}>
        Show
      </Button>
    </Provider>
  )
}

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
  },
})

export default MyComponent
