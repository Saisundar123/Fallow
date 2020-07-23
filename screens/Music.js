import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import {
  Fontisto,
  MaterialCommunityIcons,
  FontAwesome,
  Entypo,
  MaterialIcons,
} from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";

const { height, width } = Dimensions.get("screen");
import { Audio } from "expo-av";
const soundObject = new Audio.Sound();

class Music extends Component {
  constructor(props) {
    super(props);
    this.state = {
      musicList: [
        {
          id: "1",
          url:
            "https://images.unsplash.com/photo-1432634372475-07b399e372ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
          title: "Name of music",
          caption: "caption",
          liked: false,
          play: "",
          musicUrl: require("../assets/music/kgf.mp3"),
        },
        {
          id: "2",
          url:
            "https://images.unsplash.com/photo-1432634372475-07b399e372ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
          title: "Name of music",
          caption: "caption",
          liked: false,
          play: "",
          musicUrl: require("../assets/music/dance.mp3"),
        },
        {
          id: "3",
          url:
            "https://images.unsplash.com/photo-1432634372475-07b399e372ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
          title: "Name of music",
          caption: "caption",
          liked: false,
          play: "",
          musicUrl: require("../assets/music/dhera.mp3"),
        },
        // {
        //   id: "4",
        //   url:
        //     "https://images.unsplash.com/photo-1432634372475-07b399e372ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
        //   title: "Name of music",
        //   caption: "caption",
        //   liked: false,
        //   play: false,
        //   musicUrl: require("../assets/music/dhera.mp3"),
        // },
        // {
        //   id: "5",
        //   url:
        //     "https://images.unsplash.com/photo-1432634372475-07b399e372ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
        //   title: "Name of music",
        //   caption: "caption",
        //   liked: false,
        //   play: false,
        //   musicUrl: require("../assets/music/kgf.mp3"),
        // },
        // {
        //   id: "6",
        //   url:
        //     "https://images.unsplash.com/photo-1432634372475-07b399e372ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
        //   title: "Name of music",
        //   caption: "caption",
        //   liked: false,
        //   play: false,
        //   musicUrl: require("../assets/music/kgf.mp3"),
        // },
        // {
        //   id: "7",
        //   url:
        //     "https://images.unsplash.com/photo-1432634372475-07b399e372ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
        //   title: "Name of music",
        //   caption: "caption",
        //   liked: false,
        //   play: false,
        //   musicUrl: require("../assets/music/kgf.mp3"),
        // },
        // {
        //   id: "8",
        //   url:
        //     "https://images.unsplash.com/photo-1432634372475-07b399e372ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
        //   title: "Name of music",
        //   caption: "caption",
        //   liked: false,
        //   play: false,
        //   musicUrl: require("../assets/music/kgf.mp3"),
        // },
        // {
        //   id: "9",
        //   url:
        //     "https://images.unsplash.com/photo-1432634372475-07b399e372ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
        //   title: "Name of music",
        //   caption: "caption",
        //   liked: false,
        //   play: false,
        //   musicUrl: require("../assets/music/kgf.mp3"),
        // },
        // {
        //   id: "10",
        //   url:
        //     "https://images.unsplash.com/photo-1432634372475-07b399e372ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
        //   title: "Name of music",
        //   caption: "caption",
        //   liked: false,
        //   play: false,
        //   musicUrl: require("../assets/music/kgf.mp3"),
        // },
        // {
        //   id: "11",
        //   url:
        //     "https://images.unsplash.com/photo-1432634372475-07b399e372ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
        //   title: "Name of music",
        //   caption: "caption",
        //   liked: false,
        //   play: false,
        //   musicUrl: require("../assets/music/dance.mp3"),
        // },
      ],
    };
  }

  clickLike = (index) => {
    const musicData = [...this.state.musicList];
    musicData[index].liked = !musicData[index].liked;
    this.setState({ musicList: musicData });
  };

  onPlay = async (index, music) => {
    const musicData = [...this.state.musicList];
    musicData[index].play =
      musicData[index].play === ""
        ? "play"
        : musicData[index].play === "play"
        ? "pause"
        : musicData[index].play === "replay"
        ? "pause"
        : "replay";
    await this.setState({ musicList: musicData });
    this.playMusic(musicData[index].play, music);
  };

  playMusic = async (action, music) => {
    // console.log(action, "act");
    if (action === "play") {
      try {
        await soundObject.unloadAsync();
        await soundObject.loadAsync(music, { shouldPlay: true });
        await soundObject.playAsync();
      } catch (error) {
        console.log(error, "err");
      }
    } else if (action === "pause") {
      await soundObject.pauseAsync();
    } else if (action === "replay") {
      await soundObject.playAsync();
    }
  };

  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <FlatList
            data={this.state.musicList}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    padding: width * 0.02,
                    borderBottomWidth: 1,
                    borderBottomColor: "grey",
                  }}
                  onPress={() => this.onPlay(index, item.musicUrl)}
                >
                  <View style={{ paddingRight: width * 0.02, flex: 2 }}>
                    <Image
                      source={{
                        uri: item.url,
                      }}
                      style={{ height: width * 0.15, width: width * 0.15 }}
                    />
                    <View
                      style={{
                        position: "absolute",
                        height: width * 0.15,
                        width: width * 0.15,
                        // backgroundColor: "red",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {item.play === "play" || item.play === "replay" ? (
                        <MaterialIcons name="pause" size={width * 0.09} />
                      ) : item.play === "pause" ? (
                        <Entypo name="controller-play" size={width * 0.09} />
                      ) : null}
                    </View>
                  </View>
                  <View style={{ width: width * 0.6, flex: 6 }}>
                    <View>
                      <Text
                        style={{ fontSize: width * 0.04, fontWeight: "bold" }}
                      >
                        Name of music
                      </Text>
                    </View>
                    <View>
                      <Text style={{ color: "grey", fontSize: width * 0.03 }}>
                        Name
                      </Text>
                    </View>
                    <View>
                      <Text style={{ color: "grey", fontSize: width * 0.03 }}>
                        Name
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      flex: 1,
                    }}
                    onPress={() => this.clickLike(index)}
                  >
                    {item.liked ? (
                      <FontAwesome
                        name="bookmark"
                        size={width * 0.06}
                        color="black"
                      />
                    ) : (
                      <FontAwesome
                        name="bookmark-o"
                        size={width * 0.06}
                        color="black"
                      />
                    )}
                  </TouchableOpacity>
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      flex: 1,
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        height: width * 0.06,
                        width: width * 0.06,
                        borderRadius: width * 0.01,
                        backgroundColor: "rgb(0, 122, 255)",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <MaterialCommunityIcons
                        name="music-note-plus"
                        size={width * 0.05}
                        color="#fff"
                      />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </ScrollView>
    );
  }
}

export default Music;
