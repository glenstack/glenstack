import React from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";

export default function App() {
  const runFirst = `
    setTimeout(function() { document.getElementById("username").value = "l33t h4X0r" }, 2000);
    true; // note: this is required, or you'll sometimes get silent failures
  `;
  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{
          uri: "https://www.administratelms.com/login?r=/",
          // uri: "https://d5a76d445c61e1-lms.administratelms.com/login",
        }}
        injectedJavaScript={runFirst}
      />
    </View>
  );
}
