import React from "react";
import registerRootComponent from "expo/build/launch/registerRootComponent";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { DomainProvider } from "./providers/DomainProvider";
import { TokenProvider } from "./providers/TokenProvider";
import { ClientProvider } from "./providers/ClientProvider";
import { Login } from "./components/login";
import {
  SSOWebViewModal,
  SSOWebViewModalParams,
} from "./components/login/ssoWebViewModal";
import { CourseList } from "./components/courseList";

type StackParamList = {
  Login: undefined;
  "Course List": undefined;
} & SSOWebViewModalParams;

const Stack = createStackNavigator<StackParamList>();

const App = () => {
  return (
    <DomainProvider>
      <TokenProvider>
        <ClientProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen
                name="SSOWebViewModal"
                component={SSOWebViewModal}
              />
              <Stack.Screen name="Course List" component={CourseList} />
            </Stack.Navigator>
          </NavigationContainer>
        </ClientProvider>
      </TokenProvider>
    </DomainProvider>
  );
};

registerRootComponent(App);

export default App;
