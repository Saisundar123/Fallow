import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Modal,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { Audio, Video } from "expo-av";
import {
  Entypo,
  AntDesign,
  FontAwesome,
  Feather,
  Fontisto,
} from "@expo/vector-icons";
import { Card } from "native-base";
import { url } from "./Main";
import axios from "axios";

const { height, width } = Dimensions.get("window");

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reportVisible: false,
      userid: this.props.route.params.userid,
      data: false,
      userdata: {},
    };
  }

  componentDidMount() {
    axios
      .post(
        `${url}api/video/userprofile`,
        {
          userid: this.state.userid,
        },

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(async (res) => {
        if (res.data.status == 200) {
          this.setState({ userdata: res.data.data, data: true });
          // console.log(this.state.userdata, "jjjj");
        }
      })
      .catch((err) => console.log(err, "err"));
  }
  render() {
    // console.log(this.state.userdata.userData.fullname, "kkk");
    return (
      <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
        {this.state.data ? (
          <View>
            <ImageBackground
              source={{
                uri:
                  "https://media.gettyimages.com/photos/mata-atlantica-atlantic-forest-in-brazil-picture-id935746242?s=2048x2048",
              }}
              style={{ height: height * 0.3, paddingTop: width * 0.04 }}
            >
              <View style={{ alignItems: "center", flexDirection: "row" }}>
                <TouchableOpacity
                  style={{
                    paddingRight: width * 0.05,
                    paddingLeft: width * 0.02,
                  }}
                  onPress={() => this.props.navigation.navigate("mybottomtabs")}
                >
                  <AntDesign
                    name="arrowleft"
                    size={width * 0.07}
                    color="#fff"
                  />
                </TouchableOpacity>
                <View style={{ width: width * 0.75, alignItems: "center" }}>
                  <Text style={{ color: "#fff", fontSize: width * 0.05 }}>
                    {this.state.userdata.userData.fullname}
                  </Text>
                </View>
              </View>
              <View style={{ alignItems: "center" }}>
                <Text style={{ color: "#fff", fontSize: width * 0.04 }}>
                  Caption
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  paddingTop: width * 0.24,
                  justifyContent: "space-around",
                }}
              >
                <View
                  style={{
                    paddingLeft: width * 0.01,
                    paddingRight: width * 0.01,
                  }}
                >
                  <View style={{ alignItems: "center" }}>
                    <Text style={{ color: "#fff", fontSize: width * 0.04 }}>
                      {this.state.userdata.userData.followers}
                    </Text>
                  </View>
                  <View>
                    <Text style={{ color: "#fff", fontSize: width * 0.04 }}>
                      Followers
                    </Text>
                  </View>
                </View>
                <View>
                  <Image
                    source={{
                      uri:
                        "https://image.shutterstock.com/image-photo/closeup-nature-view-green-leaf-600w-1722021196.jpg",
                    }}
                    style={{
                      height: width * 0.3,
                      width: width * 0.3,
                      borderRadius: width * 0.5,
                    }}
                  />
                </View>

                <View
                  style={{
                    paddingLeft: width * 0.01,
                    paddingRight: width * 0.01,
                  }}
                >
                  <View style={{ alignItems: "center" }}>
                    <Text style={{ color: "#fff", fontSize: width * 0.04 }}>
                      {this.state.userdata.userData.following}
                    </Text>
                  </View>
                  <View>
                    <Text style={{ color: "#fff", fontSize: width * 0.04 }}>
                      Following
                    </Text>
                  </View>
                </View>
              </View>
            </ImageBackground>
            <View style={{ paddingLeft: width * 0.06 }}>
              <View
                style={{
                  paddingLeft: width * 0.01,
                  paddingRight: width * 0.01,
                }}
              >
                <View style={{ paddingLeft: width * 0.04 }}>
                  <Text style={{ fontSize: width * 0.04 }}>921</Text>
                </View>
                <View>
                  <Text style={{ fontSize: width * 0.04 }}>Posts</Text>
                </View>
              </View>
              <View
                style={{
                  alignItems: "center",
                  top: -height * 0.01,
                  right: width * 0.02,
                }}
              >
                <TouchableOpacity
                  style={{
                    height: height * 0.04,
                    width: width * 0.25,
                    borderRadius: width * 0.04,
                    backgroundColor: "green",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ color: "#fff", fontSize: width * 0.04 }}>
                    Fallow
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{
                flex: 1,
                borderTopWidth: 1,
                backgroundColor: "red",
                // height: height * 0.4,
              }}
            >
              <RecentPosts postData={this.state.userdata.userPosts} />
            </View>
          </View>
        ) : (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <ActivityIndicator size="large" />
          </View>
        )}
      </View>
    );
  }
}

