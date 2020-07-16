import React, { Component } from "react";
import { View, Text } from "react-native";

class MyPost extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>MyPOst</Text>
      </View>
    );
  }
}

export default MyPost;
