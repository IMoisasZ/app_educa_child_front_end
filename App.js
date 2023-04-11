import "react-native-gesture-handler"
import { NavigationContainer } from "@react-navigation/native"
import { StatusBar } from "react-native"
import { defaultBackground } from "./src/components/Container"
import RoutesDrawer from "./src/routes/RoutesDrawer"
import AuthProvider from "./src/contexts/auth"

export default function App() {
  return (
    <NavigationContainer onUnhandledAction={true}>
      <AuthProvider>
        <StatusBar
          animated
          backgroundColor={defaultBackground}
          barStyle='light-content'
        />
        <RoutesDrawer />
      </AuthProvider>
    </NavigationContainer>
  )
}
