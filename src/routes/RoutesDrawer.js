import React, { useContext } from "react"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { defaultBackground } from "../components/Container"
import {
  MaterialIcons,
  MaterialCommunityIcons,
} from "react-native-vector-icons"

import Home from "../pages/Home"
import SignIn from "../pages/SignIn"
import User from "../pages/User"
import ForgotPassword from "../pages/ForgotPassword"
import DashBoard from "../pages/DashBoard"
import Event from "../pages/Event"
import Child from "../pages/Child"
import Release from "../pages/Release"
import ShowReleases from "../pages/ShowReleases"
import { AuthContext } from "../contexts/auth"
import UserAccount from "../pages/UserAccount"
import { useNavigation } from "@react-navigation/native"
import { TouchableOpacity, Text } from "react-native"

const Drawer = createDrawerNavigator()

export default function RoutesDrawer() {
  const { userLogned } = useContext(AuthContext)

  const navigation = useNavigation()
  return (
    <Drawer.Navigator
      initialRouteName='Home'
      screenOptions={{
        drawerContentStyle: {
          backgroundColor: "#dadada",
        },
      }}>
      <>
        {userLogned ? (
          <Drawer.Group>
            <Drawer.Screen
              name='DashBoard'
              component={DashBoard}
              options={{
                headerShown: true,
                headerTitle: "DashBoard",
                headerStyle: {
                  backgroundColor: defaultBackground,
                },
                drawerLabel: "DashBoard",
                headerShadowVisible: false,
                drawerIcon: () => (
                  <MaterialIcons
                    name='dashboard'
                    color={defaultBackground}
                    size={22}
                  />
                ),
              }}
            />

            <Drawer.Screen
              name='Child'
              component={Child}
              options={{
                headerShown: true,
                headerTitle: "Crianças",
                headerStyle: {
                  backgroundColor: defaultBackground,
                },
                drawerLabel: "Crianças",
                headerShadowVisible: false,
                drawerIcon: () => (
                  <MaterialIcons
                    name='child-care'
                    color={defaultBackground}
                    size={22}
                  />
                ),
              }}
            />

            <Drawer.Screen
              name='Event'
              component={Event}
              options={{
                headerShown: true,
                headerTitle: "Eventos",
                headerStyle: {
                  backgroundColor: defaultBackground,
                },
                drawerLabel: "Evento",
                headerShadowVisible: false,
                drawerIcon: () => (
                  <MaterialIcons
                    name='event'
                    color={defaultBackground}
                    size={22}
                  />
                ),
              }}
            />

            <Drawer.Screen
              name='Release'
              component={Release}
              options={{
                headerShown: true,
                headerTitle: "Merito/Demerito",
                headerStyle: {
                  backgroundColor: defaultBackground,
                },
                drawerLabel: "Merito/Demerito",
                headerShadowVisible: false,
                drawerIcon: () => (
                  <MaterialCommunityIcons
                    name='plus-minus-variant'
                    color={defaultBackground}
                    size={22}
                  />
                ),
              }}
            />

            <Drawer.Screen
              name='ShowReleases'
              component={ShowReleases}
              options={{
                headerShown: true,
                headerTitle: "Consulta meritos/demeritos",
                headerStyle: {
                  backgroundColor: defaultBackground,
                },
                drawerLabel: "Consulta meritos/demeritos",
                headerShadowVisible: false,
                drawerIcon: () => (
                  <MaterialCommunityIcons
                    name='file-chart-outline'
                    color={defaultBackground}
                    size={22}
                  />
                ),
              }}
            />
            <Drawer.Screen
              name='SignOut'
              component={UserAccount}
              options={{
                headerShown: true,
                headerTitle: userLogned.name + " " + userLogned.lastName,
                headerStyle: {
                  backgroundColor: defaultBackground,
                },
                drawerLabel: userLogned.name + " " + userLogned.lastName,
                headerShadowVisible: false,
                drawerIcon: () => (
                  <MaterialIcons
                    name='account-circle'
                    color={defaultBackground}
                    size={22}
                  />
                ),
              }}
            />
          </Drawer.Group>
        ) : (
          <Drawer.Group>
            <Drawer.Screen
              name='Home'
              component={Home}
              options={{
                headerShown: false,
                drawerLabel: "Home",
                drawerIcon: () => (
                  <MaterialIcons
                    name='home'
                    color={defaultBackground}
                    size={22}
                  />
                ),
              }}
            />
            <Drawer.Screen
              name='SignIn'
              component={SignIn}
              options={{
                headerShown: false,
                drawerLabel: "Login",
                drawerIcon: () => (
                  <MaterialIcons
                    name='login'
                    color={defaultBackground}
                    size={22}
                  />
                ),
              }}
            />

            <Drawer.Screen
              name='ForgotPassword'
              component={ForgotPassword}
              options={{
                headerShown: true,
                headerTitle: "Esqueci a senha",
                headerStyle: {
                  backgroundColor: defaultBackground,
                },
                drawerLabel: "Esqueci a senha",
                headerShadowVisible: false,
                drawerIcon: () => (
                  <MaterialIcons
                    name='help'
                    color={defaultBackground}
                    size={22}
                  />
                ),
              }}
            />
            <Drawer.Screen
              name='User'
              component={User}
              options={{
                headerShown: true,
                headerTitle: "Usuário",
                headerStyle: {
                  backgroundColor: defaultBackground,
                },
                drawerLabel: "Usuário",
                headerShadowVisible: false,
                drawerIcon: () => (
                  <MaterialIcons
                    name='person'
                    color={defaultBackground}
                    size={22}
                  />
                ),
              }}
            />
          </Drawer.Group>
        )}
      </>
    </Drawer.Navigator>
  )
}
