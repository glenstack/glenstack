import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { Text, View, TextInput } from "../base";
import { Button, CheckBox } from "react-native";
import { whitesmoke } from "color-name";

type ProgressBarProps = {
  numberOfStepsCompleted: string,
  numberOfSteps: string
}

export const ProgressBar = ({ numberOfStepsCompleted, numberOfSteps }: ProgressBarProps) => {

  const targetRef = useRef();
  const size = useDimensions(targetRef);

  var progressLength = []

  // Hook
  // https://stackoverflow.com/questions/49058890/how-to-get-a-react-components-size-height-width-before-render/49058984
  function useDimensions(targetRef) {
    const getDimensions = () => {
      return {
        width: targetRef.current ? targetRef.current.offsetWidth : 0,
        height: targetRef.current ? targetRef.current.offsetHeight : 0
      };
    };

    const [dimensions, setDimensions] = useState(getDimensions);

    const handleResize = () => {
      setDimensions(getDimensions());
    };

    useEffect(() => {
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    useLayoutEffect(() => {
      handleResize();
    }, []);
    return dimensions;
  }

  var completionTick
  
  const numberOfPoints = Math.ceil((Number(numberOfStepsCompleted)/Number(numberOfSteps)*(size.width-60))/4)
  var i=0;
  while(i < numberOfPoints){
    progressLength.push(
      <View className="bg-blue-700 h-2 flex w-1"></View>
    )
    i++;
  }

  if(numberOfPoints == 25){
    completionTick = 
    <View className="">
      <svg className="fill-blue" width="25" height="25" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M512,268c0,17.9-4.3,34.5-12.9,49.7c-8.6,15.2-20.1,27.1-34.6,35.4c0.4,2.7,0.6,6.9,0.6,12.6   c0,27.1-9.1,50.1-27.1,69.1c-18.1,19.1-39.9,28.6-65.4,28.6c-11.4,0-22.3-2.1-32.6-6.3c-8,16.4-19.5,29.6-34.6,39.7   C290.4,507,273.9,512,256,512c-18.3,0-34.9-4.9-49.7-14.9c-14.9-9.9-26.3-23.2-34.3-40c-10.3,4.2-21.1,6.3-32.6,6.3   c-25.5,0-47.4-9.5-65.7-28.6c-18.3-19-27.4-42.1-27.4-69.1c0-3,0.4-7.2,1.1-12.6c-14.5-8.4-26-20.2-34.6-35.4   C4.3,302.5,0,285.9,0,268c0-19,4.8-36.5,14.3-52.3c9.5-15.8,22.3-27.5,38.3-35.1c-4.2-11.4-6.3-22.9-6.3-34.3   c0-27,9.1-50.1,27.4-69.1c18.3-19,40.2-28.6,65.7-28.6c11.4,0,22.3,2.1,32.6,6.3c8-16.4,19.5-29.6,34.6-39.7   C221.6,5.1,238.1,0,256,0c17.9,0,34.4,5.1,49.4,15.1c15,10.1,26.6,23.3,34.6,39.7c10.3-4.2,21.1-6.3,32.6-6.3   c25.5,0,47.3,9.5,65.4,28.6c18.1,19.1,27.1,42.1,27.1,69.1c0,12.6-1.9,24-5.7,34.3c16,7.6,28.8,19.3,38.3,35.1   C507.2,231.5,512,249,512,268z M245.1,345.1l105.7-158.3c2.7-4.2,3.5-8.8,2.6-13.7c-1-4.9-3.5-8.8-7.7-11.4   c-4.2-2.7-8.8-3.6-13.7-2.9c-5,0.8-9,3.2-12,7.4l-93.1,140L184,263.4c-3.8-3.8-8.2-5.6-13.1-5.4c-5,0.2-9.3,2-13.1,5.4   c-3.4,3.4-5.1,7.7-5.1,12.9c0,5.1,1.7,9.4,5.1,12.9l58.9,58.9l2.9,2.3c3.4,2.3,6.9,3.4,10.3,3.4   C236.6,353.7,241.7,350.9,245.1,345.1z"/></svg>
    </View>
  }else{
    completionTick =
    <View className="">
      <svg className="fill-black" width="25" height="25" viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg"><path d="M95.833,0C42.991,0,0,42.99,0,95.833s42.991,95.834,95.833,95.834s95.833-42.991,95.833-95.834S148.676,0,95.833,0z   M150.862,79.646l-60.207,60.207c-2.56,2.56-5.963,3.969-9.583,3.969c-3.62,0-7.023-1.409-9.583-3.969l-30.685-30.685  c-2.56-2.56-3.97-5.963-3.97-9.583c0-3.621,1.41-7.024,3.97-9.584c2.559-2.56,5.962-3.97,9.583-3.97c3.62,0,7.024,1.41,9.583,3.971  l21.101,21.1l50.623-50.623c2.56-2.56,5.963-3.969,9.583-3.969c3.62,0,7.023,1.409,9.583,3.969  C156.146,65.765,156.146,74.362,150.862,79.646z"/></svg>
    </View>
  }

  return (
    <View>
      <Text className="text-xs ml-1">
        {numberOfStepsCompleted} of {numberOfSteps} steps complete
      </Text>
      <View className="flex-row mt-2">
        <View className="min-w-full"> 
          <View ref={targetRef} className="rounded-full bg-gray-200 py-2 px-4"></View>
        </View>
        <View className="rounded-full -ml-10 h-10 w-10 bg-gray-200 flex items-center justify-center -mt-3">
          {completionTick}
        </View>
      </View>
      <View className="flex-row min-w-full ml-2 -mt-6">
        <View className="rounded-l bg-blue-700 h-2 flex w-2"></View>
        {progressLength}
        <View className="rounded-r bg-blue-700 h-2 flex w-2"></View>
      </View>
    </View>
  );
};
