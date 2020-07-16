import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
// import ScrollBottomSheet from "react-native-scroll-bottom-sheet";
import RBSheet from "react-native-raw-bottom-sheet";

const windowHeight = Dimensions.get("window").width;

class BottomShe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 10,
    };
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          {/* <TouchableOpacity onPress={() => this.RBSheet.close()}>
            <Text>click</Text>
          </TouchableOpacity> */}
          <TouchableOpacity onPress={() => RBSheet[this.state.index].open()}>
            <Text>click</Text>
          </TouchableOpacity>
        </View>

        <RBSheet
          ref={(ref) => {
            RBSheet[this.state.index] = ref;
          }}
          height={300}
          openDuration={250}
          customStyles={{
            container: {
              //   justifyContent: "center",
              flex: 1,
              alignItems: "center",
              borderRadius: 20,
            },
          }}
        >
          <ScrollView
            style={{ flex: 1, backgroundColor: "red", width: windowHeight * 1 }}
          >
            <View style={{ height: 200 }}>
              <Text>hjhkjhkjhkjh</Text>
            </View>
            <View style={{ height: 200 }}>
              <Text>hjhkjhkjhkjh</Text>
            </View>
            <View style={{ height: 200 }}>
              <Text>hjhkjhkjhkjh</Text>
            </View>
          </ScrollView>
        </RBSheet>
      </View>
    );
  }
}

export default BottomShe;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    padding: 16,
    backgroundColor: "red",
    borderRadius: 20,
    // position: "absolute",
    zIndex: 1,
  },
  header: {
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHandle: {
    width: 40,
    height: 2,
    backgroundColor: "red",
    borderRadius: 4,
  },
  item: {
    padding: 20,
    justifyContent: "center",
    backgroundColor: "white",
    alignItems: "center",
    marginVertical: 10,
  },
});
