import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { Comments, LocationIcon } from "../components/icons/Icons";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import { useState } from "react";

const Post = ({ way, name, country, commentsNumber, coords }) => {
  const [location, setLocation] = useState(null);
  const navigation = useNavigation();

  return (
    <View style={{ marginBottom: 32 }}>
      <View style={{ marginBottom: 8 }}>
        <Image
          source={{uri: way}}
          resizeMode={"cover"}
          style={{ width: "100%", height: 240, borderRadius: 8 }}
        />
      </View>
      <Text
        style={{
          marginBottom: 8,
          fontFamily: "Roboto-Medium",
          fontSize: 16,
          lineHeight: 18.75,
          color: "#212121",
        }}
      >
        {name}
      </Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Comments");
            }}
          >
            <Text>
              <Comments />
            </Text>
          </TouchableOpacity>
          <Text
            style={[
              styles.text,
              {
                color: "#BDBDBD",
              },
            ]}
          >
            {commentsNumber}
          </Text>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Map", { coords });
            }}
          >
            <Text>
              <LocationIcon />
            </Text>
          </TouchableOpacity>
          <Text
            style={[
              styles.text,
              {
                color: "#212121",
                textDecorationLine: "underline",
              },
            ]}
          >
            {country}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  text: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 18.75,
  },
});
