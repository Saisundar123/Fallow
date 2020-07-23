import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Image,
  CheckBox,
  Linking,
  TouchableHighlight,
  Share,
  ActivityIndicator,
  Animated,
} from "react-native";
import {
  AntDesign,
  Entypo,
  FontAwesome,
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

const { height, width } = Dimensions.get("screen");

class VideoTop extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    // console.log(this.props.items, "kklklk");
    return (
      <View
        style={{
          position: "absolute",
          paddingRight: width * 0.04,
          paddingLeft: width * 0.04,

          width,
          height: height * 0.88,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <View
          style={{
            justifyContent: "space-between",
            paddingBottom: width * 0.1,
            // backgroundColor: "red",
            width: width * 0.63,
            height: height * 0.88,
            paddingTop: width * 0.1,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignSelf: "flex-end",
            }}
          >
            <TouchableOpacity
              style={{ paddingRight: width * 0.03 }}
              onPress={() =>
                this.props.navigation.navigate("camera", {
                  live: true,
                })
              }
            >
              <Text
                style={{
                  fontSize: width * 0.035,
                  fontWeight: "bold",
                  color: "#fff",
                  // opacity: 0.7,
                }}
              >
                Live
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text
                style={{
                  fontSize: width * 0.035,
                  fontWeight: "bold",
                  color: "#fff",
                  // opacity: 1,
                }}
              >
                For You
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  paddingBottom: width * 0.02,
                }}
                onPress={() =>
                  this.props.navigation.navigate("userProfile", {
                    userid: this.props.items.userId,
                  })
                }
              >
                <Text
                  style={{
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: width * 0.05,
                  }}
                >
                  {this.props.items.fullname}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  borderWidth: 1,
                  borderRadius: width * 0.04,
                  borderColor: "#fff",
                  height: height * 0.035,
                  width: width * 0.17,
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingRight: width * 0.013,
                  paddingLeft: width * 0.01,
                  marginLeft: width * 0.02,
                }}
              >
                <View>
                  <MaterialIcons name="add" size={width * 0.04} color="#fff" />
                </View>
                <View>
                  <Text
                    style={{
                      color: "#fff",
                      fontWeight: "bold",
                      fontSize: width * 0.03,
                    }}
                  >
                    Fallow
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View>
              <Text style={{ color: "#fff" }}>{this.props.items.caption}</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            // backgroundColor: "red",
            marginBottom: width * 0.1,
            alignItems: "flex-end",
          }}
        >
          <View
            style={{
              paddingBottom: width * 0.02,
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => this.props.perform("like")}
              style={{
                height: width * 0.12,
                width: width * 0.12,
                backgroundColor: "rgba(52, 52, 52, 0.8)",
                borderRadius: width * 0.02,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MaterialCommunityIcons
                name="hand-okay"
                size={width * 0.08}
                color={this.props.items.liked ? "red" : "#fff"}
              />
            </TouchableOpacity>
            <View>
              <Text
                style={{
                  color: "#fff",
                  fontSize: width * 0.035,
                  fontWeight: "bold",
                }}
              >
                {this.props.items.likes}
              </Text>
            </View>
          </View>
          <View
            style={{
              paddingBottom: width * 0.02,
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => this.perform("comment")}
              style={{
                height: width * 0.12,
                width: width * 0.12,
                backgroundColor: "rgba(52, 52, 52, 0.8)",
                borderRadius: width * 0.02,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Entypo name="message" size={width * 0.07} color="#fff" />
            </TouchableOpacity>
            <View>
              <Text style={{ color: "#fff", fontSize: width * 0.035 }}>
                {this.props.items.comments.length}
              </Text>
            </View>
          </View>

          <View
            style={{
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => this.perform("download")}
              style={{
                height: width * 0.12,
                width: width * 0.12,
                backgroundColor: "rgba(52, 52, 52, 0.8)",
                borderRadius: width * 0.02,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {this.state.downloading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Feather name="download" size={width * 0.07} color="#fff" />
              )}
            </TouchableOpacity>
            <View>
              <Text style={{ color: "#fff", fontSize: width * 0.035 }}>
                {this.props.items.downloads}
              </Text>
            </View>
          </View>

          <View
            style={{
              paddingBottom: width * 0.1,
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => this.perform("share")}
              style={{
                height: width * 0.12,
                width: width * 0.12,
                backgroundColor: "rgba(52, 52, 52, 0.8)",
                borderRadius: width * 0.02,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MaterialCommunityIcons
                name="share"
                size={width * 0.07}
                color="#fff"
              />
            </TouchableOpacity>
            <View>
              <Text style={{ color: "#fff", fontSize: width * 0.035 }}>
                {this.props.items.whatsapp}
              </Text>
            </View>
          </View>

          <View style={{ paddingBottom: width * 0.02 }}>
            <Animated.Image
              resizeMode="contain"
              source={{
                uri:
                  "https://www.flaticon.com/premium-icon/icons/svg/3083/3083400.svg",
              }}
              style={{
                height: width * 0.15,
                width: width * 0.15,
                transform: [{ rotateZ: this.props.cdRotating }],
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default VideoTop;
