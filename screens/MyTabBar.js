import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  AsyncStorage,
  Image,
} from "react-native";
import {
  AntDesign,
  Feather,
  MaterialIcons,
  Entypo,
  FontAwesome,
} from "@expo/vector-icons";
import { Card } from "native-base";
import Dialog, { DialogContent } from "react-native-popup-dialog";
import RBSheet from "react-native-raw-bottom-sheet";
// import {} from '@expo-google-fonts/roboto';

const { height, width } = Dimensions.get("screen");

export default class MyTabBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      login: "",
      visible: false,
    };
  }

  async componentDidMount() {
    try {
      const value = await AsyncStorage.getItem("userdata");

      if (value !== null) {
        this.setState({ login: true });
      } else {
        this.setState({ login: false });
      }
    } catch (error) {
      console.log(err, "err");
    }
  }

  onPressButton = (i) => {
    switch (i) {
      case 0:
        this.props.navigation.navigate("Home");
        this.setState({ activeTab: 0 });
        break;
      case 1:
        this.props.navigation.navigate("search", { search: true });
        this.setState({ activeTab: 1 });
        break;
      case 2:
        if (this.state.login) {
          this.props.navigation.navigate("camera");
          this.setState({ activeTab: 2 });
        } else {
          // this.setState({ visible: true });
          // this.props.navigation.navigate("loginwarning");
          this.rbRef.open();
        }
        break;
      case 3:
        if (this.state.login) {
          this.props.navigation.navigate("notification");
          this.setState({ activeTab: 3 });
        } else {
          // this.setState({ visible: true });
          this.rbRef.open();
          // this.props.navigation.navigate("loginwarning");
        }
        break;
      case 4:
        if (this.state.login) {
          this.props.navigation.navigate("mytabs");
          this.setState({ activeTab: 4 });
        } else {
          // this.props.navigation.navigate("loginwarning");
          this.rbRef.open();
          // this.setState({ visible: true });
        }
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

        <RBSheet
          ref={(ref) => (this.rbRef = ref)}
          height={height * 0.96}
          customStyles={{
            container: {
              borderTopRightRadius: width * 0.03,
              borderTopLeftRadius: width * 0.03,
            },
          }}
        >
          <SheetContent
            onPress={() => this.rbRef.close()}
            onPressLog={() => this.props.navigation.navigate("account")}
          />
        </RBSheet>
      </Card>
    );
  }
}

const SheetContent = (props) => {
  return (
    <View style={{ flex: 1, backgroundColor: "#1f0d25" }}>
      <TouchableOpacity
        style={{
          alignSelf: "flex-end",
          paddingRight: width * 0.05,
          paddingTop: width * 0.05,
        }}
        onPress={() => props.onPress()}
      >
        <AntDesign name="close" size={width * 0.08} color="#fff" />
      </TouchableOpacity>
      <View style={{ paddingTop: width * 0.1, alignItems: "center" }}>
        <Image
          source={require("../assets/logo.png")}
          style={{
            height: width * 0.2,
            width: width * 0.2,
            borderRadius: width * 0.05,
            // marginRight: 6,
          }}
          resizeMode="contain"
        />
      </View>
      <View style={{ alignItems: "center", paddingTop: width * 0.03 }}>
        <View style={{ paddingBottom: width * 0.18 }}>
          <Text style={{ color: "#fff", fontSize: width * 0.05 }}>Fallow</Text>
        </View>
        <View style={{ paddingBottom: width * 0.04 }}>
          <Text style={{ color: "#fff", fontSize: width * 0.05 }}>
            You Need To Login First
          </Text>
        </View>
        <View style={{ paddingBottom: width * 0.15 }}>
          <Text style={{ color: "#fff", fontSize: width * 0.045 }}>
            Login To Watch More Videos
          </Text>
        </View>
        <View style={{ paddingTop: width * 0.15 }}>
          <TouchableOpacity
            style={{
              height: height * 0.05,
              width: width * 0.9,
              borderRadius: width * 0.02,
              backgroundColor: "red",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => props.onPressLog()}
          >
            <Text style={{ color: "#fff" }}>Go To Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
