import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Entypo, AntDesign } from "@expo/vector-icons";

const { height, width } = Dimensions.get("window");

class Profile extends Component {
  render() {
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
                height: width * 0.2,
                width: width * 0.2,
                borderRadius: width * 0.4,
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

        <View style={{ flexDirection: "row" }}>
          <SpecialTags number="0" name="Posts" />
          <SpecialTags number="0" name="Followers" />
          <SpecialTags number="0" name="Following" />
        </View>
        <View
          style={{
            paddingTop: height * 0.01,
            borderBottomWidth: 5,
            borderBottomColor: "#eeeeee",
          }}
        >
          <TouchableOpacity
            style={{
              height: height * 0.05,
              width: width * 0.9,
              borderRadius: width * 0.02,
              borderColor: "green",
              borderWidth: 2,
              alignSelf: "center",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text>EDIT PROFILE</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          <RecentPosts />
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
                "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAI4AXwMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAABwEDBAUGAgj/xAA2EAABAwMCBAQDBAsAAAAAAAABAAIDBAUREiEGBzFBE1FhgRQioSNicdEIFTJCQ5GSsbLh8P/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AUdsAaPl7LaQW7GPlW3pqMADZZ0dNjsqjURW8eSym0IA6L1fLjHZaETujEksjxHDFq063kE7nsAAST2AK4U8z5Zo6g0NJA+OkYXzTSv0CTf5QweZ26oOtra+1W54ZX19NTvPRskgBPt1Wk4g45sFleyJr3Vsjma8U+C0ZGwLugJUHVtVNWVU1TVPMk8ry97ndyVZycY7KKkZ3Neq0vDbTT6y7LT4rsBvkRjc+q2EnNKhFHE9ltmfWOB8SPUGsafQ7kqKEQT5w7xVZ+ICIqWbw6rGTTyjS727O9lvZKbI6L5qp55aadk9PI6OWN2pr2HBB/FSVwrzMrn1kNLd4WTxyyhniMBDm5299+yo7uqowQdloa+gBzt3XbTQhzcjDgRkEHII9Fqqum9ER1cVPgdFkCEBZhg0jovGlBEfOaKZ0EdRFqa6ieRp8TTmN7MF4HffZQu6R5Dm63aXO1OGep8/qVNvNa0Xq8V0FXaLd8ZT0OpkrHNY/WdicN6ny6Z8vNQ3dYmQ1ssTIfALHYdF4mvS7uAfz381FYSIiAiIgKo6hURBN3KOskrbNUCSeWURua0+J2fgk4OTnt5b5XX1UajvkpZqjTU3d0h+HcXQNjyQCRpOryPXCkyqZsqjrHv1BWiAmVQoMf4OnbVuqmNLZXjD9LyA/sC5vQnG2SMqN+dlbaLdY5I20dG+73HEXi+G0yNja4OJJ69QMf6XU8ePvAt1JT2MAy1VW2GVvi+E50elxc1r/AN0nTjV2UQ80J6aOSKJlhdbQ9o+ymDGSRyNDg7GAdbDlh1ZwSD3yio6Koqk5KooCIiAiIgm/kY5zuGq5pzpbWnH9DV31Q3IXNcpKD4PgejeWhr6l75nY75dgZ9gF1krVUbnSqFquLyUGvulHJVRRGBzGzwTMmiL86SR1Bx2ILhntnuvnjmnZ+IKfiStuN5he6CeVxgmY/XGI8/K0HbGAQMED6r6UUZc/Y6k8K0UsLcwtqtExHUAtyPbLfoFFQCiIgIiIC3fB9gm4lv8AS22HIa92qZ4/hxj9o/8AdyFpR1X0Lyf4Zp7LYTXPfDJcawAzaHhxgZ1aw46HG5H5IO0gpYaOmipqaMRwwsDI2NGA1oGAF4lasp7ljylVG4IXkhX9IXlzcILOFznMKzG+8IXCiYMyaBJGM4+Zpz+a6UheJYmzRPjfnS9pacHBwRhB8aSNLJHMOCWkg46LypI4q5bUFjvEFvZxAJJagPlbA6D7RkTQSSSHYJ2ONhn0UcvAD3BudIO2oYPuoryiIgKVv0f3Sfrq7MBPhmlaXAdMh+39yopXS8C8X1nCV0E9OWupJnNFXDoBMjAex6gjJxug+mpAVjSArLjkiqYI54HtkhkaHse05DgRkFW5Gqo3ROFbc7K9FUxk4QWyuN5icf0nB1K2OKMVNymH2UORpZ95/p6d1p7xzmsdNUS0lHT1jpWOLfHliDWD1xnUf5BQrxld2Xu+SVrJnyhzGjW8EEnG/X1JUVi3O+XG6XOa5VlQ59ZM7U6Xv5YHkMbYWucS4knqVREBERAVRsVREG9sfF9/sUsBt90qWxQ7Np3yF0WM5I0HbB9FLvD3N6y3CIR3pj7dUAbuAMkTvwI3H4Ee6gVEH2pI5kcbpJHBjGAuc5xwAB1JUBce83brU3Ooo+GKptNbmHQ2oYz7SUjq4E9B5Y3Uhc67zJa+CaiCndiatIiJHUR5Go/UD3XzMguTzS1Er5p5HySvOpz3uJc4+ZJVtEQEREBERAREQEREEp877/8AGcQz2tj/AJKOKKPT945e4/4D2UWLacT1puXEVzrS/X41VI9rvu6jj6YWrQEREBERAREQEREBERAREQEREBERAREQEREBERB//9k=",
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
