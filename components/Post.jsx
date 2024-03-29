import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { Comments, LocationIcon, Trash } from "../components/icons/Icons";
import { useNavigation } from "@react-navigation/native";
// import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { db } from "../config";
import { collection, onSnapshot } from "firebase/firestore";
import { deletePostFirebase } from "../servises/posts.services";

const Post = ({
  id,
  imageUrl,
  name,
  country,
  commentsNumber,
  coords,
  getPosts,
}) => {
  const [location, setLocation] = useState(null);
  const [commentsData, setCommentsData] = useState([]);
  // console.log(commentsData);
  const navigation = useNavigation();
  const postId = id;

  // useEffect(() => {
  //   getComments(postId);
  // }, []);

  // const getComments = async (postId) => {
  //   const commentsRef = collection(db, "posts", postId, "comments");
  //   const commentsSnapshot = await getDocs(
  //     collection(db, "posts", postId, "comments")
  //   );
  //   const comments = commentsSnapshot.docs.map((doc) => ({
  //     ...doc.data(),
  //     id: doc.id,
  //   }));
  //   setCommentsData(comments);
  // };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts", postId, "comments"),
      (snapshot) => {
        const newCommentsData = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setCommentsData(newCommentsData);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleDeletePost = async (id) => {
    try {
      deletePostFirebase(id);
      alert("Deleted succesufully");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <View style={{ marginBottom: 32 }}>
        <View style={{ marginBottom: 8 }}>
          <Image
            source={{ uri: imageUrl }}
            resizeMode={"cover"}
            style={{ width: "100%", height: 240, borderRadius: 8 }}
          />
          <TouchableOpacity
            onPress={() => handleDeletePost(postId)}
            style={{
              position: "absolute",
              right: 5,
              top: 5,
              width: 30,
              height: 30,
              borderRadius: 20,
              backgroundColor: "#F6F6F6",
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <Trash />
          </TouchableOpacity>
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
                navigation.navigate("Comments", { imageUrl, postId });
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
              {commentsData.length}
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
    </>
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
