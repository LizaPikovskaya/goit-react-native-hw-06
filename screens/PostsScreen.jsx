import { FlatList, Image, SafeAreaView, StyleSheet, Text } from "react-native";
// import TabNavigation, { FocusedIcon } from "../components/TabNavigation";
import { View, ScrollView } from "react-native";
import { globalStyles } from "../globalStyles";
import Post from "../components/Post";
import { useSelector } from "react-redux";
import { selectPosts } from "../redux/selectors";

export const PostsScreen = () => {
  const posts = useSelector(selectPosts);
  console.log(posts);
  return (
    <ScrollView style={{ flex: 1,backgroundColor:'#fff' }}>
      <View
        style={[
          globalStyles.container,
          {
            flexDirection: "column",
            paddingLeft: 16,
            paddingRight: 16,
            paddingTop: 32,
          },
        ]}
      >
        <View style={{ gap: 8, flexDirection: "row", marginBottom: 32 }}>
          <View
            style={{
              width: 60,
              height: 60,
              backgroundColor: "#F6F6F6",
              borderRadius: 16,
            }}
          >
            <Image source={require("../assets/images/user.png")} />
          </View>
          <View style={{ marginTop: 16 }}>
            <Text
              style={{
                fontFamily: "Roboto-Medium",
                lineHeight: 15.23,
                fontSize: 13,
              }}
            >
              Natali Romanova
            </Text>
            <Text
              style={{
                fontFamily: "Roboto-Regular",
                lineHeight: 12.89,
                fontSize: 11,
                color: "#212121CC",
              }}
            >
              email@example.com
            </Text>
          </View>
        </View>
        {/* <SafeAreaView style={{ flex: 1 }}> */}
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Post
              // key={item.key}
              way={item.imageUrl}
              name={item.name}
              commentsNumber={item.commentsNumber}
              country={item.location}
              coords={item.coords}
            />
          )}
        ></FlatList>
        {/* </SafeAreaView> */}

        {/* <Post
          way={require("../assets/images/sky.jpg")}
          name={"Ліс"}
          commentsNumber={0}
          country={"Ivano-Frankivs'k Region, Ukraine"}
        />
        <Post
          way={require("../assets/images/sunset.jpg")}
          name={"Захід на Чорному морі"}
          commentsNumber={0}
          country={"Ukraine"}
        />
        <Post
          way={require("../assets/images/house.jpg")}
          name={"Старий будиночок у Венеції"}
          commentsNumber={0}
          country={"Ukraine"}
        /> */}
      </View>
    </ScrollView>
  );
};
