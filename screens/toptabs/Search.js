import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { EvilIcons, MaterialIcons } from "@expo/vector-icons";
import { Card } from "native-base";
import axios from "axios";
import { url } from "../Main";

const { height, width } = Dimensions.get("window");

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      text: "",
      usersData: [],
    };
  }

  componentDidMount() {
    // console.log(this.props.route.params.search, "params");
    this.getApiData();
  }
  getApiData = () => {
    axios
      .get(
        `${url}api/getallUsers`,

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(async (res) => {
        if (res.data.status == 200) {
          await res.data.users.map((item, i) => {
            item.id = i.toString();
          });
          this.setState({ data: res.data.users });
          // console.log(res.data.users, "data");
        }
      })
      .catch((err) => console.log(err, "err"));
  };

  searchUser = (text) => {
    const datas = this.state.data.filter(function (item) {
      return item.fullname.toLowerCase() == text.toLowerCase();
    });
    this.setState({ usersData: datas });
    // console.log(datas);
  };

  openUser = (id) => {
    this.props.navigation.navigate("userProfile", {
      userid: id,
    });
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 0.23,
            backgroundColor: "#5579f1",
            paddingLeft: width * 0.08,
          }}
        >
          <View
            style={{ paddingBottom: width * 0.06, paddingTop: width * 0.04 }}
          >
            <Text style={{ color: "#fff", fontSize: width * 0.1 }}>
              Discover
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              height: height * 0.06,
              width: width * 0.8,
              borderRadius: width * 0.06,
              backgroundColor: "#fff",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                width: width * 0.1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <EvilIcons name="search" size={width * 0.05} />
            </View>
            <View style={{ width: width * 0.7 }}>
              <TextInput
                placeholder="Search"
                onChangeText={(text) => this.searchUser(text)}
              />
            </View>
          </View>
        </View>

        <View style={{ flex: 0.77 }}>
          <FlatList
            data={this.state.usersData}
            renderItem={({ item, index }) => {
              // console.log(item, "items");
              return (
                <TouchableOpacity onPress={() => this.openUser(item._id)}>
                  <Card
                    style={{
                      flexDirection: "row",
                      padding: width * 0.02,
                      width: width * 0.95,
                      alignSelf: "center",
                      borderRadius: width * 0.02,
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <View>
                      <Image
                        source={{
                          uri: url + item.profileImage,
                        }}
                        style={{
                          height: width * 0.15,
                          width: width * 0.15,
                          borderRadius: width * 0.2,
                        }}
                      />
                    </View>
                    <View
                      style={{
                        width: width * 0.5,
                        // backgroundColor: "red",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{ fontSize: width * 0.04, fontWeight: "bold" }}
                      >
                        {item.fullname}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={{
                        padding: width * 0.03,
                        borderRadius: width * 0.02,
                        backgroundColor: "green",
                      }}
                    >
                      <MaterialIcons
                        name="person-add"
                        size={width * 0.05}
                        color="#fff"
                      />
                    </TouchableOpacity>
                  </Card>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    );
  }
}

export default Search;
