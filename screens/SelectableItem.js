import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default class SelectableItem extends Component {
  constructor() {
    super();

    this.handleOnPress = this.handleOnPress.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    const { isSelected } = this.props;
    return isSelected !== nextProps.isSelected;
  }

  handleOnPress() {
    const { onPress } = this.props;
    onPress();
  }

  render() {
    const { isSelected, text } = this.props;
    const textColor = isSelected ? "blue" : "black";

    return (
      <TouchableOpacity
        onPress={this.handleOnPress}
        style={{ paddingBottom: 10, paddingTop: 10 }}
      >
        <View style={{ backgroundColor: "red" }}>
          <Text style={{ color: textColor }}>{text}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
