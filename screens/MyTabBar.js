import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import {
  AntDesign,
  Feather,
  MaterialIcons,
  Entypo,
  FontAwesome,
} from "@expo/vector-icons";
import { Card } from "native-base";

const { height, width } = Dimensions.get("screen");

export default class MyTabBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
    };
  }

  onPressButton = (i) => {
    switch (i) {
      case 0:
        this.props.navigation.navigate("Home");
        this.setState({ activeTab: 0 });
        break;
      case 1:
        this.props.navigation.navigate("search");
        this.setState({ activeTab: 1 });
        break;
      case 2:
        this.props.navigation.navigate("camera");
        this.setState({ activeTab: 2 });
        break;
      case 3:
        this.props.navigation.navigate("notification");
        this.setState({ activeTab: 3 });
        break;
      case 4:
        this.props.navigation.navigate("mytabs");
        this.setState({ activeTab: 4 });
        break;
    }
  };
  render() {
    const focusedOptions = this.props.descriptors[
      this.props.state.routes[this.props.state.index].key
    ].options;
    if (focusedOptions.tabBarVisible == false) {
      return null;
    }

    return (
      <Card
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          height: height * 0.07,
          alignItems: "center",
          marginBottom: 0,
          marginLeft: 0,
          marginRight: 0,
          marginTop: 0,
          // backgroundColor: "transparent",
          // elevation: 5,
        }}
      >
        {this.props.state.routes.map((item, i) => {
          return (
            <View>
              {i == 2 ? (
                <TouchableOpacity
                  style={{
                    height: width * 0.1,
                    width: width * 0.1,
                    backgroundColor: "rgb(0, 122, 255)",
                    alignItems: "center",
                    justifyContent: "center",
                    borderTopRightRadius: width * 0.02,
                    borderTopLeftRadius: width * 0.02,
                    borderBottomLeftRadius: width * 0.02,
                    bottom: width * 0.06,
                  }}
                  onPress={() => this.onPressButton(i)}
                >
                  <FontAwesome
                    name="video-camera"
                    color="#fff"
                    size={width * 0.05}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => this.onPressButton(i)}
                  style={{
                    height: width * 0.1,
                    width: width * 0.1,
                    backgroundColor:
                      this.state.activeTab == i
                        ? "rgba(52, 52, 52, 0.8)"
                        : null,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: width * 0.02,
                  }}
                >
                  {i == 0 ? (
                    <AntDesign
                      name="home"
                      color={this.state.activeTab == i ? "#fff" : "grey"}
                      size={width * 0.05}
                    />
                  ) : i == 1 ? (
                    <Feather
                      name="search"
                      color={this.state.activeTab == i ? "#fff" : "grey"}
                      size={width * 0.05}
                    />
                  ) : i == 3 ? (
                    <AntDesign
                      name="message1"
                      color={this.state.activeTab == i ? "#fff" : "grey"}
                      size={width * 0.05}
                    />
                  ) : i == 4 ? (
                    <MaterialIcons
                      name="person-outline"
                      color={this.state.activeTab == i ? "#fff" : "grey"}
                      size={width * 0.05}
                    />
                  ) : null}
                </TouchableOpacity>
              )}
            </View>
          );
        })}
      </Card>
    );
  }
}
