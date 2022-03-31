import { Dimensions } from "react-native"

export const screenScale = () => {
  const scale = Dimensions.get("window").height / Dimensions.get("window").width
  switch (true) {
    case parseFloat(scale.toFixed(3)) >= 2.056:
      return "18.5/9"
    case parseFloat(scale.toFixed(3)) >= 2.000:
      return "18/9"
    case parseFloat(scale.toFixed(3)) >= 1.889:
      return "17/9"
    case parseFloat(scale.toFixed(3)) >= 1.778: 
      return "16/9"
    case parseFloat(scale.toFixed(3)) >= 1.333:
      return "4/3"
    default:
      return "17/9"
  }
}
