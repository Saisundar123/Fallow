import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Image,
  CheckBox,
  Linking,
  TouchableHighlight,
  Share,
  ActivityIndicator,
  TextInput,
  Animated,
  ScrollView,
} from "react-native";
import { Card } from "native-base";
import {
  AntDesign,
  Entypo,
  FontAwesome,
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

const { height, width } = Dimensions.get("screen");

export default VideoComments = (props) => {
  // console.log(props.comments, "htttt");
  return (
    <Animated.View style={{ width, height: props.commentHeight }}>
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
        }}
      >
        <Card
          style={{
            flexDirection: "row",
            padding: width * 0.03,
            marginTop: 0,
            marginLeft: 0,
            marginRight: 0,
          }}
        >
          <TouchableOpacity onPress={() => props.onBackPress()}>
            <AntDesign name="arrowleft" size={width * 0.05} />
          </TouchableOpacity>
          <View style={{ paddingLeft: width * 0.02 }}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: width * 0.035,
              }}
            >
              Comments
            </Text>
          </View>
        </Card>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderBottomWidth: 1,
            justifyContent: "space-around",
          }}
        >
          <View
            style={{
              height: height * 0.05,
              width: width * 0.8,
              //   borderRadius: width * 0.05,
              //   backgroundColor: "red",
              paddingLeft: width * 0.02,
              justifyContent: "center",
            }}
          >
            <TextInput
              placeholder="Add a comment"
              style={{ height: height * 0.048, width: width * 0.78 }}
              onChangeText={(text) => props.onChangeText(text)}
            />
          </View>
          <TouchableOpacity
            onPress={() => props.onSend()}
            style={{
              // backgroundColor: "red",
              width: width * 0.08,
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons
              name="send"
              size={width * 0.07}
              color="grey"
            />
          </TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {props.comments.length >= 1 ? (
            props.comments.map((item, i) => {
              return (
                <View style={{ padding: width * 0.03 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      // backgroundColor: "red",
                    }}
                  >
                    <View style={{ width: width * 0.12 }}>
                      <Image
                        source={{
                          uri:
                            "https://images.pexels.com/photos/38196/pexels-photo-38196.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
                        }}
                        style={{
                          height: width * 0.09,
                          width: width * 0.09,
                          borderRadius: width * 0.15,
                        }}
                      />
                    </View>
                    <View>
                      <View
                        style={{
                          flexDirection: "row",
                          // backgroundColor: "green",
                          width: width * 0.7,
                        }}
                      >
                        <View>
                          <Text>{item.name}</Text>
                        </View>
                        <View style={{ paddingLeft: width * 0.02 }}>
                          <Text>{item.comment}</Text>
                        </View>
                      </View>
                      <View style={{ flexDirection: "row" }}>
                        <View>
                          <Text style={{ fontSize: width * 0.032 }}>24h</Text>
                        </View>
                        <TouchableOpacity style={{ marginLeft: width * 0.02 }}>
                          <Text
                            style={{
                              color: "grey",
                              fontSize: width * 0.032,
                            }}
                          >
                            1 Like
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginLeft: width * 0.02 }}>
                          <Text
                            style={{
                              color: "grey",
                              fontSize: width * 0.032,
                            }}
                          >
                            Reply
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              );
            })
          ) : (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text>No Comments </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </Animated.View>
  );
};