export default UserProfile;

const SpecialTags = (props) => {
  return (
    <View style={{ alignItems: "center", flex: 1, alignItems: "center" }}>
      <Text style={{ fontWeight: "bold", color: "grey" }}>{props.number}</Text>
      <View>
        <Text>{props.name}</Text>
      </View>
    </View>
  );
};

const RecentPost = (props) => {
  return (
    <View style={{ flex: 1 }}>
      {props.postData.map((item, i) => {
        return (
          <View
            style={{
              borderBottomWidth: 4,
              borderBottomColor: "#eeee73",
              // marginBottom: 100,
              paddingBottom: width * 0.02,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                flex: 0.2,
                padding: width * 0.02,
                alignItems: "center",
              }}
            >
              <View style={{ paddingLeft: width * 0.03 }}>
                <Image
                  source={{
                    uri: item.img,
                  }}
                  style={{
                    height: width * 0.13,
                    width: width * 0.13,
                    borderRadius: width * 0.2,
                  }}
                />
              </View>
              <View style={{ paddingLeft: width * 0.05 }}>
                <View>
                  <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
                </View>
                <View style={{ paddingTop: width * 0.02 }}>
                  <Text style={{ fontSize: width * 0.03, color: "grey" }}>
                    {item.caption}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ padding: width * 0.03 }}>
              <Text>{item.description}</Text>
            </View>
            <View>
              <Video
                resizeMode="contain"
                source={item.videoUrl}
                // ref={(ref) => (handleVideoRef = ref)}
                style={{ height: height * 0.45, width }}
                shouldPlay={false}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                paddingTop: width * 0.02,
                justifyContent: "space-between",
                paddingLeft: width * 0.03,
                paddingRight: width * 0.03,
              }}
            >
              <View>
                <Text style={{ fontSize: width * 0.03 }}>
                  {item.views} Views
                </Text>
              </View>
              <View>
                <Text style={{ fontSize: width * 0.03 }}>
                  {item.postedOn} hours ago
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                paddingTop: width * 0.04,
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <AntDesign name="hearto" size={width * 0.05} />
                <View style={{ paddingTop: width * 0.01 }}>
                  <Text style={{ fontSize: width * 0.03 }}>
                    Likes {item.likes}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FontAwesome name="whatsapp" size={width * 0.05} />
                <View style={{ paddingTop: width * 0.01 }}>
                  <Text style={{ fontSize: width * 0.03 }}>
                    {" "}
                    share {item.share}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FontAwesome name="bookmark-o" size={width * 0.05} />
                <View style={{ paddingTop: width * 0.01 }}>
                  <Text style={{ fontSize: width * 0.03 }}>Bookmark</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Feather name="share-2" size={width * 0.05} />
                <View style={{ paddingTop: width * 0.01 }}>
                  <Text style={{ fontSize: width * 0.03 }}>Share</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Fontisto name="comments" size={width * 0.05} />
                <View style={{ paddingTop: width * 0.01 }}>
                  <Text style={{ fontSize: width * 0.03 }}>
                    {" "}
                    Comment {item.comments}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const RecentPosts = (props) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        // backgroundColor: "red",
      }}
    >
      <FlatList
        data={props.postData}
        numColumns={3}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              style={{
                margin: width * 0.015,
                height: height * 0.25,
                width: width * 0.3,
                // backgroundColor: "red",
              }}
            >
              <Video
                resizeMode="cover"
                source={{
                  uri: url + item.url,
                }}
                // ref={(ref) => (this[index] = ref)}
                style={{ flex: 1, borderRadius: width * 0.02 }}
                shouldPlay={false}
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};
