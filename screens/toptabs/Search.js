import React, { Component } from "react";
import { View, Text, Dimensions, TextInput } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
const { height, width } = Dimensions.get("window");

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 0.23,
            backgroundColor: "#5579f1",
            paddingLeft: width * 0.08,
          }}
        >
          <View
            style={{ paddingBottom: width * 0.06, paddingTop: width * 0.04 }}
          >
            <Text style={{ color: "#fff", fontSize: width * 0.1 }}>
              Discover
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              height: height * 0.06,
              width: width * 0.8,
              borderRadius: width * 0.06,
              backgroundColor: "#fff",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                width: width * 0.1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <EvilIcons name="search" size={width * 0.05} />
            </View>
            <View style={{ width: width * 0.7 }}>
              <TextInput placeholder="Search" />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default Search;
