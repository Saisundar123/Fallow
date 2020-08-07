import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Image,
} from "react-native";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import Dialog, { DialogContent } from "react-native-popup-dialog";
import {
  Fontisto,
  Ionicons,
  Entypo,
  MaterialIcons,
  MaterialCommunityIcons,
  Feather,
} from "@expo/vector-icons";
import { url } from "./Main";

const { height, width } = Dimensions.get("window");
export default class ModelCamera extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      type: false,
      videoTaking: false,
      flashMode: Camera.Constants.FlashMode.on,
      galleryVideo: "",
      visible: false,
      live: false,
    };
  }

  async componentDidMount() {
    // this.getPermissionAsync();
    this.cameraPermission();
  }

  componentDidUpdate(prevProps) {
    // console.log("llllllll");
    if (this.props !== prevProps) {
      if (this.props.route.params) {
        // console.log(this.props.route.params, "params");
        this.setState({
          live: this.props.route.params.live,
        });
      }
    }
  }

  cameraPermission = async (prevProps) => {
    const statuses = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL
    );
    if (statuses.status === "granted") {
      const { status } = await Permissions.askAsync(
        Permissions.AUDIO_RECORDING
      );
      this.setState({
        hasCameraPermission: status === "granted" ? true : false,
      });
      // console.log(this.state.hasCameraPermission, status);
    }

    // this.setState({
    //   live:
    //     this.props.route.params == undefined
    //       ? this.props.route.params.live
    //       : null,
    // });
    // console.log(this.props.route.params, this.state.live, "route");
  };

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        // this.setState({ galleryVideo: result });
        this.props.navigation.navigate("uploadvideo", {
          uploadData: result,
          draft: false,
        });
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };

  recordVideo = () => {
    // console.log(this.state.videoTaking, "taki");
    if (this.state.videoTaking) {
      this.setState({ videoTaking: false });
      this.cameraRef.stopRecording();
    } else {
      this.setState({ videoTaking: true });
      this.cameraRef
        .recordAsync({
          maxDuration: 60,
          quality: Camera.Constants.VideoQuality["1080p"],
          mute: false,
        })
        .then((res) => {
          this.props.navigation.navigate("uploadvideo", { uploadData: res });
          console.log(res, "res");
        })
        .catch((err) => console.log(err, "err"));
    }
  };

  render() {
    // console.log(this.state.live, "ren");
    return (
      <View style={{ flex: 1 }}>
        {this.state.hasCameraPermission ? (
          <Camera
            style={{ flex: 1 }}
            flashMode={this.state.flashMode}
            autoFocus={Camera.Constants.AutoFocus.on}
            whiteBalance={Camera.Constants.WhiteBalance.auto}
            type={
              this.state.type
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            }
            ref={(ref) => (this.cameraRef = ref)}
          >
            <View
              style={{
                height,
                width,
              }}
            >
              <View
                style={{
                  flex: 0.7,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingTop: height * 0.06,
                  // backgroundColor: "red",
                  paddingRight: width * 0.04,
                  paddingLeft: width * 0.04,
                }}
              >
                <View>
                  {this.state.live ? null : (
                    <Text style={{ fontSize: width * 0.06, color: "#fff" }}>
                      0:0
                    </Text>
                  )}
                </View>
                <View>
                  {/* <TouchableOpacity
                    style={{
                      height: height * 0.04,
                      width: width * 0.4,
                      borderRadius: width * 0.02,
                      backgroundColor: "#fff",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-around",
                    }}
                  >
                    <View>
                      <Feather name="music" size={width * 0.06} />
                    </View>
                    <View>
                      <Text style={{ fontWeight: "bold" }}>ADD MEDIA</Text>
                    </View>
                  </TouchableOpacity> */}
                </View>
                <View
                  style={{
                    // backgroundColor: "green",
                    justifyContent: "flex-end",
                  }}
                >
                  <View style={{ paddingBottom: width * 0.04 }}>
                    <TouchableOpacity>
                      <Fontisto name="flash" size={width * 0.09} color="#fff" />
                    </TouchableOpacity>
                    <View>
                      <Text style={{ color: "#fff" }}>Flash</Text>
                    </View>
                  </View>

                  <View style={{ paddingBottom: width * 0.04 }}>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({ type: !this.state.type });
                      }}
                    >
                      <Entypo name="camera" size={width * 0.09} color="#fff" />
                    </TouchableOpacity>
                    <View>
                      <Text style={{ color: "#fff" }}>Turn</Text>
                    </View>
                  </View>

                  <View style={{ paddingBottom: width * 0.04 }}>
                    <TouchableOpacity>
                      <MaterialIcons
                        name="filter-tilt-shift"
                        size={width * 0.09}
                        color="#fff"
                      />
                    </TouchableOpacity>
                    <View>
                      <Text style={{ color: "#fff" }}>Filter</Text>
                    </View>
                  </View>

                  <View style={{ paddingBottom: width * 0.04 }}>
                    <TouchableOpacity>
                      <MaterialCommunityIcons
                        name="camera-timer"
                        size={width * 0.09}
                        color="#fff"
                      />
                    </TouchableOpacity>
                    <View>
                      <Text style={{ color: "#fff" }}>Timer</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flex: 0.3,
                  // backgroundColor: "red",
                  justifyContent: "space-around",
                  alignItems: "flex-end",
                  paddingBottom: width * 0.02,
                  flexDirection: "row",
                }}
              >
                {this.state.live ? null : (
                  <TouchableOpacity onPress={() => this._pickImage()}>
                    <Image
                      source={{
                        uri: "https://img.icons8.com/cotton/2x/gallery.png",
                      }}
                      style={{ height: width * 0.13, width: width * 0.13 }}
                    />
                    <View>
                      <Text style={{ fontSize: width * 0.04, color: "#fff" }}>
                        Gallery
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  style={{
                    height: width * 0.2,
                    width: width * 0.2,
                    borderRadius: width * 0.4,
                    backgroundColor: "transparent",
                    borderWidth: 2,
                    borderColor: "#fff",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={this.recordVideo}
                >
                  <View
                    style={{
                      height: width * 0.16,
                      width: width * 0.16,
                      borderRadius: width * 0.4,
                      backgroundColor: "#ffffff",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {this.state.videoTaking ? (
                      <View
                        style={{
                          height: width * 0.05,
                          width: width * 0.05,
                          borderRadius: width * 0.1,
                          backgroundColor: "red",
                        }}
                      />
                    ) : (
                      <View
                        style={{
                          height: width * 0.05,
                          width: width * 0.05,
                          borderRadius: width * 0.01,
                          backgroundColor: "red",
                        }}
                      />
                    )}
                  </View>
                </TouchableOpacity>
                {this.state.live ? null : (
                  <TouchableOpacity
                    style={{ alignItems: "center" }}
                    onPress={() => this.props.navigation.navigate("music")}
                  >
                    <Image
                      source={{
                        uri:
                          "https://img.icons8.com/fluent/96/music-library.png",
                      }}
                      style={{ height: width * 0.13, width: width * 0.13 }}
                    />
                    <View>
                      <Text style={{ fontSize: width * 0.04, color: "#fff" }}>
                        Add Music
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </Camera>
        ) : this.state.hasCameraPermission == false ? (
          <Text>No access to camera</Text>
        ) : (
          <View />
        )}
        {/* <Dialog
          visible={this.state.visible}
          onTouchOutside={() => {
            this.setState({ visible: false });
          }}
        >
          <DialogContent>
            <View>
              <Text>Do You Want To Upload </Text>
            </View>
            <TouchableOpacity onPress={() => this.uploadGallery()}>
              <Text>Upload</Text>
            </TouchableOpacity>
          </DialogContent>
        </Dialog> */}
      </View>
    );
  }
}
// }
