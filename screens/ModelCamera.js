import React, { Component } from "react";
import { Text, View, TouchableOpacity, Dimensions } from "react-native";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";
import {
  Fontisto,
  Ionicons,
  Entypo,
  MaterialIcons,
  MaterialCommunityIcons,
  Feather,
} from "@expo/vector-icons";

const { height, width } = Dimensions.get("window");
export default class ModelCamera extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      type: false,
      videoTaking: false,
      flashMode: Camera.Constants.FlashMode.on,
    };
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    this.setState({ hasCameraPermission: status === "granted" });
    // console.log(this.state.hasCameraPermission);
  }

  recordVideo = () => {
    if (this.state.videoTaking) {
      this.setState({ videoTaking: false });
      this.cameraRef.stopRecording();
      // .then((res) => console.log(res, "resStop"))
      // .catch((err) => console.log(err, "err"));
    } else {
      this.setState({ videoTaking: true });
      this.cameraRef
        .recordAsync()
        .then((res) => console.log(res, "res"))
        .catch((err) => console.log(err, "err"));
    }
  };

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            style={{ flex: 1 }}
            flashMode={this.state.flashMode}
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
                  flex: 0.4,
                  flexDirection: "row",
                  justifyContent: "space-around",
                  paddingTop: height * 0.06,
                }}
              >
                <View>
                  <Text style={{ fontSize: width * 0.06, color: "#fff" }}>
                    0:0
                  </Text>
                </View>
                <View>
                  <TouchableOpacity
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
                  </TouchableOpacity>
                </View>
                <View>
                  <View style={{ paddingBottom: width * 0.02 }}>
                    <TouchableOpacity>
                      <Fontisto name="flash" size={width * 0.09} color="#fff" />
                    </TouchableOpacity>
                    <View>
                      <Text style={{ color: "#fff" }}>Flash</Text>
                    </View>
                  </View>

                  <View style={{ paddingBottom: width * 0.02 }}>
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

                  <View style={{ paddingBottom: width * 0.02 }}>
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

                  <View style={{ paddingBottom: width * 0.02 }}>
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
                  flex: 0.6,
                  // backgroundColor: "red",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  paddingBottom: width * 0.02,
                }}
              >
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
              </View>
            </View>
          </Camera>
        </View>
      );
    }
  }
}
