import React, { Component, PureComponent } from "react";
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
  TextInput,
  AsyncStorage,
  Pressable,
} from "react-native";
import axios from "axios";
import * as Sharing from "expo-sharing";
import { Audio, Video } from "expo-av";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import * as Permissions from "expo-permissions";
import VideoComments from "../screens/VideoComments";
import {
  AntDesign,
  Entypo,
  FontAwesome,
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
// import BottomSheet from "react-native-js-bottom-sheet";
import RBSheet from "react-native-raw-bottom-sheet";
import { url } from "./Main";
import VideoTop from "./VideoTop";
import VideoPlayer from "expo-video-player";

const { height, width } = Dimensions.get("screen");

class RenderItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View
        style={{
          width,
          backgroundColor: "black",
        }}
      >
        <View
          style={{
            height: height * 0.885,
            width,
          }}
        >
          <Animated.View style={{ height: this.props.videoHeight, width }}>
            {/* <VideoPlayer
                  ref={(ref) => (this.videoRef = ref)}
                  videoProps={{
                    shouldPlay: index === this.state.value ? true : false,
                    resizeMode: Video.RESIZE_MODE_CONTAIN,
                    // height: videoHeight,
                    source: {
                      uri: videoSource,
                    },
                  }}
                /> */}

            <Video
              resizeMode="contain"
              source={{ uri: this.props.source }}
              ref={(ref) => (this.videoRef = ref)}
              style={{ flex: 1 }}
              // onLoad={() => console.log("startedn")}
              shouldPlay={this.props.shouldPlay}
            />
            {/* {this.state.value == index ? (
                    <View
                      style={{
                        position: "absolute",
                        alignSelf: "center",
                        height: height * 0.45,
                        justifyContent: "flex-end",
                      }}
                    >
                      <ActivityIndicator
                        size="large"
                        color="red"
                        animating={true}
                      />
                    </View>
                  ) : null} */}
          </Animated.View>
          <VideoComments
            commentHeight={this.props.commentHeight}
            onBackPress={this.props.onBackPress}
            comments={this.props.comments}
            commentValue={this.props.commentValue}
            onChangeText={(text) => {
              //   console.log(text, "text");
              this.props.onchangeText(text);
            }}
            onSend={() => this.props.onSend()}
          />
        </View>
        {this.props.commentSlide ? null : (
          // <VideoTop
          //   items={item}
          //   cdRotating={cdRotating}
          //   perform={(action) => this.perform(action, index, item)}
          //   {...this.props}
          // />
          <View
            style={{
              position: "absolute",
              paddingRight: width * 0.04,
              paddingLeft: width * 0.04,
              // backgroundColor: "red",
              width,
              height: height * 0.8,
              marginTop: width * 0.1,
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
                height: height * 0.8,
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
                      // fontWeight: "bold",
                      fontFamily: "Roboto-Bold",
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
                      fontFamily: "Roboto-Bold",
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
                        userid: this.props.item.userid,
                      })
                    }
                  >
                    <Text
                      style={{
                        color: "#fff",
                        fontFamily: "Roboto-Bold",
                        fontSize: width * 0.05,
                      }}
                    >
                      {this.props.item.fullname}
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
                    onPress={() => this.props.onFallow()}
                  >
                    <View>
                      <MaterialIcons
                        name="add"
                        size={width * 0.04}
                        color="#fff"
                      />
                    </View>
                    <View>
                      <Text
                        style={{
                          color: "#fff",
                          fontFamily: "Roboto-Bold",
                          fontSize: width * 0.03,
                        }}
                      >
                        Fallow
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View>
                  <Text
                    style={{
                      color: "#fff",
                      fontFamily: "Roboto-Regular",
                    }}
                  >
                    {this.props.item.caption}
                  </Text>
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
                  onPress={() =>
                    this.props.perform(
                      "like",
                      this.props.index,
                      this.props.item
                    )
                  }
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
                    color={this.props.item.liked ? "red" : "#fff"}
                    // color={
                    //   this.state.userData.likedVideos.includes(item._id)
                    //     ? "red"
                    //     : "#fff"
                    // }
                  />
                </TouchableOpacity>
                <View>
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: width * 0.035,
                      fontFamily: "Roboto-Bold",
                    }}
                  >
                    {this.props.item.likes}
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
                  onPress={() =>
                    this.props.perform("comment", this.props.index, null)
                  }
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
                    {this.props.item.comments.length}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    this.props.perform(
                      "download",
                      this.props.index,
                      this.props.item
                    )
                  }
                  style={{
                    height: width * 0.12,
                    width: width * 0.12,
                    backgroundColor: "rgba(52, 52, 52, 0.8)",
                    borderRadius: width * 0.02,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {this.props.downloading ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Feather name="download" size={width * 0.07} color="#fff" />
                  )}
                </TouchableOpacity>
                <View>
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: width * 0.035,
                      fontFamily: "Roboto-Bold",
                    }}
                  >
                    {this.props.item.downloads}
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
                  onPress={() =>
                    this.props.perform(
                      "share",
                      this.props.index,
                      this.props.item
                    )
                  }
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
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: width * 0.035,
                      fontFamily: "Roboto-Bold",
                    }}
                  >
                    {this.props.item.whatsapp}
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
        )}
      </View>
    );
  }
}

export default RenderItem;
