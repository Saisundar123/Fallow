import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import Videos from "./screens/Videos";
import Videoes from "./screens/Videoes";
import UserProfile from "./screens/UserProfile";
import UploadVideo from "./screens/UploadVideo";
import Profile from "./screens/Profile";
import ModelCamera from "./screens/ModelCamera";
import Account from "./screens/Account";
import Login from "./screens/Login";
import Search from "./screens/toptabs/Search";
import Draft from "./screens/toptabs/Draft";
import Mygallery from "./screens/toptabs/Mygallery";
import MyPost from "./screens/toptabs/MyPost";
import MyTabBar from "./screens/MyTabBar";
import Notifications from "./screens/Notifications";
import Music from "./screens/Music";
import Favorites from "./screens/Favorites";
import LoginWarning from "./screens/LoginWarning";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import BottomShe from "./screens/BottomShe";
import { AppLoading } from "expo";
import { useFonts } from "expo-font";
import {
  AntDesign,
  Feather,
  MaterialIcons,
  Entypo,
  FontAwesome,
  Fontisto,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Test from "./screens/Test";
import SelectList from "./screens/SelectList";

const { height, width } = Dimensions.get("window");

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();
const Drawer = createDrawerNavigator();
const Tabs = createBottomTabNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Light": require("./assets/fonts/Roboto-Light.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <StatusBar style="dark" hidden={false} />
        <MyStack />
        {/* <SelectList /> */}
        {/* <Test /> */}
      </View>
    );
  }
}

const MyBottomTabs = () => {
  return (
    <Tabs.Navigator
      lazy={false}
      tabBar={(props) => <MyTabBar {...props} />}
      tabBarOptions={{
        style: {
          height: height * 0.07,
        },
        showLabel: false,
      }}
    >
      <Tabs.Screen
        name="Home"
        component={Videos}
        options={{
          // tabBarVisible: false,
          tabBarLabel: "",
          tabBarIcon: ({ color, size, focused }) => (
            <View
              style={{
                height: width * 0.1,
                width: width * 0.1,
                backgroundColor: "rgba(52, 52, 52, 0.8)",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: width * 0.02,
              }}
            >
              <AntDesign name="home" color={color} size={size} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        component={Search}
        options={{
          tabBarLabel: "",

          tabBarIcon: ({ color, size }) => (
            <View
              style={{
                height: width * 0.1,
                width: width * 0.1,
                backgroundColor: "rgba(52, 52, 52, 0.8)",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: width * 0.02,
              }}
            >
              <Feather name="search" color={color} size={size} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="camera"
        component={ModelCamera}
        options={{
          tabBarVisible: false,
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <View
              style={{
                height: width * 0.1,
                width: width * 0.1,
                backgroundColor: "blue",
                alignItems: "center",
                justifyContent: "center",
                borderTopRightRadius: width * 0.02,
                borderTopLeftRadius: width * 0.02,
                borderBottomLeftRadius: width * 0.02,
              }}
            >
              <Entypo name="controller-play" color="#fff" size={size} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="notification"
        component={Notifications}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <View
              style={{
                height: width * 0.1,
                width: width * 0.1,
                backgroundColor: "rgba(52, 52, 52, 0.8)",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: width * 0.02,
              }}
            >
              <AntDesign name="message1" color={color} size={size} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="mytabs"
        component={MyStacks}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <View
              style={{
                height: width * 0.1,
                width: width * 0.1,
                backgroundColor: "rgba(52, 52, 52, 0.8)",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: width * 0.02,
              }}
            >
              {console.log(color)}
              <MaterialIcons name="person-outline" color={color} size={size} />
            </View>
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

const MyTabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        showIcon: true,
      }}
    >
      <Tab.Screen
        name="mygallery"
        component={Mygallery}
        options={{
          tabBarIcon: ({}) => {
            return <AntDesign name="hearto" size={width * 0.05} />;
          },
        }}
      />
      <Tab.Screen
        name="mypost"
        component={MyPost}
        options={{
          tabBarIcon: ({}) => {
            return (
              <MaterialCommunityIcons
                name="postage-stamp"
                size={width * 0.05}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="draft"
        component={Draft}
        options={{
          tabBarIcon: ({}) => {
            return <AntDesign name="hearto" size={width * 0.05} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

const MusicTabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showIcon: true,
        showLabel: false,
        indicatorStyle: {
          backgroundColor: "black",
        },
      }}
    >
      <Tab.Screen
        name="Musics"
        component={Music}
        options={{
          tabBarIcon: ({}) => {
            return <FontAwesome name="music" size={width * 0.05} />;
          },
        }}
      />
      <Tab.Screen
        name="favorites"
        component={Favorites}
        options={{
          tabBarIcon: ({}) => {
            return (
              <FontAwesome name="bookmark" size={width * 0.05} color="black" />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const MyStacks = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="mytabs"
        component={MyTabs}
        // options={{ headerShown: false }}
        options={{
          header: ({}) => (
            <View style={{ height: height * 0.43 }}>
              <Profile />
            </View>
          ),
          headerStyle: {
            height: 300,
            backgroundColor: "red",
          },
        }}
      />
    </Stack.Navigator>
  );
};

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
          name="loginwarning"
          component={LoginWarning}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="profile"
          component={MyTabs}
          // options={{ headerShown: false }}
          options={{
            header: ({ navigation }) => (
              <View style={{ height: height * 0.5 }}>
                <Profile onPress={() => navigation.navigate("videos")} />
              </View>
            ),
            headerStyle: {
              height: 300,
              backgroundColor: "red",
            },
          }}
        />
        <Stack.Screen
          name="mybottomtabs"
          component={MyBottomTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="userProfile"
          component={UserProfile}
          options={{
            // title: "",
            // headerStyle: {
            //   height: height * 0.1,
            // },
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="camera"
          component={ModelCamera}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="uploadvideo"
          component={UploadVideo}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="music"
          component={MusicTabs}
          // options={{ headerShown: false }}
          options={{
            title: "Music",
          }}
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
