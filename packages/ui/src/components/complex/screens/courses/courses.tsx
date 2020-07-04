import React, { useReducer } from "react";
import { Text, View, TextInput } from "../../../base";
import { Button, CheckBox } from "react-native";
import { TabsWithDescription } from "../../tailwindui/application-ui/nav/tabsWithDescription/tabsWithDescription";
import { CardProgress } from "../../tailwindui/application-ui/content/cardProgress/cardProgress";

const tabTitles = ["Courses", "Timeline", "Resources"];

export const Courses = () => {
  return (
    <View>
      <TabsWithDescription title="Administrate LMS" subtitle="Location: Concordia University" tabTitles={tabTitles} selectedTitle="Timeline"></TabsWithDescription>
      <CardProgress title="Certifications" subtitle="Accounting 101 - eLearning" numberOfStepsCompleted="3" numberOfSteps="5"></CardProgress>
      <CardProgress title="Certifications" subtitle="Something else" numberOfStepsCompleted="2" numberOfSteps="5"></CardProgress>
    </View>
  );
};
