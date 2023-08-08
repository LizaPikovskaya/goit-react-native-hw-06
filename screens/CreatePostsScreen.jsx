import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  Platform,
} from "react-native";
import { Text } from "react-native";
import { globalStyles } from "../globalStyles";
import { Image } from "react-native";
import { CameraIcon, LocationIcon, Trash } from "../components/icons/Icons";
import { useEffect, useState } from "react";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { addPost } from "../redux/postSlice";
import * as Location from "expo-location";
import { addPostFirebase } from "../servises/posts.services";

export const CreatePostsScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [photoName, setPhotoName] = useState("");
  const [locationName, setLocationName] = useState("");
  const [isOpenKeyboard, setIsOpenKeyboard] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasMediaPermission, setHasMediaPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [photoUri, setPhotoUri] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaPermission = await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaPermission(mediaPermission.status === "granted");
    })();
  }, []);

  const handlePublishPost = () => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }
      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setLocation(coords);
      try {
        await addPostFirebase({
          photoName,
          locationName,
          photoUri,
          location: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
          commentsNumber: 0,
        });


      } catch (error) {
        console.log(error);
      }
    })();

    dispatch(
      addPost({
        photoName,
        locationName,
        photoUri,
        location,
        commentsNumber: 0,
      })
    );
    navigation.navigate("Home", { screen: "Posts" });
    setPhotoName("");
    setLocationName("");
    setPhotoUri(null);
  };
  const takePicture = async () => {
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      setPhotoUri(uri);
      await MediaLibrary.createAssetAsync(uri);
    }
  };
  if (hasCameraPermission === null) {
    return (
      <View
        style={[
          globalStyles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Text style={{ fontFamily: "Roboto-Medium", fontSize: 22 }}>
          Loading...
        </Text>
      </View>
    );
  }
  if (!hasCameraPermission) {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <Text>No access to camera.</Text>
      </View>
    );
  }
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
              justifyContent: "flex-end",
              paddingBottom: isOpenKeyboard ? 55 : 34,
              paddingLeft: 16,
              paddingRight: 16,
              paddingTop: 32,
            },
          ]}
        >
          <View>
            {!photoUri ? (
              <Camera
                style={styles.photoWrapper}
                type={type}
                ref={setCameraRef}
              >
                <TouchableOpacity onPress={takePicture}>
                  <View
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 30,
                      backgroundColor: "white",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <CameraIcon />
                  </View>
                </TouchableOpacity>
                <Image />
              </Camera>
            ) : (
              <View style={styles.photoWrapper}>
                <Image source={{ uri: photoUri }} style={styles.photo} />
              </View>
            )}
            <Text style={styles.text}>Завантажте фото</Text>
            <View>
              <TextInput
                style={[
                  styles.input,
                  { height: 50, fontFamily: "Roboto-Medium" },
                ]}
                placeholder="Назва..."
                onFocus={() => setIsOpenKeyboard(true)}
                onBlur={() => setIsOpenKeyboard(false)}
                value={photoName}
                onChangeText={setPhotoName}
              />

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 4,
                  borderBottomWidth: 1,
                  borderColor: "#E8E8E8",
                  height: 50,
                  marginBottom: 32,
                }}
              >
                <LocationIcon />
                <TextInput
                  style={[
                    styles.input,
                    {
                      flex: 1,
                      borderBottomWidth: 0,
                      marginBottom: 0,
                      fontFamily: "Roboto-Regular",
                    },
                  ]}
                  placeholder="Місцевість..."
                  onFocus={() => setIsOpenKeyboard(true)}
                  onBlur={() => setIsOpenKeyboard(false)}
                  value={locationName}
                  onChangeText={setLocationName}
                />
              </View>
            </View>
            <TouchableOpacity
              style={globalStyles.button}
              onPress={handlePublishPost}
            >
              <Text style={globalStyles.buttonText}>Опубліковати</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }} />
          <TouchableOpacity
            onPress={() => {
              setPhotoUri(null);
            }}
          >
            <View
              style={{
                // position: "absolute",
                // bottom: 0,
                width: 70,
                height: 40,
                borderRadius: 20,
                backgroundColor: "#F6F6F6",
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
              }}
            >
              <Trash />
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  photoWrapper: {
    with: "100%",
    height: 240,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    marginBottom: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 18.75,
    color: "#BDBDBD",
    marginBottom: 32,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
    fontSize: 16,
    marginBottom: 16,
  },
  photo: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
});
