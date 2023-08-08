import { FlatList, Image, SafeAreaView, StyleSheet, Text } from "react-native";
// import TabNavigation, { FocusedIcon } from "../components/TabNavigation";
import { View, ScrollView } from "react-native";
import { globalStyles } from "../globalStyles";
import Post from "../components/Post";
import { useDispatch, useSelector } from "react-redux";
import { selectEmail, selectPosts, selectUserName } from "../redux/selectors";
import { auth } from "../config";
import { useEffect, useState } from "react";
import {
  getAllPostsFirebase,
  postsCollectionRef,
} from "../servises/posts.services";
import { onSnapshot } from "firebase/firestore";

export const PostsScreen = () => {
  const posts = useSelector(selectPosts);
  const dispatch = useDispatch();

  const [user, setUser] = useState(null);
  const [postsData, setPostsData] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(postsCollectionRef, (snapshot) => {
      const newData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPostsData(newData);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (!user) {
    return (
      <View
        style={[
          globalStyles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Text style={{ fontFamily: "Roboto-Medium", fontSize: 22 }}>
          Please, wait...
        </Text>
      </View>
    );
  }

  return (
    <>
      {/* <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}> */}
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
              {user?.displayName}
            </Text>
            <Text
              style={{
                fontFamily: "Roboto-Regular",
                lineHeight: 12.89,
                fontSize: 11,
                color: "#212121CC",
              }}
            >
              {user?.email}
            </Text>
          </View>
        </View>
        {/* <SafeAreaView style={{ flex: 1 }}> */}
        <FlatList
          data={postsData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Post
              id={item.id}
              imageUrl={item.photoUri}
              name={item.photoName}
              commentsNumber={item.commentsNumber}
              country={item.locationName}
              coords={item.location}
            />
          )}
        ></FlatList>
        {/* </SafeAreaView> */}
      </View>
      {/* </ScrollView> */}
    </>
  );
};
