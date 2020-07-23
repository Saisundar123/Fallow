import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Switch,
  ActivityIndicator,
  AsyncStorage,
} from "react-native";
// import Video from 'react-native-video';
import { Audio, Video } from "expo-av";
import { Card } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import Dialog, { DialogContent } from "react-native-popup-dialog";
import * as Progress from "react-native-progress";
import { url } from "./Main";

const { height, width } = Dimensions.get("window");
class UploadVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shareValue: false,
      commentValue: false,
      caption: "",
      visible: false,
      userid: "",
    };
  }

  async componentDidMount() {
    try {
      const value = await AsyncStorage.getItem("userdata");
      if (value !== null) {
        const datas = JSON.parse(value);
        // We have data!!
        await this.setState({ userid: datas.userData });
        // console.log(value, "val");
      }
    } catch (error) {
      // Error retrieving data
      console.log(err, "err");
    }
  }
  createFormData = (photo, body) => {
    console.log(photo, "photo");
    const data = new FormData();
    let localUri = photo.uri;
    let filename = localUri.split("/").pop();

    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    data.append("photo", {
      name: filename,
      type: type,
      uri:
        Platform.OS === "android"
          ? photo.uri
          : photo.uri.replace("file://", ""),
    });

    Object.keys(body).forEach((key) => {
      data.append(key, body[key]);
    });
    console.log(data, "kkk");
    return data;
  };

  clickClose = () => {
    this.props.navigation.navigate("camera");
  };

  uploadVideo = () => {
    this.setState({ visible: true });
    // console.log(this.state.userid, "userud");
    fetch(`${url}api/video/upload`, {
      method: "POST",
      body: this.createFormData(this.props.route.params.uploadData, {
        username: this.state.userid.fullname,
        caption: this.state.caption,
        userid: this.state.userid._id,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log("upload succes", response);
        this.setState({ visible: false });
        this.props.navigation.navigate("camera");
        // this.setState({ photo: null });
      })
      .catch((error) => {
        console.log("upload error", error);
        alert("Upload failed!");
      });
  };

  render() {
    const data = this.props.route.params.uploadData;
    return (
      <View style={{ flex: 1 }}>
        <Card
          style={{
            flex: 0.14,
            marginTop: 0,
            justifyContent: "space-around",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={() => this.clickClose()}>
            <AntDesign name="closecircle" size={width * 0.07} color="red" />
          </TouchableOpacity>
          <View>
            <Text style={{ fontSize: width * 0.045, fontWeight: "bold" }}>
              Your Video
            </Text>
          </View>
          <TouchableOpacity onPress={() => this.uploadVideo()}>
            <AntDesign name="checkcircle" size={width * 0.07} color="red" />
          </TouchableOpacity>
        </Card>
        <View
          style={{
            paddingTop: width * 0.04,
            alignSelf: "center",
            // backgroundColor: "red",
          }}
        >
          <Video
            resizeMode="cover"
            source={{
              uri: data.uri,
            }}
            // ref={(ref) => (this[index] = ref)}
            style={{ height: width * 0.5, width: width * 0.85 }}
            shouldPlay={true}
          />
          <View style={{ padding: width * 0.03 }}>
            <TextInput
              placeholder="Add a Caption"
              onChangeText={(text) => this.setState({ caption: text })}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingLeft: width * 0.03,
              paddingRight: width * 0.05,
              paddingBottom: width * 0.03,
            }}
          >
            <View>
              <Text style={{ fontWeight: "bold", fontSize: width * 0.04 }}>
                Comments
              </Text>
            </View>
            <View>
              <Switch
                value={this.state.commentValue}
                onValueChange={() =>
                  this.setState({ commentValue: !this.state.commentValue })
                }
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingLeft: width * 0.03,
              paddingRight: width * 0.05,
            }}
          >
            <View>
              <Text style={{ fontWeight: "bold", fontSize: width * 0.04 }}>
                Share
              </Text>
            </View>
            <View>
              <Switch
                value={this.state.shareValue}
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                onValueChange={() =>
                  this.setState({ shareValue: !this.state.shareValue })
                }
              />
            </View>
          </View>
        </View>
        <Dialog
          visible={this.state.visible}
          //   onTouchOutside={() => {
          //     this.setState({ visible: false });
          //   }}
        >
          <DialogContent
            style={{
              //   flexDirection: "row",
              justifyContent: "center",
              borderRadius: width * 0.02,
              alignItems: "center",
              paddingTop: width * 0.02,
              height: height * 0.1,
              width: width * 0.7,
            }}
          >
            <View style={{ paddingBottom: width * 0.02 }}>
              <Text style={{ fontWeight: "bold", fontSize: width * 0.05 }}>
                Uploading
              </Text>
            </View>
            <Progress.Bar indeterminate={true} width={width * 0.5} />
          </DialogContent>
        </Dialog>
      </View>
    );
  }
}

export default UploadVideo;
