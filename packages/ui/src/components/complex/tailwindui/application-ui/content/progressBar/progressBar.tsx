import React, { useReducer } from "react";
import { Text, View, TextInput } from "../../../../../base";
import { Button, CheckBox } from "react-native";

type ProgressBarProps = {
  numberOfStepsCompleted: string,
  numberOfSteps: string
}

export const ProgressBar = ({ numberOfStepsCompleted, numberOfSteps }: ProgressBarProps) => {
  return (
    <View>
      <Text className="text-xs ml-1">
        {numberOfStepsCompleted} of {numberOfSteps} steps complete
      </Text>
      <View className="flex-row mt-2">
        <View className="min-w-full"> 
          <View className="rounded-full bg-gray-200 py-2 px-4"></View>
        </View>
        <View className="rounded-full -ml-10 h-10 w-10 bg-gray-200 flex items-center justify-center -mt-3">
          <View className="">
            <svg className="fill-black" width="25" height="25" viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg"><path d="M95.833,0C42.991,0,0,42.99,0,95.833s42.991,95.834,95.833,95.834s95.833-42.991,95.833-95.834S148.676,0,95.833,0z   M150.862,79.646l-60.207,60.207c-2.56,2.56-5.963,3.969-9.583,3.969c-3.62,0-7.023-1.409-9.583-3.969l-30.685-30.685  c-2.56-2.56-3.97-5.963-3.97-9.583c0-3.621,1.41-7.024,3.97-9.584c2.559-2.56,5.962-3.97,9.583-3.97c3.62,0,7.024,1.41,9.583,3.971  l21.101,21.1l50.623-50.623c2.56-2.56,5.963-3.969,9.583-3.969c3.62,0,7.023,1.409,9.583,3.969  C156.146,65.765,156.146,74.362,150.862,79.646z"/></svg>
          </View>
        </View>
      </View>
      <View className="flex-row -mt-6">
        <View className="rounded-full bg-blue-700 h-2 ml-1 w-24 flex"></View>
      </View>
    </View>
  );
};
