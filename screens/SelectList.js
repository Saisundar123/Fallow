import React, { Component } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import SelectableItem from "./SelectableItem";

export default class SelectList extends Component {
  constructor() {
    super();

    // this.handleOnPressItem = this.handleOnPressItem.bind(this);
    this.state = {
      selected: new Map(),
      data: [
        {
          id: "1",
          title: "hii",
        },
        {
          id: "2",
          title: "hiikjhj",
        },
        {
          id: "3",
          title: "hiiyg",
        },
      ],
    };
  }

  onPressItem(id) {
    this.setState((state) => {
      const selected = new Map(state.selected);
      selected.set(id, !selected.get(id));
      return { selected };
    });
  }

  renderItem({ item }) {
    // const { selected } = this.state;
    console.log(item, "klklk");

    return (
      <SelectableItem
        id={item.id}
        onPressItem={this.handleOnPressItem}
        selected={!!selected.get(item.id)}
        title={item.title}
      />
    );
  }

  render() {
    // const { data } = this.props;

    return (
      <FlatList
        data={this.state.data}
        extraData={this.state}
        keyExtractor={(item) => item.id}
        renderItem={this.renderItem}
      />
    );
  }
}
