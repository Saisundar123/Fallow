import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Animated,
  AsyncStorage,
  ActivityIndicator,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import axios from "axios";
import { url } from "./Main";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";

const { height, width } = Dimensions.get("window");

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      passwordVisible: true,
      activity: false,
      expoPushToken: "",
      notification: {},
      errorMsg: "",
    };
  }

  componentDidMount() {
    this.registerForPushNotificationsAsync();
  }

  registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = await Notifications.getExpoPushTokenAsync();
      // console.log(token, "token");
      this.setState({ expoPushToken: token });
    } else {
      alert("Must use physical device for Push Notifications");
    }
  };

  validateLogin = () => {
    const { email, password } = this.state;
    // console.log(email, password, "kkkk");
    if (email.length > 0 && password.length > 0) {
      // console.log("get");
      this.onPressLogin(email, password);
    } else {
      alert("Plaese Fill All Fields");
    }
  };

  onPressLogin = (email, password) => {
    // console.log(this.state.expoPushToken, "push");
    // console.log(email, password, "oooooo");
    this.setState({ activity: true });
    axios
      .post(
        `${url}api/findUser`,
        {
          email: email,
          password: password,
          expotoken: this.state.expoPushToken,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(async (res) => {
        if (res.data.status == 200) {
          await this._storeData(res.data);
          this.setState({
            email: "",
            password: "",
            activity: false,
          });
          this.props.onLogin();

          // console.log(res.data.userData.fullname);
        } else if (res.data.status == 400) {
          this.setState({ errorMsg: res.data.msg, activity: false });
          console.log(res.data);
        }
      })
      .catch((err) => console.log(err, "err"));
  };

  _storeData = async (data) => {
    // console.log(data, "data");
    try {
      await AsyncStorage.setItem("userdata", JSON.stringify(data));
    } catch (error) {
      console.log(error, "err");
    }
    // try {
    //   await AsyncStorage.setItem("username", data.userData.fullname);
    // } catch (error) {
    //   console.log(error, "err");
    // }
  };

  eyePress = () => {
    this.setState({ passwordVisible: false });
    setTimeout(() => {
      this.setState({ passwordVisible: true });
    }, 300);
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            height: height * 0.05,
            width: width * 0.8,
            backgroundColor: "#f1f5fb",
            alignSelf: "center",
            paddingLeft: width * 0.02,
            marginBottom: width * 0.03,
          }}
        >
          <TextInput
            placeholder="E-mail"
            style={{
              height: height * 0.048,
              // backgroundColor: "red",
              width: width * 0.75,
            }}
            onChangeText={(text) => this.setState({ email: text })}
          />
        </View>
        <View
          style={{
            height: height * 0.05,
            width: width * 0.8,
            backgroundColor: "#f1f5fb",
            alignSelf: "center",
            paddingLeft: width * 0.02,
            marginBottom: width * 0.03,
            flexDirection: "row",
          }}
        >
          <TextInput
            placeholder="Password"
            secureTextEntry={this.state.passwordVisible}
            style={{
              height: height * 0.048,
              // backgroundColor: "red",
              width: width * 0.65,
            }}
            onChangeText={(text) => this.setState({ password: text })}
          />
          <TouchableOpacity
            style={{
              width: width * 0.15,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => this.eyePress()}
          >
            <Entypo name="eye-with-line" size={width * 0.05} />
          </TouchableOpacity>
        </View>
        <AccountButton
          name="Log in"
          activity={this.state.activity}
          // onPress={() => this.props.onLogin()}
          onPress={() => this.validateLogin()}
        />
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              color: "red",
              fontSize: width * 0.04,
              fontFamily: "Roboto-Regular",
            }}
          >
            {this.state.errorMsg}
          </Text>
        </View>
        <View
          style={{
            alignItems: "center",
            paddingTop: width * 0.04,
            paddingBottom: width * 0.03,
          }}
        >
          <Text>-------------- or ---------------</Text>
        </View>
        <View style={{ paddingTop: width * 0.03, paddingBottom: width * 0.03 }}>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              borderWidth: 1,
              borderColor: "grey",
              height: height * 0.05,
              width: width * 0.85,
              alignSelf: "center",
            }}
          >
            <View
              style={{
                borderRightWidth: 1,
                width: width * 0.12,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={require("../assets/google.jpg")}
                style={{ height: width * 0.07, width: width * 0.07 }}
              />
            </View>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: width * 0.68,
              }}
            >
              <Text style={{ fontSize: width * 0.04 }}>
                Sign Up With Google
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ alignSelf: "center", flexDirection: "row" }}>
          <View>
            <Text>Already have a acoount ?</Text>
          </View>
          <TouchableOpacity
            style={{ paddingLeft: width * 0.02 }}
            onPress={() => this.props.goSignup()}
          >
            <Text
              style={{
                fontSize: width * 0.04,
                fontWeight: "bold",
                color: "skyblue",
              }}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Login;

// const AccountButton = (props) => {
//   return (
//     <View>
//       <TouchableOpacity
//         style={{
//           height: height * 0.06,
//           width: width * 0.85,
//           backgroundColor: "#b163e7",
//           alignSelf: "center",
//           alignItems: "center",
//           justifyContent: "center",
//           borderRadius: width * 0.02,
//           marginBottom: width * 0.03,
//           borderWidth: 2,
//           borderColor: "#b163e7",
//         }}
//         onPress={() => props.onPress()}
//       >
//         <Text
//           style={{
//             fontWeight: "bold",
//             fontSize: width * 0.04,
//             color: "#ffffff",
//           }}
//         >
//           {props.name}
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

const AccountButton = (props) => {
  return (
    <View>
      <TouchableOpacity
        style={{
          height: height * 0.06,
          width: width * 0.85,
          backgroundColor: "#b163e7",
          alignSelf: "center",
          alignItems: "center",
          justifyContent: "space-between",
          paddingLeft: width * 0.35,
          paddingRight: width * 0.04,
          borderRadius: width * 0.02,
          marginBottom: width * 0.03,
          borderWidth: 2,
          borderColor: "#b163e7",
          flexDirection: "row",
        }}
        onPress={() => props.onPress()}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: width * 0.04,
            color: "#ffffff",
          }}
        >
          {props.name}
        </Text>
        <View style={{}}>
          {props.activity ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : null}
        </View>
      </TouchableOpacity>
    </View>
  );
};
