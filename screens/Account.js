import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Animated,
  Easing,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import Login from "./Login";

const { height, width } = Dimensions.get("window");

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animation: new Animated.Value(0),
      signUp: false,
      login: false,
    };
  }

  signUp = () => {
    this.animationFun();
    this.setState({ signUp: true });
  };

  logIn = () => {
    this.setState({ login: true });
    this.animationFun();
  };

  animationFun = () => {
    Animated.timing(this.state.animation, {
      toValue: 1,
      duration: 500,
      // easing: Easing.bounce,
    }).start();
  };
  render() {
    const bottom = this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, width * 0.1],
    });
    const flex = this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0.4, 0.3],
    });

    return (
      <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
        <Animated.View
          style={{
            flex,
            alignItems: "center",
            justifyContent: "flex-end",
            // backgroundColor: "red",
          }}
        >
          <Animated.Image
            source={require("../assets/appLogo.png")}
            style={{ height: width * 0.2, width: width * 0.2, bottom }}
          />
        </Animated.View>
        {this.state.signUp ? (
          <SignupFields
            goLogin={() => this.setState({ signUp: false, login: true })}
            onPress={() => this.setState({ signUp: false, login: true })}
          />
        ) : this.state.login ? (
          <Login
            goSignup={() => this.setState({ signUp: true, login: false })}
            onLogin={() => this.props.navigation.navigate("videos")}
          />
        ) : (
          <View style={{ flex: 0.5 }}>
            <View style={{ flex: 0.6, alignItems: "center" }}>
              <Text style={{ fontSize: width * 0.08, fontWeight: "bold" }}>
                FALLOW
              </Text>
            </View>

            <View style={{ flex: 1, alignItems: "center" }}>
              <Text style={{ fontSize: width * 0.04, fontWeight: "bold" }}>
                Discover Unlimited Entertainment
              </Text>
            </View>

            <View sty={{ flex: 1 }}>
              <AccountButton name="Sign Up" onPress={() => this.signUp()} />

              <AccountButton name="Log IN " onPress={() => this.logIn()} />
            </View>

            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("videos")}
              >
                <Text
                  style={{
                    fontSize: width * 0.04,
                    fontWeight: "bold",
                    color: "#b163e7",
                  }}
                >
                  Skip for Now{" "}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  }
}

export default Account;

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

const SignupFields = (props) => {
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
          placeholder="FullName"
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
      <AccountButton name="Sign Up" onPress={() => props.onPress()} />
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
            <Text style={{ fontSize: width * 0.04 }}>Sign Up With Google</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View
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
      </View>
      <View style={{ alignSelf: "center", flexDirection: "row" }}>
        <View>
          <Text>Already have a acoount ?</Text>
        </View>
        <TouchableOpacity
          style={{ paddingLeft: width * 0.02 }}
          onPress={() => props.goLogin()}
        >
          <Text
            style={{
              fontSize: width * 0.04,
              fontWeight: "bold",
              color: "skyblue",
            }}
          >
            Log in
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
