import {
  Image,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Text } from "react-native";
import { globalStyles } from "../globalStyles";
import Comment from "../components/Comment";
import { ArrowUp } from "../components/icons/Icons";
import { useEffect, useState } from "react";
import {
  addCommentFirebase,
  getAllCommentsFirebase,
} from "../servises/comments.servises";
import { FlatList } from "react-native-gesture-handler";
import { db } from "../config";
import { collection, addDoc, getDocs } from "firebase/firestore";
export const CommentsScreen = ({ route }) => {
  const [isOpenKeyboard, setIsOpenKeyboard] = useState(false);
  const [comment, setComment] = useState("");
  const [commentsData, setCommentsData] = useState([]);
  const { imageUrl, postId } = route.params;
  console.log(commentsData);
  useEffect(() => {
    getComments();
  }, []);

  const getComments = async () => {
    const commentsRef = collection(db, "posts", postId, "comments");
    const commentsSnapshot = await getDocs(
      collection(db, "posts", postId, "comments")
    );
    const comments = commentsSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setCommentsData(comments);
  };

  const handleAddComment = async (postId, comment) => {
    commentsCollection(postId, comment);
    getComments();
    setComment("");
  };
  const commentsCollection = async (postId, comment) => {
    const collectionRef = collection(db, "posts", postId, "comments");
    const timestamp = new Date().toISOString();

    try {
      await addDoc(collectionRef, { comment, timestamp });
    } catch (error) {
      console.log(error);
    }
  };
  const formatTimestamp = (timestamp) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(timestamp).toLocaleString("uk-UA", options);
  };

  // const updateDataInFirestore = async (collectionName, docId) => {
  //     try {
  //       const ref = doc(db, collectionName, docId);
  //       await updateDoc(ref, {
  //       comments: arrayUnion(comment),
  //     });
  //       console.log("document updated");
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   useEffect(()=>{
  //     updateDataInFirestore("posts", postId);
  //   },[])

  // useEffect(() => {
  //   fetchComments(postId);
  // }, []);

  // const handleLeaveComment = async () => {
  //   try {
  //     await addDoc(collection(db, "posts", postId, "comments"), {
  //       comment,
  //       timestamp: new Date(),
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   setComment("");
  //   // fetchComments(postId);

  // };
  // const fetchComments = async (postId) => {
  //   try {
  //     const commentsSnapshot = await getDocs(
  //       collection(db, "posts", postId, "comments")
  //     );
  //     const comments = commentsSnapshot.docs.map((doc) => doc.data());
  //     console.log(comments);
  //     setCommentsData(comments);
  //   } catch (error) {
  //     console.log("Error fetching comments:", error);
  //   }
  // };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          flex: 1,
        }}
      >
        <View
          style={[
            globalStyles.container,
            {
              paddingTop: 32,
              paddingLeft: 16,
              paddingRight: 16,
              paddingBottom: isOpenKeyboard ? 100 : 16,
              justifyContent: "flex-end",
            },
          ]}
        >
          <View>
            <Image
              source={{ uri: imageUrl }}
              resizeMode={"cover"}
              style={{
                width: "100%",
                height: 240,
                borderRadius: 8,
                marginBottom: 32,
              }}
            />
            <FlatList
              data={commentsData}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Comment
                  // key={item.key}
                  img={require("../assets/images/comments-photo-user.png")}
                  text={item.comment}
                  time={formatTimestamp(item.timestamp)}
                />
              )}
            ></FlatList>
            {/* <Comment
              img={require("../assets/images/comments-photo.png")}
              text={
                "Really love your most recent photo. I’ve been trying to capture thesame thing for a few months and would love some tips!"
              }
              date={"09 червня, 2020 | 08:40"}
            />
            <Comment
              img={require("../assets/images/comments-photo-user.png")}
              text={
                "A fast 50mm like f1.8 would help with the bokeh. I’ve been using primes as they tend to get a bit sharper images."
              }
              direction={"row-reverse"}
              textAlign={"left"}
              date={"09 червня, 2020 | 09:14"}
            />
            <Comment
              img={require("../assets/images/comments-photo.png")}
              text={"Thank you! That was very helpful!"}
              date={"09 червня, 2020 | 09:20"}
            /> */}
          </View>
          <View style={{ flex: 1 }}></View>
          <View>
            <TextInput
              onFocus={() => setIsOpenKeyboard(true)}
              onBlur={() => setIsOpenKeyboard(false)}
              value={comment}
              onChangeText={setComment}
              style={{
                width: "100%",
                height: 50,
                backgroundColor: "#F6F6F6",
                borderWidth: 1,
                borderColor: "#E8E8E8",
                paddingLeft: 16,
                paddingRight: 16,
                borderRadius: 25,
                fontSize: 16,
                lineHeight: 19.36,
              }}
              placeholder="Коментувати..."
            />
            <TouchableOpacity
              onPress={() => handleAddComment(postId, comment)}
              style={{
                position: "absolute",
                right: 8,
                top: 8,
                width: 34,
                height: 34,
                borderRadius: 17,
                backgroundColor: "#FF6C00",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ArrowUp />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};
