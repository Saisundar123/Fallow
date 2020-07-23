import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  AsyncStorage,
} from "react-native";
import { Entypo, AntDesign, Ionicons, Fontisto } from "@expo/vector-icons";
import { Card } from "native-base";
import axios from "axios";
import { url } from "./Main";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { ScrollView } from "react-native-gesture-handler";

const { height, width } = Dimensions.get("window");

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userdata: "",
      userid: "",
      profileImg:
        "https://image.shutterstock.com/image-photo/closeup-nature-view-green-leaf-600w-1722021196.jpg",
      backImg:
        "https://media.gettyimages.com/photos/mata-atlantica-atlantic-forest-in-brazil-picture-id935746242?s=2048x2048",
    };
  }

  async componentDidMount() {
    try {
      const value = await AsyncStorage.getItem("userdata");
      if (value !== null) {
        const datas = JSON.parse(value);
        // We have data!!
        this.setState({ userid: datas.userData._id });
        this.getApiData(datas.userData._id);
        console.log(datas, "val");
      }
    } catch (error) {
      // Error retrieving data
      console.log(err, "err");
    }
    await this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }
  };

  _pickImage = async (focus) => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        if (focus == "face") {
          this.setState({ backImg: result.uri });
          this.setProfile("back", result.uri);
        } else {
          await this.setState({ profileImg: result.uri });
          this.setProfile("profile", result.uri);
        }
      }

      // console.log(result);
    } catch (E) {
      console.log(E);
    }
  };

  getApiData = (id) => {
    axios
      .post(
        `${url}api/userlist`,
        {
          id: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(async (res) => {
        if (res.data.status == 200) {
          this.setState({
            userdata: res.data.userData,
            profileImg: url + res.data.userData.profileImage,
            backImg: url + res.data.userData.backImage,
          });
          // console.log(this.state.userdata, "data");
        }
      })
      .catch((err) => console.log(err, "err"));
  };

  setProfile = (name, path) => {
    fetch(`${url}api/profileimage`, {
      method: "POST",
      body: this.createFormData(path, {
        userid: this.state.userid,
        type: name == "profile" ? "profile" : "back",
      }),
    })
      .then((response) => response.json())
      .then((response) => {})
      .catch((error) => {
        console.log("upload error", error);
        alert("Upload failed!");
      });
  };

  createFormData = (photo, body) => {
    // console.log(photo, "photo");
    const data = new FormData();
    let localUri = photo;
    let filename = localUri.split("/").pop();

    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    data.append("photo", {
      name: filename,
      type: type,
      uri: Platform.OS === "android" ? photo : photo.replace("file://", ""),
    });

    Object.keys(body).forEach((key) => {
      data.append(key, body[key]);
    });
    // console.log(data, "kkk");
    return data;
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
        <ImageBackground
          source={{
            uri: this.state.backImg,
          }}
          style={{ height: height * 0.3, paddingTop: width * 0.04 }}
        >
          <View
            style={{ flexDirection: "row", paddingLeft: width * 0.02, width }}
          >
            <View style={{}}>
              <TouchableOpacity
                style={{
                  // padding: width * 0.02,
                  height: width * 0.11,
                  width: width * 0.11,
                  backgroundColor: "rgba(52, 52, 52, 0.8)",
                  borderRadius: width * 0.02,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => this._pickImage("face")}
              >
                <Fontisto name="camera" size={width * 0.05} color="#fff" />
              </TouchableOpacity>
            </View>
            <View
              style={{
                // flex: 0.8,
                alignSelf: "center",
                // backgroundColor: "red",
                paddingLeft: width * 0.3,
              }}
            >
              <View>
                <Text style={{ color: "#fff", fontSize: width * 0.05 }}>
                  {this.state.userdata.fullname}
                </Text>
              </View>
              <View>
                <Text style={{ color: "#fff", fontSize: width * 0.04 }}>
                  Caption
                </Text>
              </View>
            </View>
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
                  {this.state.userdata.followers}
                </Text>
              </View>
              <View>
                <Text style={{ color: "#fff", fontSize: width * 0.04 }}>
                  Followers
                </Text>
              </View>
            </View>
            <View style={{}}>
              <Image
                source={{
                  uri: this.state.profileImg,
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
                  {this.state.userdata.following}
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
            style={{ paddingLeft: width * 0.01, paddingRight: width * 0.01 }}
          >
            <View style={{ paddingLeft: width * 0.04 }}>
              <Text style={{ fontSize: width * 0.04 }}>0</Text>
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
                height: width * 0.11,
                width: width * 0.11,
                backgroundColor: "rgba(52, 52, 52, 0.8)",
                borderRadius: width * 0.1,
                alignItems: "center",
                justifyContent: "center",
                bottom: width * 0.08,
                left: width * 0.1,
              }}
              onPress={() => this._pickImage("profile")}
            >
              <Fontisto name="camera" size={width * 0.045} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default Profile;

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
              uri:
                "data:image/jpeg;base64,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",
            }}
            style={{
              height: width * 0.15,
              width: width * 0.15,
              borderRadius: width * 0.2,
            }}
          />
        </View>
        <View style={{ paddingLeft: width * 0.05 }}>
          <View>
            <Text style={{ fontWeight: "bold" }}>Aditya</Text>
          </View>
          <View style={{ paddingTop: width * 0.02 }}>
            <Text style={{ fontSize: width * 0.03, color: "grey" }}>
              Aditya
            </Text>
          </View>
        </View>
      </View>
      <View></View>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity style={{ flex: 1 }}>
          <AntDesign name="heart" size={width * 0.04} />
          <View>
            <Text>0</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 1 }}>
          <AntDesign name="heart" size={width * 0.04} />
          <View>
            <Text>0</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 1 }}>
          <AntDesign name="heart" size={width * 0.04} />
          <View>
            <Text>0</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 1 }}>
          <AntDesign name="heart" size={width * 0.04} />
          <View>
            <Text>0</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 1 }}>
          <AntDesign name="heart" size={width * 0.04} />
          <View>
            <Text>0</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
