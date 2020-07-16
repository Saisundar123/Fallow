import React, { Component } from "react";
import { View, Text } from "react-native";

class Mygallery extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Mygallery</Text>
      </View>
    );
  }
}

export default Mygallery;
