import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Animated,
} from "react-native";
import { Entypo } from "@expo/vector-icons";

const { height, width } = Dimensions.get("window");

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        {/* <View
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
            placeholder="FullName"
            style={{
              height: height * 0.048,
              // backgroundColor: "red",
              width: width * 0.75,
            }}
          />
        </View> */}
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
            style={{
              height: height * 0.048,
              // backgroundColor: "red",
              width: width * 0.65,
            }}
          />
          <View
            style={{
              width: width * 0.15,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Entypo name="eye-with-line" size={width * 0.05} />
          </View>
        </View>
        <AccountButton name="Log in" onPress={() => this.signUp()} />
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

        {/* <View
          style={{
            padding: width * 0.05,
            alignSelf: "center",
            width,
          }}
        >
          <Text>
            By Signing Up you accept the{" "}
            <Text
              style={{
                fontSize: width * 0.04,
                fontWeight: "bold",
                color: "skyblue",
              }}
            >
              Terms of Services
            </Text>{" "}
            and{" "}
            <Text
              style={{
                fontSize: width * 0.04,
                fontWeight: "bold",
                color: "skyblue",
              }}
            >
              Privacy Policy
            </Text>
          </Text>
        </View> */}
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
          justifyContent: "center",
          borderRadius: width * 0.02,
          marginBottom: width * 0.03,
          borderWidth: 2,
          borderColor: "#b163e7",
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
      </TouchableOpacity>
    </View>
  );
};
