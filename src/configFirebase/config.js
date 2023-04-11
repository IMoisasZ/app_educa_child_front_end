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
  apiKey: "AIzaSyB3INhp_49x1J8VMOmwtzQWpvakOJlZm48",
  authDomain: "app-mizp-educa-a5738.firebaseapp.com",
  projectId: "app-mizp-educa-a5738",
  storageBucket: "app-mizp-educa-a5738.appspot.com",
  messagingSenderId: "569332248847",
  appId: "1:569332248847:web:d4b92992a646a196e2ce7a",
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
})

export { auth }
