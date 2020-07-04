import React from "react";
import { Button } from "react-native";
import { useTokenDispatch } from "../../providers/TokenProvider";
import { getGuestToken } from "../../auth/tokens";
import { useDomain } from "../../providers/DomainProvider";
import { useNavigation, StackActions } from "@react-navigation/native";

export const Logout = () => {
  const domain = useDomain();
  const navigation = useNavigation();
  const tokenDispatch = useTokenDispatch();

  const logout = () => {
    tokenDispatch && tokenDispatch(() => getGuestToken({ domain }));
    navigation.dispatch(StackActions.replace("Login"));
  };

  return <Button onPress={logout} title="Logout" />;
};
