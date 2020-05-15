import { SafeAreaView, View, Text, Image } from "react-native";
import { Nav, A } from "@expo/html-elements";

import tailwind from "tailwind-rn";
import React from "react";

const Tailwind = () => (
  <SafeAreaView style={tailwind("bg-gray-800")}>
    <Nav style={tailwind("bg-gray-800")}>
      <View style={tailwind("sm:hidden")}>
        <View style={tailwind("px-2 pt-2 pb-3")}>
          <View style={{ flexDirection: "row" }}>
            <Image source={{ uri: "./HabichatLogoV2.png" }}></Image>
            <A
              style={tailwind(
                "mt-1 block px-3 py-2 rounded-md text-base font-large text-white hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
              )}
            >
              G
            </A>
            <A
              style={tailwind(
                "mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
              )}
            >
              Glenstack
            </A>
            <A
              style={tailwind(
                "block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
              )}
            >
              Home
            </A>
            <A
              style={tailwind(
                "mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
              )}
            >
              About us
            </A>
            <A
              style={tailwind(
                "mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
              )}
            >
              Contact
            </A>
          </View>
        </View>
      </View>
    </Nav>
  </SafeAreaView>
);

export default Tailwind;
