import React, { Component } from "react";
import { View, Text, Dimensions, Image } from "react-native";

const { height, width } = Dimensions.get("window");

class LoginWarning extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#1f0d25" }}>
        <View>
          <Image
            source={require("../assets/logo.png")}
            style={{ height: width * 0.2, width: width * 0.2 }}
            resizeMode="contain"
          />
        </View>
        <View>
          <Text style={{ color: "#fff", fontSize: width * 0.042 }}>
            You Need To Logoin First
          </Text>
        </View>
        <View>
          <Text style={{ color: "#fff", fontSize: width * 0.042 }}>
            Login To Watch More Videos
          </Text>
        </View>
      </View>
    );
  }
}

export default LoginWarning;
