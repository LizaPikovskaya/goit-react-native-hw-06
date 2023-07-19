import { TouchableOpacity, useAnimatedValue } from "react-native";
import * as React from "react";
import { LogoutIcon } from "./icons/Icons";
import { auth } from "../config";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { logOut } from "../redux/authSlice";

export const HeaderLogoutButton = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const handleLogOut = () => {
    auth
      .signOut()
      .then(() => {
        dispatch(logOut());
        navigation.navigate("Login");
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <TouchableOpacity onPress={handleLogOut}>
      <LogoutIcon style={{ marginRight: 20 }} />
    </TouchableOpacity>
  );
};
