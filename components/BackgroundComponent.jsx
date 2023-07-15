import { ImageBackground } from "react-native";
import { globalStyles } from "../globalStyles";

export const BackgroundComponent = ({ children }) => {
  return (
    <ImageBackground
      source={require("../assets/images/Photo-BG.jpg")}
      resizeMode="cover"
      style={globalStyles.image}
    >
      {children}
    </ImageBackground>
  );
};
