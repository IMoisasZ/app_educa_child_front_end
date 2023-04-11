import React, { createContext, useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { getAuth, signOut, signInWithEmailAndPassword } from "firebase/auth"
import { showToast } from "../utils/toast"
import { app } from "../configFirebase/config"

export const AuthContext = createContext({})

export default function AuthProvider({ children }) {
  // useState
  const [userLogned, setUserLogned] = useState("")

  // useNavigation
  const navigation = useNavigation()

  // initialize app firebase to autenticate
  const initializeApp = () => app
  initializeApp()
  const auth = getAuth()

  // functon login
  const login = async (email, password, dataUser) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        setUserLogned(dataUser[0])
        showToast(`Bem vindo ${dataUser[0].name}`)
        console.log(user)
        navigation.navigate("DashBoard")
        // ...
      })
      .catch((error) => {
        error.code === "auth/invalid-email" &&
          showToast("Email não existente ou não informado!")
        error.code === "auth/internal-error" &&
          showToast("Senha não informada!")
        error.code === "auth/wrong-password" &&
          showToast("Email ou senha inválida!")
        const errorCode = error.code
        const errorMessage = error.message
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
  return (
    <AuthContext.Provider value={{ login, logOut, userLogned }}>
      {children}
    </AuthContext.Provider>
  )
}
