// Import the functions you need from the SDKs you need
// import { getAnalytics } from "firebase/analytics"
import AsyncStorage from "@react-native-async-storage/async-storage"
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth/react-native"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2bjCFLMA82fo1IVJeVb4ZVol506ZPIaQ",
  authDomain: "app-mizp-educa-cbef9.firebaseapp.com",
  projectId: "app-mizp-educa-cbef9",
  storageBucket: "app-mizp-educa-cbef9.appspot.com",
  messagingSenderId: "501007244545",
  appId: "1:501007244545:web:db4b9e1f4762ec35db4f00",
  measurementId: "G-R70M09XLKG",
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
})

export { auth }

// const analytics = getAnalytics(app)
