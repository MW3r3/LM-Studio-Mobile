import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import screens
import Chat from "./screens/chat";
import Config from "./screens/configuration";
import Setup from "./screens/setup";
import Loader from "./screens/loader";

// create stack navigator
const Stack = createNativeStackNavigator();

export default function App() {
  // return navigation container with stack navigator
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Loader" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Loader" component={Loader} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="Config" component={Config} />
        <Stack.Screen name="Setup" component={Setup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}