import * as React from "react"
import { IconButton, Tooltip } from "react-native-paper"

const MyComponent = ({ handleMessage }) => (
  <Tooltip title='Selected Camera'>
    <IconButton
      icon='help'
      selected
      size={24}
      iconColor='#fff'
      onPress={handleMessage}
    />
  </Tooltip>
)

export default MyComponent
