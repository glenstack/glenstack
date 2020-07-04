import React, { useReducer } from "react";
import { Text, View, TextInput } from "../../../../../base";
import { Button, CheckBox } from "react-native";


// How do?
// https://github.com/tailwindcss/discuss/issues/73
// @responsive {
//   .bg-gradient-blue-to-purple {
//     background-image: linear-gradient(to right, config('colors.blue'), config('colors.purple'));
//   }
// }

type CardProps = {
  title: string,
  subtitle: string
}

export const Card = ({ title, subtitle }: CardProps) => {
  return (
    <View className="bg-red-800 h-24 m-4 rounded-sm shadow-lg">
      <View className="mr-6 mt-4 ml-8">
        <Text className="font-bold text-lg">{title}</Text>
      </View>
      <View className="mr-6 mt-4 ml-8">
        <Text className="text-sm">{subtitle}</Text>
      </View>
    </View>
  );
};
