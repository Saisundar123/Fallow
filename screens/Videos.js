import React, { Component, PureComponent, useEffect } from "react";
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
import { useFocusEffect } from "@react-navigation/native";
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
import RenderItem from "./RenderItem";

const { height, width } = Dimensions.get("screen");

class Videos extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      number: "6304975047",
      downloading: false,
      rotate: new Animated.Value(0),
      commentAnimate: new Animated.Value(0),
      sheetVisible: false,
      data: [],
      commentSlide: false,
      newComment: "",
      userid: "",
      page: "0",
    };
  }

  downloadShare = async (imgUrl) => {
    const uri = url + imgUrl;
    let fileUri = FileSystem.documentDirectory + "small.mp4";

    await FileSystem.downloadAsync(uri, fileUri)
      .then(({ uri }) => {
        Sharing.shareAsync(uri, { dialogTitle: "Fallow" });
        // this.saveFile(uri);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  downloadFile = async (item, index) => {
    // console.log(url + imgUrl, "mj");
    const datas = this.state.data;
    this.setState({ downloading: true });
    const uri = url + item.url;
    let fileUri = FileSystem.documentDirectory + "small.mp4";
    // console.log(fileUri, "kkkkk");
    await FileSystem.downloadAsync(uri, fileUri)
      .then(({ uri }) => {
        datas[index].downloads += 1;
        this.setState({ downloading: false, data: datas });
        this.addLike(item, index);
        this.saveFile(uri);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  onShare = async () => {
    Sharing.shareAsync("http://techslides.com/demos/sample-videos/small.mp4");
    // try {
    //   const result = await Share.share({
    //     message:
    //       "React Native | A framework for building native apps using React",
    //   });
    //   if (result.action === Share.sharedAction) {
    //     if (result.activityType) {
    //       // shared with activity type of result.activityType
    //     } else {
    //       // shared
    //     }
    //   } else if (result.action === Share.dismissedAction) {
    //     // dismissed
    //   }
    // } catch (error) {
    //   alert(error.message);
    // }
  };

  getDisk = () => {
    FileSystem.getFreeDiskStorageAsync().then((freeDiskStorage) => {
      console.log((freeDiskStorage / 1073741824).toFixed(2), "free");
    });
    FileSystem.getTotalDiskCapacityAsync().then((totalDiskCapacity) => {
      console.log((totalDiskCapacity / 1073741824).toFixed(2), "total");
    });
  };

  saveFile = async (fileUri) => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === "granted") {
      const asset = await MediaLibrary.createAssetAsync(fileUri);
      console.log(asset, "assest");
      await MediaLibrary.createAlbumAsync("Fallow", asset, false);
    }
  };

  async componentDidMount() {
    this.getApiData();
    this.cdRotate();
    try {
      const value = await AsyncStorage.getItem("userdata");
      if (value !== null) {
        const datas = JSON.parse(value);
        await this.setState({ userData: datas.userData });
        // console.log(this.state.userData, "userid");
        // console.log(datas, "val");
      }
    } catch (error) {
      console.log(err, "err");
    }
  }

  getApiData = () => {
    console.log(this.state.page, "page");
    axios
      .get(
        `${url}api/video/getall/${this.state.page}`,

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(async (res) => {
        if (res.data.status == 200) {
          await res.data.videos.map((item, i) => {
            item.play = false;
            item.liked = false;
            item.id = i.toString();
          });
          console.log(this.state.page, "pages");
          if (this.state.page == 0) {
            this.setState({ data: res.data.videos });
          } else {
            this.setState({
              data: this.state.data.concat(res.data.videos),
            });
          }
        }
      })
      .catch((err) => console.log(err, "err"));
  };

  cdRotate = () => {
    this.state.rotate.setValue(0);
    Animated.timing(this.state.rotate, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    }).start(() => this.cdRotate());
  };

  perform = async (target, index, item) => {
    // console.log(target, index, item);
    const datas = [...this.state.data];
    switch (target) {
      case "like":
        datas[index].likes += 1;
        datas[index].liked = !datas[index].liked;
        await this.setState({ data: datas });
        this.addLike(item, index);
        break;
      case "comment":
        this.openComment();
        break;
      case "download":
        await this.downloadFile(item, index);

        break;
      case "share":
        // this.onShare();
        this.downloadShare(item.url);
        break;
    }
    this.setState({ data: datas });
  };

  addLike = (item, index) => {
    // console.log(this.state.data[0], "ppppp");
    axios
      .put(
        `${url}api/video/addall`,
        {
          id: item._id,
          userid: this.state.userData._id,
          update: {
            downloads: this.state.data[index].downloads,
            likes: this.state.data[index].likes,
          },
        },

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(async (res) => {
        if (res.data.status == 200) {
          console.log(res.data, "res");
        }
      })
      .catch((err) => console.log(err, "err"));
  };

  openComment = () => {
    this.setState({ commentSlide: true });
    Animated.timing(this.state.commentAnimate, {
      toValue: 1,
      duration: 500,
    }).start();
  };

  onBackPress = () => {
    this.setState({ commentSlide: false });
    Animated.timing(this.state.commentAnimate, {
      toValue: 0,
      duration: 500,
    }).start();
  };

  onchangeText = (text) => {
    this.setState({ newComment: text });
  };

  // shouldComponentUpdate(nextProps) {
  //   console.log(nextProps, "props");
  // }

  onSend = async (index, videoid) => {
    const datas = [...this.state.data];
    const object = {
      url: this.state.userData.profileImage,
      name: this.state.userData.fullname,
      comment: this.state.newComment,
    };
    datas[index].comments.push(object);
    this.setState({ data: datas });
    this.processComment(videoid);
    this.setState({ newComment: "" });
    // console.log(text, index);
  };

  processComment = (videoid) => {
    axios
      .put(
        `${url}api/video/addcomment`,
        {
          videoid: videoid,
          profileurl: this.state.userData.profileImage,
          comment: this.state.newComment,
          name: this.state.userData.fullname,
        },

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(async (res) => {
        if (res.data.status == 200) {
          console.log(res.data, "res");
        }
      })
      .catch((err) => console.log(err, "err"));
  };

  onFallow = (id) => {
    // console.log("hjhj");
    // console.log(id, this.state.userData, "ids");
    axios
      .post(
        `${url}api/followUnfollow`,
        {
          type: "follow",
          followerid: id,
          userid: this.state.userData._id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(async (res) => {
        if (res.data.status == 200) {
          this.sendPushNotification(res.data.expotoken);
          // console.log(res.data, "fallow");
        }
      })
      .catch((err) => console.log(err, "err"));
  };

  sendPushNotification = async (expoToken) => {
    // console.log(this.state.expoPushToken, "exo");
    const message = {
      to: expoToken,
      sound: "default",
      title: "Fallow",
      body: `${this.state.userData.fullname} is following you`,
      data: { data: "goes here" },
      _displayInForeground: true,
    };
    const response = await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  };

  changePage = async () => {
    await this.setState({ page: Number(this.state.page) + 1 });
    this.getApiData();
  };

  footerRender = () => {
    return (
      <View style={{ bottom: width * 0.2 }}>
        <ActivityIndicator size="large" animating />
      </View>
    );
  };

  render() {
    const cdRotating = this.state.rotate.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: ["0deg", "360deg", "0deg"],
    });
    const videoHeight = this.state.commentAnimate.interpolate({
      inputRange: [0, 1],
      outputRange: [height * 0.885, height * 0.4],
    });
    const commentHeight = this.state.commentAnimate.interpolate({
      inputRange: [0, 1],
      outputRange: [0, height * 0.48],
    });
    return (
      <View style={{ height: height * 0.88 }}>
        <View>
          <FlatList
            data={this.state.data}
            // maxToRenderPerBatch={5}
            // removeClippedSubviews={true}
            // initialNumToRender={3}
            // windowSize={15}
            // legacyImplementation={true}
            // updateCellsBatchingPeriod={5}
            scrollEnabled={this.state.commentSlide ? false : true}
            onEndReached={() => {
              this.changePage();
              console.log("reac");
            }}
            ListFooterComponent={this.footerRender}
            onEndReachedThreshold={1}
            snapToAlignment={"start"}
            onScroll={async (e) => {
              let offset = e.nativeEvent.contentOffset.y;
              let index = parseInt(offset / (height * 0.86));
              // console.log(index, "yyyyyy");
              // your cell height
              if (this.state.value !== index) {
                await this.setState({ value: index });
              }
            }}
            snapToInterval={height * 0.885}
            decelerationRate={"fast"}
            ListEmptyComponent={() => {
              return (
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    // backgroundColor: "red",
                    height,
                  }}
                >
                  <ActivityIndicator size="large" />
                </View>
              );
            }}
            renderItem={({ item, index }) => {
              // const videoSource = url + item.url;
              return (
                // <RenderItem
                //   videoHeight={videoHeight}
                //   source={videoSource}
                //   // shouldPlay={index === this.state.value ? true : false}
                //   shouldPlay={true}
                //   commentHeight={commentHeight}
                //   commentValue={this.state.newComment}
                //   onBackPress={this.onBackPress}
                //   comments={item.comments}
                //   onchangeText={(text) => {
                //     this.onchangeText(text);
                //   }}
                //   onSend={() => this.onSend(index, item._id)}
                //   commentSlide={this.state.commentSlide}
                //   index={index}
                //   // userid={item.userId}
                //   cdRotating={cdRotating}
                //   item={item}
                //   commentSlide={this.state.commentSlide}
                //   onFallow={() => this.onFallow(item.userId)}
                //   perform={this.perform}
                //   downloading={this.state.downloading}
                //   {...this.props}
                // />
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
                    <Animated.View style={{ height: videoHeight, width }}>
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
                        source={{ uri: url + item.url }}
                        ref={(ref) => (this.videoRef = ref)}
                        style={{ flex: 1 }}
                        // onLoad={() => console.log("startedn")}
                        shouldPlay={index === this.state.value ? true : false}
                      />
                    </Animated.View>
                    <VideoComments
                      commentHeight={commentHeight}
                      onBackPress={this.onBackPress}
                      comments={item.comments}
                      onChangeText={this.onchangeText}
                      onSend={() => this.onSend(index)}
                    />
                  </View>
                  {/* {this.state.commentSlide ? null : (
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
                                  userid: item.userId,
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
                                {item.fullname}
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
                              onPress={() => this.onFallow(item.userId)}
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
                              {item.caption}
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
                            onPress={() => this.perform("like", index, item)}
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
                              color={item.liked ? "red" : "#fff"}
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
                              {item.likes}
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
                            onPress={() => this.perform("comment", index, null)}
                            style={{
                              height: width * 0.12,
                              width: width * 0.12,
                              backgroundColor: "rgba(52, 52, 52, 0.8)",
                              borderRadius: width * 0.02,
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Entypo
                              name="message"
                              size={width * 0.07}
                              color="#fff"
                            />
                          </TouchableOpacity>
                          <View>
                            <Text
                              style={{ color: "#fff", fontSize: width * 0.035 }}
                            >
                              0
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
                              this.perform("download", index, item)
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
                            {this.state.downloading ? (
                              <ActivityIndicator size="small" color="#fff" />
                            ) : (
                              <Feather
                                name="download"
                                size={width * 0.07}
                                color="#fff"
                              />
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
                              {item.downloads}
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
                            onPress={() => this.perform("share", index, item)}
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
                              {item.whatsapp}
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
                              transform: [{ rotateZ: cdRotating }],
                            }}
                          />
                        </View>
                      </View>
                    </View>
                  )} */}
                </View>
              );
            }}
            keyExtractor={(item, index) => `${index}`}
          />
        </View>
        {this.state.commentSlide ? null : this.state.data.length >= 1 ? ( // /> //   {...this.props} //   perform={(action) => this.perform(action, index, item)} //   cdRotating={cdRotating} //   items={item} // <VideoTop
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
                        userid: this.state.data[this.state.value].userId,
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
                      {this.state.data[this.state.value].fullname}
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
                    onPress={() =>
                      this.onFallow(this.state.data[this.state.value].userId)
                    }
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
                    {this.state.data[this.state.value].caption}
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
                    this.perform(
                      "like",
                      this.state.value,
                      this.state.data[this.state.value]
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
                    color={
                      this.state.data[this.state.value].liked ? "red" : "#fff"
                    }
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
                    {this.state.data[this.state.value].likes}
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
                    this.perform("comment", this.state.value, null)
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
                    0
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
                    this.perform(
                      "download",
                      this.state.value,
                      this.state.data[this.state.value]
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
                  {this.state.downloading ? (
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
                    {this.state.data[this.state.value].downloads}
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
                    this.perform(
                      "share",
                      this.state.value,
                      this.state.data[this.state.value]
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
                    {this.state.data[this.state.value].whatsapp}
                  </Text>
                </View>
              </View>

              <TouchableOpacity style={{ paddingBottom: width * 0.02 }}>
                <Animated.Image
                  resizeMode="contain"
                  source={{
                    uri:
                      "https://www.flaticon.com/premium-icon/icons/svg/3083/3083400.svg",
                  }}
                  style={{
                    height: width * 0.15,
                    width: width * 0.15,
                    transform: [{ rotateZ: cdRotating }],
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
      </View>
    );
  }
}

export default Videos;

// const SheetContent = (props) => {
//   return (
//     <View style={{ flex: 1 }}>
//       <ScrollView style={{ flex: 0.82 }}>
//         {/* <View style={{}}> */}
//         <View
//           style={{
//             margin: width * 0.02,
//             borderBottomWidth: 2,
//             borderColor: "grey",
//             paddingBottom: width * 0.02,
//           }}
//         >
//           <View style={{ flexDirection: "row" }}>
//             <Image
//               source={{
//                 uri:
//                   "data:image/jpeg;base64,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",
//               }}
//               style={{
//                 height: width * 0.1,
//                 width: width * 0.1,
//                 borderRadius: width * 0.2,
//               }}
//             />
//             <View style={{ paddingLeft: width * 0.04 }}>
//               <Text style={{ fontWeight: "bold", fontSize: width * 0.05 }}>
//                 Aditya
//               </Text>
//             </View>
//           </View>
//           <View style={{ paddingTop: width * 0.02 }}>
//             <Text style={{ fontSize: width * 0.04, fontWeight: "bold" }}>
//               #funnyVideo
//             </Text>
//           </View>
//         </View>
//         <View style={{ marginLeft: width * 0.02 }}>
//           {props.comments.commentsData.map((item, i) => {
//             return (
//               <View>
//                 <View style={{ flexDirection: "row" }}>
//                   <Image
//                     source={{
//                       uri: item.url,
//                     }}
//                     style={{
//                       height: width * 0.1,
//                       width: width * 0.1,
//                       borderRadius: width * 0.2,
//                     }}
//                   />
//                   <View style={{ paddingLeft: width * 0.02 }}>
//                     <Text
//                       style={{ fontWeight: "bold", fontSize: width * 0.05 }}
//                     >
//                       {item.name}
//                     </Text>
//                   </View>
//                 </View>
//                 <View style={{ marginLeft: width * 0.12 }}>
//                   <View>
//                     <Text>{item.comments}</Text>
//                   </View>
//                   <View
//                     style={{ flexDirection: "row", paddingTop: width * 0.02 }}
//                   >
//                     <TouchableOpacity style={{ marginRight: width * 0.03 }}>
//                       <Text
//                         style={{
//                           fontWeight: "bold",
//                           fontSize: width * 0.04,
//                           color: "skyblue",
//                         }}
//                       >
//                         Like
//                       </Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity style={{ marginRight: width * 0.03 }}>
//                       <Text
//                         style={{
//                           fontWeight: "bold",
//                           fontSize: width * 0.04,
//                           color: "skyblue",
//                         }}
//                       >
//                         Reply
//                       </Text>
//                     </TouchableOpacity>
//                   </View>
//                 </View>
//               </View>
//             );
//           })}
//         </View>
//         {/* </View> */}
//       </ScrollView>
//       <View
//         style={{
//           flex: 0.18,
//           flexDirection: "row",
//           alignItems: "center",
//           justifyContent: "space-around",
//           backgroundColor: "#ecedf6",
//         }}
//       >
//         <TouchableOpacity
//           style={{
//             height: width * 0.1,
//             width: width * 0.1,
//             borderRadius: width * 0.2,
//             backgroundColor: "#b163e7",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <AntDesign name="gift" size={width * 0.05} color="#fff" />
//         </TouchableOpacity>
//         <View
//           style={{
//             backgroundColor: "#ffffff",
//             paddingRight: width * 0.03,
//             paddingLeft: width * 0.02,
//           }}
//         >
//           <TextInput
//             placeholder="Comment"
//             style={{
//               height: height * 0.05,
//               width: width * 0.7,
//               borderRadius: width * 0.05,
//               // backgroundColor: "red",
//             }}
//           />
//         </View>
//         <TouchableOpacity>
//           <MaterialIcons name="send" size={width * 0.08} color="#b163e7" />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const DownloadContent = (props) => {
//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Text>Under Development</Text>
//     </View>
//   );
// };

{
  /* <RBSheet
                    ref={(ref) => {
                       = ref;
                    }}
                    height={height * 0.5}
                    customStyles={{
                      container: {
                        borderTopRightRadius: width * 0.03,
                        borderTopLeftRadius: width * 0.03,
                      },
                    }}
                  >
                    <SheetContent comments={item} />

                    <TouchableOpacity
                      style={{
                        position: "absolute",
                        top: -height * 0.07,
                        left: width * 0.9,
                      }}
                      onPress={() => this.bottomSheet.close()}
                    >
                      <AntDesign
                        name="close"
                        size={width * 0.07}
                        color="#fff"
                      />
                    </TouchableOpacity>
                  </RBSheet> */
}
