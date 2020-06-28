import React, { useEffect } from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import * as Linking from "expo-linking";
import registerRootComponent from "expo/build/launch/registerRootComponent";

export default function App() {
  const interceptor = (...args: any[]) => {
    console.log(args);
    return true;
  };
  console.log("Hello");
  useEffect(() => {
    // (async () => {
    //   FileSystem.downloadAsync(
    //     "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    //     FileSystem.documentDirectory + "test.pdf",
    //     {
    //       headers: {
    //         Cookie: "portalToken=",
    //       },
    //     }
    //   )
    //     .then(({ uri, md5 }) => {
    //       console.log("DONE!", uri, md5);
    //       console.log("Loading");
    //       Sharing.shareAsync(uri);
    //       FileSystem.readAsStringAsync(uri)
    //         .then((value) => {
    //           console.log("value", value);
    //         })
    //         .catch((error) => console.error(error));
    //     })
    //     .catch((error) => console.error(error));
    // })();
  });

  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{
          uri: "https://d5a76d445c61e1-lms.administratelms.com/",
        }}
        onShouldStartLoadWithRequest={interceptor}
        onFileDownload={({ nativeEvent }) => {
          FileSystem.downloadAsync(
            nativeEvent.downloadUrl,
            FileSystem.documentDirectory + "test"
          )
            .then(({ uri }) => console.log("Downloaded"))
            .catch((error) => console.error(error));
        }}
        allowFileAccess={true}
        allowFileAccessFromFileURLs={true}
        allowUniversalAccessFromFileURLs={true}
        originWhitelist={["https://*", "http://*", "blob:*", "file://*"]}
        allowsFullscreenVideo={true}
        allowsInlineMediaPlayback={true}
        userAgent={
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:77.0) Gecko/20100101 Firefox/77.0"
        }
        onError={(error) => console.error(error)}
        onHttpError={(error) => console.error(error)}
      />
    </View>
  );
}

registerRootComponent(App);
