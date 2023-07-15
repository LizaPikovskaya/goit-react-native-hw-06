import { Image, ScrollView, StyleSheet, Text } from "react-native";
import { BackgroundComponent } from "../components/BackgroundComponent";
import { View } from "react-native";
import { TouchableOpacity } from "react-native";
import { CloseIcon, LogoutIcon } from "../components/icons/Icons";
import { ProfilePost } from "../components/ProfilePost";

export const ProfileScreen = () => {
  return (
    <BackgroundComponent>
      {/* <ScrollView style={{ flex: 1 }} > */}
      <View style={styles.wrapper}>
        <TouchableOpacity style={{ position: "absolute", right: 16, top: 22 }}>
          <LogoutIcon />
        </TouchableOpacity>
        <View style={styles.photoWrapper}>
          <Image source={require("../assets/images/user120x120.png")} />
          <TouchableOpacity style={styles.deletePhotoButton}>
            <CloseIcon />
          </TouchableOpacity>
        </View>
        <Text style={styles.text}>Natali Romanova</Text>
        <ScrollView >

        <ProfilePost
          way={require("../assets/images/sky.jpg")}
          name={"Ліс"}
          commentsNumber={8}
          country={"Ukraine"}
          likes={153}
        />
        <ProfilePost
          way={require("../assets/images/sunset.jpg")}
          name={"Захід на Чорному морі"}
          commentsNumber={2}
          country={"Ukraine"}
          likes={200}
        />
        <ProfilePost
          way={require("../assets/images/house.jpg")}
          name={"Старий будиночок у Венеції"}
          commentsNumber={50}
          country={"Italy"}
          likes={200}
        />
      </ScrollView>
      </View>
    </BackgroundComponent>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingLeft:16,
    paddingRight:16,
    height: '80%',
    width:'100%',
    backgroundColor: "white",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    alignContent:'flex-end'
  },
  photoWrapper: {
    width: 120,
    height: 120,
    position: "absolute",
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    top: -60,
    left: "50%",
    transform: [{ translateX: -60 }],
  },
  deletePhotoButton: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: 25,
    height: 25,
    borderColor: "#E8E8E8",
    backgroundColor: "white",
    borderRadius: 12.5,
    borderWidth: 1,
    top: 81,
    right: -12.5,
  },
  text: {
    marginTop: 92,
    marginBottom:32,
    textAlign: "center",
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35.16,
    color: "#212121",
  },
});
