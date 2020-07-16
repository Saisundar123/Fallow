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
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import Login from "./Login";
import axios from "axios";
import { url } from "./Main";

const { height, width } = Dimensions.get("window");

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animation: new Animated.Value(0),
      signUp: false,
      login: false,
      fullname: "",
      email: "",
      Password: "",
      error: false,
      processing: false,
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

  onChangeText = (field, text) => {
    if (field == "fullname") {
      this.setState({
        fullname: text,
      });
      // console.log(this.state.userData.fullname, "full");
    } else if (field == "email") {
      this.setState({
        email: text,
      });
    } else if (field == "password") {
      this.setState({
        password: text,
      });
    }
  };

  animationFun = () => {
    Animated.timing(this.state.animation, {
      toValue: 1,
      duration: 500,
      // easing: Easing.bounce,
    }).start();
  };

  signupValidate = () => {
    const { fullname, email, password } = this.state;
    if (fullname !== "" && email !== "" && password !== "") {
      const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (reg.test(email) === true) {
        // console.log(fullname, email, password, "jjjjjjji");
        if (password.length >= 8) {
          this.onPressSign(fullname, email, password);
        } else {
          this.setState({ error: "password" });
        }
      } else {
        this.setState({ error: "email" });
      }
    } else {
      alert("Please Fill All Fields");
    }
  };

  onPressSign = (fullname, email, password) => {
    this.setState({ processing: true });
    axios
      .post(
        `${url}api/createUser`,
        {
          name: fullname,
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.data.status == 200) {
          ToastAndroid.showWithGravity(
            "User Created",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
          this.setState({
            processing: false,
            email: "",
            password: "",
            fullname: "",
            login: true,
            signUp: false,
          });

          console.log(res.data);
        }
      })
      .catch((err) => console.log(err, "err"));
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
            source={require("../assets/logo.png")}
            style={{ height: width * 0.2, width: width * 0.2, bottom }}
          />
        </Animated.View>
        {this.state.signUp ? (
          <SignupFields
            goLogin={() => this.setState({ signUp: false, login: true })}
            onPress={() => this.setState({ signUp: false, login: true })}
            onChangeText={this.onChangeText}
            onPressSign={this.signupValidate}
            error={this.state.error}
            processing={this.state.processing}
          />
        ) : this.state.login ? (
          <Login
            goSignup={() => this.setState({ signUp: true, login: false })}
            onLogin={() => this.props.navigation.navigate("mybottomtabs")}
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
                onPress={() => this.props.navigation.navigate("mybottomtabs")}
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
          // value={props.fullname}
          onChangeText={(text) => props.onChangeText("fullname", text)}
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
          borderWidth: props.error == "email" ? 1 : null,
          borderColor: "red",
        }}
      >
        <TextInput
          placeholder="E-mail"
          style={{
            height: height * 0.048,
            // backgroundColor: "red",
            width: width * 0.75,
          }}
          // value={props.email}
          onChangeText={(text) => props.onChangeText("email", text)}
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
          borderWidth: props.error == "password" ? 1 : null,
          borderColor: "red",
        }}
      >
        <TextInput
          placeholder="Password"
          style={{
            height: height * 0.048,
            // backgroundColor: "red",
            width: width * 0.65,
          }}
          // value={props.password}
          onChangeText={(text) => props.onChangeText("password", text)}
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
      <AccountButton
        name="Sign Up"
        onPress={() => props.onPressSign()}
        activity={props.processing ? true : false}
      />
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
