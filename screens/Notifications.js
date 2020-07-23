import React, { Component } from "react";
import { View, Text, Dimensions, TextInput, Image } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
const { height, width } = Dimensions.get("window");
import { Card } from "native-base";
import { TouchableOpacity } from "react-native-gesture-handler";

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [
        {
          id: "1",
          url:
            "https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
          title: "New Notification",
          hours: "1m ago",
          body:
            "Tjhkhhkjkjjjkljlkjjjkkkkbmbmbmcgyutyuyiuhhjkjjkcjkjakjlajljljllalsjljsljc",
          visible: false,
        },
        {
          id: "2",
          url:
            "https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
          title: "New Notification",
          hours: "1m ago",
          body:
            "Tjhkhhkjkjjjkljlkjjjkkkkbmbmbmcgyutyuyiuhhjkjjkcjkjakjlajljljllalsjljsljc",
          visible: false,
        },
        {
          id: "3",
          url:
            "https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
          title: "New Notification",
          hours: "10m ago",
          body:
            "Tjhkhhkjkjjjkljlkjjjkkkkbmbmbmcgyutyuyiuhhjkjjkcjkjakjlajljljllalsjljsljc",
          visible: false,
        },
        {
          id: "4",
          url:
            "https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
          title: "New Notification",
          hours: "2m ago",
          body:
            "Tjhkhhkjkjjjkljlkjjjkkkkbmbmbmcgyutyuyiuhhjkjjkcjkjakjlajljljllalsjljsljc",
          visible: false,
        },
        {
          id: "5",
          url:
            "https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
          title: "New Notification",
          hours: "3m ago",
          body:
            "Tjhkhhkjkjjjkljlkjjjkkkkbmbmbmcgyutyuyiuhhjkjjkcjkjakjlajljljllalsjljsljc",
          visible: false,
        },
      ],
    };
  }

  openCard = (i) => {
    const datas = [...this.state.notifications];
    datas[i].visible = !datas[i].visible;
    this.setState({ notifications: datas });
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            backgroundColor: "#5579f1",

            alignItems: "center",
            justifyContent: "flex-end",
            height: height * 0.13,
            marginBottom: width * 0.02,
          }}
        >
          <View
            style={{ paddingBottom: width * 0.04, paddingTop: width * 0.04 }}
          >
            <Text style={{ color: "#fff", fontSize: width * 0.07 }}>
              Notifications
            </Text>
          </View>
        </View>
        {this.state.notifications.length > 0 ? (
          this.state.notifications.map((item, i) => {
            return (
              <TouchableOpacity onPress={() => this.openCard(i)}>
                <Card
                  style={{
                    height: item.visible ? height * 0.18 : height * 0.08,
                    paddingTop: item.visible ? width * 0.02 : null,
                    width: width * 0.85,
                    borderRadius: width * 0.02,

                    alignSelf: "center",
                    // marginTop: width * 0.03,
                    justifyContent: item.visible ? null : "center",
                  }}
                >
                  <View
                    style={{
                      height: height * 0.06,
                      width: width * 0.8,
                      justifyContent: "space-around",
                      alignItems: "center",
                      flexDirection: "row",
                      alignSelf: "center",
                    }}
                  >
                    <View>
                      <Image
                        source={{
                          uri: item.url,
                        }}
                        style={{
                          height: width * 0.1,
                          width: width * 0.1,
                          borderRadius: width * 0.2,
                        }}
                      />
                    </View>
                    <View>
                      <Text
                        style={{ fontSize: width * 0.04, fontWeight: "bold" }}
                      >
                        {item.title}
                      </Text>
                    </View>
                    <View>
                      <Text>{item.hours}</Text>
                    </View>
                  </View>
                  {item.visible ? (
                    <View style={{ padding: width * 0.02 }}>
                      <Text
                        style={{ fontSize: width * 0.04 }}
                        numberOfLines={4}
                      >
                        {item.body}
                      </Text>
                    </View>
                  ) : null}
                </Card>
              </TouchableOpacity>
            );
          })
        ) : (
          <View>
            <Text style={{ fontSize: width * 0.04 }}>No Notifications</Text>
          </View>
        )}
      </View>
    );
  }
}

export default Notifications;
