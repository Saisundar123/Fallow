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

class Mygallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likedVideos: "",
      userData: "",
    };
  }

  async componentDidMount() {
    await this.getUser();
    axios
      .get(`${url}api/likeddata/${this.state.userData._id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(async (res) => {
        if (res.data.status == 200) {
          this.setState({ likedVideos: res.data.likedVideos });

          // console.log(res.data, "nityuh");
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
        this.setState({ userData: datas.userData });
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
          data={this.state.likedVideos}
          numColumns={3}
          ListEmptyComponent={() => {
            return (
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingTop: width * 0.1,
                }}
              >
                <Text>No Data</Text>
              </View>
            );
          }}
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

export default Mygallery;
