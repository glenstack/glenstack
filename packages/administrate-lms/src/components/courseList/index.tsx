import React from "react";
import { View, Text } from "react-native";
import { gql, useQuery } from "@apollo/client";
import { Logout } from "../login/logout";

const COURSE_LIST_QUERY = gql`
  query CourseListQuery {
    viewer {
      username
      firstName
      lastName
    }
  }
`;

export const CourseList = () => {
  const { loading, error, data } = useQuery<any>(COURSE_LIST_QUERY);

  // TODO: Loading & error states

  return (
    <View>
      <Text>{data?.viewer?.username}</Text>
      <Text>{data?.viewer?.firstName}</Text>
      <Text>{data?.viewer?.lastName}</Text>
      <Logout />
    </View>
  );
};
