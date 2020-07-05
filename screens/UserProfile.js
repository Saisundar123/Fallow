import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Audio, Video } from "expo-av";
import {
  Entypo,
  AntDesign,
  FontAwesome,
  Feather,
  Fontisto,
} from "@expo/vector-icons";

const { height, width } = Dimensions.get("window");

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userdata: {
        id: "1",
        name: "Aditya",
        caption: "Aditya",
        Posts: "2",
        img:
          "data:image/jpeg;base64,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",
        followers: "0",
        following: "2",
        recentPosts: [
          {
            id: "1",
            name: "Aditya",
            caption: "Aditya",
            description: "hjhkjhjhjjhj",
            img:
              "data:image/jpeg;base64,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",
            videoUrl: require("../assets/tik.mp4"),
            views: "2000",
            postedOn: "20",
            likes: "0",
            share: "0",
            comments: "4",
          },
          {
            id: "2",
            name: "Aditya",
            caption: "Aditya",
            description: "hjhkjhjhjjhj",
            img:
              "data:image/jpeg;base64,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",
            videoUrl: require("../assets/tik.mp4"),
            views: "2000",
            postedOn: "20",
            likes: "0",
            share: "0",
            comments: "4",
          },
        ],
      },
    };
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
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
                  uri: this.state.userdata.img,
                }}
                style={{
                  height: width * 0.2,
                  width: width * 0.2,
                  borderRadius: width * 0.4,
                }}
              />
            </View>
            <View style={{ paddingLeft: width * 0.05 }}>
              <View>
                <Text style={{ fontWeight: "bold" }}>
                  {this.state.userdata.name}
                </Text>
              </View>
              <View style={{ paddingTop: width * 0.02 }}>
                <Text style={{ fontSize: width * 0.03, color: "grey" }}>
                  {this.state.userdata.caption}
                </Text>
              </View>
            </View>
          </View>

          <View style={{ flexDirection: "row" }}>
            <SpecialTags number={this.state.userdata.Posts} name="Posts" />
            <SpecialTags
              number={this.state.userdata.followers}
              name="Followers"
            />
            <SpecialTags
              number={this.state.userdata.following}
              name="Following"
            />
          </View>
          <View
            style={{
              paddingTop: height * 0.01,
              borderBottomWidth: 5,
              borderBottomColor: "#eeeeee",
            }}
          >
            <TouchableOpacity
              style={{
                height: height * 0.05,
                width: width * 0.9,
                borderRadius: width * 0.02,
                borderColor: "green",
                borderWidth: 2,
                alignSelf: "center",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text>EDIT PROFILE</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <RecentPosts postData={this.state.userdata.recentPosts} />
          </View>
        </ScrollView>
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

const RecentPosts = (props) => {
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
