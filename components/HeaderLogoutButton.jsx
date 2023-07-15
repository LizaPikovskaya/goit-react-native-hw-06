import { TouchableOpacity } from "react-native";
import * as React from "react";
import { LogoutIcon } from "./icons/Icons";


export const HeaderLogoutButton = () => {
  const handleLogOut = () => {};
  return (
    <TouchableOpacity onPress={handleLogOut}>
      <LogoutIcon style={{ marginRight: 20 }} />
    </TouchableOpacity>
  );
};
