import React, { Component } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import PropTypes from "prop-types";

class AddCheckListItem extends Component {
  static propTypes = {};

  state = {
    item: ""
  };

  render() {
    return (
      <View>
        <TextInput value={this.state.item} placeholder={"Add your own item"} />
      </View>
    );
  }
}

export default AddCheckListItem;
