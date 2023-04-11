import { ToastAndroid } from "react-native"

export const showToast = (textToast) => {
  return ToastAndroid.show(textToast, ToastAndroid.SHORT)
}

// export const showToastWithGravity = () => {
//   ToastAndroid.showWithGravity(
//     "All Your Base Are Belong To Us",
//     ToastAndroid.SHORT,
//     ToastAndroid.CENTER
//   )
// }

// export const showToastWithGravityAndOffset = () => {
//   ToastAndroid.showWithGravityAndOffset(
//     "A wild toast appeared!",
//     ToastAndroid.LONG,
//     ToastAndroid.BOTTOM,
//     25,
//     50
//   )
// }
