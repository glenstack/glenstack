import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useToken } from "../../providers/TokenProvider";

export const ErrorBanner = () => {
  const tokenState = useToken();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  useEffect(() => {
    (async () => {
      const { error } = await tokenState;
      setErrorMessage(error);
    })();
  }, [tokenState]);

  return <View>{errorMessage && <Text>{errorMessage}</Text>}</View>;
};
