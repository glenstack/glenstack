import React, { useState } from "react";
import { View, TextInput, Text, Button } from "react-native";
import { useLoginDispatch } from "../../providers/TokenProvider";
import { useDomain } from "../../providers/DomainProvider";

export const UsernamePassword = () => {
  const domain = useDomain();
  const loginDispatch = useLoginDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = () => {
    setLoading(true);
    loginDispatch({ domain, username, password });
  };

  return (
    <View>
      <View>
        <Text>Email:</Text>
        <TextInput
          value={username}
          onChangeText={(value) => setUsername(value)}
          autoFocus={true}
          autoCompleteType="email"
          textContentType="emailAddress"
          accessibilityLabel="Username"
          keyboardType="email-address"
          autoCapitalize="none"
          returnKeyType="next"
        />
        <Text>Password:</Text>
        <TextInput
          value={password}
          onChangeText={(value) => setPassword(value)}
          autoCompleteType="password"
          textContentType="password"
          accessibilityLabel="Password"
          secureTextEntry={true}
          autoCapitalize="none"
          onSubmitEditing={login}
        />
      </View>
      <Button title="Login" disabled={loading} onPress={login} />
    </View>
  );
};
