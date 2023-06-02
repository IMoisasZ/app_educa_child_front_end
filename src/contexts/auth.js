import React, { createContext, useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { getAuth, signOut, signInWithEmailAndPassword } from "firebase/auth"
import { showToast } from "../utils/toast"
import { app } from "../configFirebase/config"
import api from "../api/api"

export const AuthContext = createContext({})

export default function AuthProvider({ children }) {
  // useNavigation
  const navigation = useNavigation()

  // ---------------------------------------------auth-------------------------------------------------------
  // useState auth
  const [userLogned, setUserLogned] = useState("")

  // initialize app firebase to autenticate
  const initializeApp = () => app
  initializeApp()
  const auth = getAuth()

  // data user mysql
  const getDataUser = async (email) => {
    try {
      const response = await api.get(`/user/email/email_user?email=${email}`)

      setUserLogned(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  // function login
  const login = async (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        getDataUser(email)

        showToast(`Bem vindo (a)`)

        navigation.navigate("DashBoard")
        // ...
      })
      .catch((error) => {
        error.code === "auth/user-not-found" && showToast("Email inválido!")
        error.code === "auth/invalid-email" && showToast("Email inválido!!")
        error.code === " auth/missing-password" &&
          showToast("Senha não informada!")
        error.code === "auth/internal-error" &&
          showToast("Senha não informada!")
        error.code === "auth/wrong-password" &&
          showToast("Email ou senha inválido!")
        console.log(error.code)
      })
  }

  // function logout
  const logOut = () => {
    signOut(auth)
      .then(() => {
        showToast(`Até a próxima!`) // Sign-out successful.
        setUserLogned(auth.uid)
        navigation.navigate("Home")
      })
      .catch((error) => {
        showToast(error)
      })
  }

  // --------------------------------------------------dashboard--------------------------------------------------

  // useState dashboard
  const [listChild, setListChild] = useState([])
  const [listDataEvent, setListDataEvent] = useState([])

  // all children
  const allChildren = async () => {
    try {
      const response = await api.get(`/child/${userLogned.id}`)
      setListChild(response.data)
      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  // all dataEvents. it is where have all informations about associate and refresh events
  const allDataEvents = async (user_id = 1) => {
    try {
      const response = await api.get(`/event_data/all/${user_id}`)
      setListDataEvent(response.data)
      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  const executeDashboard = async () => {
    await allChildren()
    await allDataEvents()
  }
  return (
    <AuthContext.Provider
      value={{
        login,
        logOut,
        userLogned,
        executeDashboard,
        listChild,
        listDataEvent,
      }}>
      {children}
    </AuthContext.Provider>
  )
}
