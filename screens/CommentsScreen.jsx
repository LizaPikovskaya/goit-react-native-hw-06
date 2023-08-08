import {
  Image,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
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
import { FlatList, ScrollView } from "react-native-gesture-handler";
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
          <ScrollView>
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
              // keyboardShouldPersistTaps="handled"
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
          </ScrollView>
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

    // <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    //   <KeyboardAvoidingView
    //     behavior={Platform.OS === "ios" ? "padding" : "height"}
    //     style={{ flex: 1 }}
    //   >
    //     <View style={{ flex: 1 }}>
    //       <SafeAreaView style={{ flex: 1 }}>
    //         <ScrollView
    //           contentContainerStyle={{
    //             flexGrow: 1,
    //             paddingBottom: isOpenKeyboard ? 100 : 16,
    //           }}
    //         >
    //           <View
    //             style={[
    //               globalStyles.container,
    //               {
    //                 paddingTop: 32,
    //                 paddingLeft: 16,
    //                 paddingRight: 16,
    //                 justifyContent: "flex-end",
    //               },
    //             ]}
    //           >
    //             <Image
    //               source={{ uri: imageUrl }}
    //               resizeMode={"cover"}
    //               style={{
    //                 width: "100%",
    //                 height: 240,
    //                 borderRadius: 8,
    //                 marginBottom: 32,
    //               }}
    //             />
    //             <FlatList
    //               keyboardShouldPersistTaps="handled"
    //               data={commentsData}
    //               keyExtractor={(item) => item.id}
    //               renderItem={({ item }) => (
    //                 <Comment
    //                   img={require("../assets/images/comments-photo-user.png")}
    //                   text={item.comment}
    //                   time={formatTimestamp(item.timestamp)}
    //                 />
    //               )}
    //             />
    //           </View>
    //         </ScrollView>
    //       </SafeAreaView>
    //       <View>
    //         <TextInput
    //           onFocus={() => setIsOpenKeyboard(true)}
    //           onBlur={() => setIsOpenKeyboard(false)}
    //           value={comment}
    //           onChangeText={setComment}
    //           style={{
    //             width: "100%",
    //             height: 50,
    //             backgroundColor: "#F6F6F6",
    //             borderWidth: 1,
    //             borderColor: "#E8E8E8",
    //             paddingLeft: 16,
    //             paddingRight: 16,
    //             borderRadius: 25,
    //             fontSize: 16,
    //             lineHeight: 19.36,
    //           }}
    //           placeholder="Коментувати..."
    //         />
    //         <TouchableOpacity
    //           onPress={() => handleAddComment(postId, comment)}
    //           style={{
    //             position: "absolute",
    //             right: 8,
    //             top: 8,
    //             width: 34,
    //             height: 34,
    //             borderRadius: 17,
    //             backgroundColor: "#FF6C00",
    //             justifyContent: "center",
    //             alignItems: "center",
    //           }}
    //         >
    //           <ArrowUp />
    //         </TouchableOpacity>
    //       </View>
    //     </View>
    //   </KeyboardAvoidingView>
    // </TouchableWithoutFeedback>
  );
};
