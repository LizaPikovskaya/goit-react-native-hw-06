import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  ImageBackground,
  Keyboard,
  Text,
} from "react-native";
import { Registration } from "./screens/RegistrationScreen";
import { Login } from "./screens/LoginScreen";
import { useFonts } from "expo-font";
import { TouchableWithoutFeedback } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "./screens/HomeScreen";
import { HeaderLogoutButton } from "./components/HeaderLogoutButton";
import { CreatePostsScreen } from "./screens/CreatePostsScreen";
import TabNavigation from "./components/TabNavigation";
import { BackButton } from "./components/BackButton";
import { PostsScreen } from "./screens/PostsScreen";
import { CommentsScreen } from "./screens/CommentsScreen";
import { MapScreen } from "./screens/MapScreen";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./redux/store";
import { useNavigation } from "@react-navigation/native";
import { auth } from "./config";
import { useEffect, useState } from "react";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  const MainStack = createStackNavigator();
  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <NavigationContainer>
        <MainStack.Navigator initialRouteName="Login">
          <MainStack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
            }}
          />
          <MainStack.Screen
            name="Registration"
            component={Registration}
            options={{
              headerShown: false,
            }}
          />
          <MainStack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
          <MainStack.Screen
            name="Comments"
            component={CommentsScreen}
            options={{
              title: "Коментарі",
              headerShown: true,
              headerLeft: () => <BackButton />,
              headerStyle: {
                borderBottomWidth: 1,
              },
            }}
          />
          <MainStack.Screen
            name="Map"
            component={MapScreen}
            options={{
              title: "Мапа",
              headerShown: true,
              headerLeft: () => <BackButton />,
              headerStyle: {
                borderBottomWidth: 1,
              },
            }}
          />
        </MainStack.Navigator>
      </NavigationContainer>
      {/* </PersistGate> */}
    </Provider>
  );
}
