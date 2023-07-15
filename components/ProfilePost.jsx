import { Image, StyleSheet, Text } from "react-native";
import { View } from "react-native";
import { Comments, LikesIcon, LocationIcon } from "../components/icons/Icons";

export const ProfilePost = ({ way, name, country, commentsNumber, likes }) => {
  return (
    <View style={{ marginBottom: 32 }}>
      <View style={{ marginBottom: 8 }}>
        <Image
          source={way}
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
        <View style={{ flexDirection: "row", gap: 24 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <Comments fill="#FF6C00" stroke="#FF6C00" />
            <Text
              style={[
                styles.text,
                {
                  color: "#212121",
                },
              ]}
            >
              {commentsNumber}
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <LikesIcon />
            <Text
              style={[
                styles.text,
                {
                  color: "#212121",
                },
              ]}
            >
              {likes}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
          <LocationIcon />
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

const styles = StyleSheet.create({
  text: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 18.75,
  },
});
