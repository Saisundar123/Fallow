import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import Videos from "./screens/Videos";
import Videoes from "./screens/Videoes";
import UserProfile from "./screens/UserProfile";
import Profile from "./screens/Profile";
import ModelCamera from "./screens/ModelCamera";
import Account from "./screens/Account";
import Login from "./screens/Login";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

const { height, width } = Dimensions.get("window");

const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <MyStack />
      {/* <Videoes /> */}
    </View>
  );
}

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="account"
          component={Account}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="videos"
          component={Videos}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="userProfile"
          component={UserProfile}
          options={{
            title: "",
            headerStyle: {
              height: height * 0.1,
            },
          }}
        />
        <Stack.Screen name="profile" component={Profile} />
        <Stack.Screen
          name="camera"
          component={ModelCamera}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
