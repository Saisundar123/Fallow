import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import axios from "axios";
import { url } from "./Main";

export default class BottomShe extends Component {
  click = () => {
    // console.log(url, "url");
    const video = "profile/photo_1594366556066_5_6071096492356010209.mp4";
    const urls = video.split("/")[1];

    axios
      .post(
        `${url}api/audio/convert`,
        {
          to: "mp3",
          videoName: urls,
        },

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(async (res) => {
        console.log(res.data, "kkkkkkk");
      })
      .catch((err) => console.log(err, "err"));
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button title="click" onPress={() => this.click()} />
      </View>
    );
  }
}

// import React, { Component } from "react";
// import {
//   View,
//   Text,
//   Button,
//   Dimensions,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
// } from "react-native";
// // import ScrollBottomSheet from "react-native-scroll-bottom-sheet";
// import RBSheet from "react-native-raw-bottom-sheet";

// const windowHeight = Dimensions.get("window").width;

// class BottomShe extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       index: 10,
//     };
//   }
//   render() {
//     return (
//       <View style={{ flex: 1 }}>
//         <View style={{ flex: 1, justifyContent: "center" }}>
//           {/* <TouchableOpacity onPress={() => this.RBSheet.close()}>
//             <Text>click</Text>
//           </TouchableOpacity> */}
//           <TouchableOpacity onPress={() => RBSheet[this.state.index].open()}>
//             <Text>click</Text>
//           </TouchableOpacity>
//         </View>

//         <RBSheet
//           ref={(ref) => {
//             RBSheet[this.state.index] = ref;
//           }}
//           height={300}
//           openDuration={250}
//           customStyles={{
//             container: {
//               //   justifyContent: "center",
//               flex: 1,
//               alignItems: "center",
//               borderRadius: 20,
//             },
//           }}
//         >
//           <ScrollView
//             style={{ flex: 1, backgroundColor: "red", width: windowHeight * 1 }}
//           >
//             <View style={{ height: 200 }}>
//               <Text>hjhkjhkjhkjh</Text>
//             </View>
//             <View style={{ height: 200 }}>
//               <Text>hjhkjhkjhkjh</Text>
//             </View>
//             <View style={{ height: 200 }}>
//               <Text>hjhkjhkjhkjh</Text>
//             </View>
//           </ScrollView>
//         </RBSheet>
//       </View>
//     );
//   }
// }

// export default BottomShe;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   contentContainerStyle: {
//     padding: 16,
//     backgroundColor: "red",
//     borderRadius: 20,
//     // position: "absolute",
//     zIndex: 1,
//   },
//   header: {
//     alignItems: "center",
//     backgroundColor: "white",
//     paddingVertical: 20,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//   },
//   panelHandle: {
//     width: 40,
//     height: 2,
//     backgroundColor: "red",
//     borderRadius: 4,
//   },
//   item: {
//     padding: 20,
//     justifyContent: "center",
//     backgroundColor: "white",
//     alignItems: "center",
//     marginVertical: 10,
//   },
// });

// import React from "react";
// import { Text, View, Button, Vibration, Platform } from "react-native";
// import { Notifications } from "expo";
// import * as Permissions from "expo-permissions";
// import Constants from "expo-constants";

// export default class Draft extends React.Component {
//   state = {
//     expoPushToken: "",
//     notification: {},
//   };

//   registerForPushNotificationsAsync = async () => {
//     if (Constants.isDevice) {
//       const { status: existingStatus } = await Permissions.getAsync(
//         Permissions.NOTIFICATIONS
//       );
//       let finalStatus = existingStatus;
//       if (existingStatus !== "granted") {
//         const { status } = await Permissions.askAsync(
//           Permissions.NOTIFICATIONS
//         );
//         finalStatus = status;
//       }
//       if (finalStatus !== "granted") {
//         alert("Failed to get push token for push notification!");
//         return;
//       }
//       token = await Notifications.getExpoPushTokenAsync();
//       console.log(token, "token");
//       this.setState({ expoPushToken: token });
//     } else {
//       alert("Must use physical device for Push Notifications");
//     }

//     if (Platform.OS === "android") {
//       Notifications.createChannelAndroidAsync("default", {
//         name: "default",
//         sound: true,
//         priority: "max",
//         vibrate: [0, 250, 250, 250],
//       });
//     }
//   };

//   componentDidMount() {
//     this.registerForPushNotificationsAsync();
//     this._notificationSubscription = Notifications.addListener(
//       this._handleNotification
//     );
//   }

//   _handleNotification = (notification) => {
//     Vibration.vibrate();
//     console.log(notification);
//     this.setState({ notification: notification });
//   };

//   // Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/dashboard/notifications
//   sendPushNotification = async () => {
//     // console.log(this.state.expoPushToken, "exo");
//     const message = {
//       to: this.state.expoPushToken,
//       sound: "default",
//       title: "Fallow",
//       body: "The first Notification",
//       data: { data: "goes here" },
//       _displayInForeground: true,
//     };
//     const response = await fetch("https://exp.host/--/api/v2/push/send", {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Accept-encoding": "gzip, deflate",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(message),
//     });
//   };

//   render() {
//     return (
//       <View
//         style={{
//           flex: 1,
//           alignItems: "center",
//           justifyContent: "space-around",
//         }}
//       >
//         {/* <View style={{ alignItems: "center", justifyContent: "center" }}>
//           <Text>Origin: {this.state.notification.origin}</Text>
//           <Text>Data: {JSON.stringify(this.state.notification.data)}</Text>
//         </View> */}
//         <Button
//           title={"Press to Send Notification"}
//           onPress={() => this.sendPushNotification()}
//         />
//       </View>
//     );
//   }
// }

/*  TO GET PUSH RECEIPTS, RUN THE FOLLOWING COMMAND IN TERMINAL, WITH THE RECEIPTID SHOWN IN THE CONSOLE LOGS

    curl -H "Content-Type: application/json" -X POST "https://exp.host/--/api/v2/push/getReceipts" -d '{
      "ids": ["YOUR RECEIPTID STRING HERE"]
      }'
*/
