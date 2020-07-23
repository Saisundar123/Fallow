import React, { Component } from "react";
import {
  View,
  Text,
  AsyncStorage,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import axios from "axios";
import { url } from "../Main";
import { Audio, Video } from "expo-av";
import {
  Entypo,
  AntDesign,
  FontAwesome,
  Feather,
  Fontisto,
} from "@expo/vector-icons";

const { height, width } = Dimensions.get("screen");

class MyPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: "",
      userid: "",
    };
  }

  async componentDidMount() {
    await this.getUser();
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
          this.setState({ posts: res.data.data.userPosts });
          // console.log(res.data.data.userPosts, "nityuh");
        }
      })
      .catch((err) => console.log(err, "err"));
  }

  getUser = async () => {
    try {
      const value = await AsyncStorage.getItem("userdata");
      if (value !== null) {
        const datas = JSON.parse(value);
        // We have data!!
        this.setState({ userid: datas.userData._id });
      }
    } catch (error) {
      // Error retrieving data
      console.log(err, "err");
    }
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.state.posts}
          numColumns={3}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                style={{
                  margin: width * 0.015,
                  height: height * 0.25,
                  width: width * 0.3,
                }}
              >
                <Video
                  resizeMode="cover"
                  source={{ uri: url + item.url }}
                  style={{ flex: 1, borderRadius: width * 0.02 }}
                  shouldPlay={false}
                />
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }
}

export default MyPost;
