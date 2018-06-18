import React, { Component } from "react";
import { View, TextInput, StyleSheet, Keyboard } from "react-native";
import PropTypes from "prop-types";
import Icon from "../../../../../CommonComponents/Icon/Icon";
import constants from "../../../../../constants/constants";
import { isIphoneX } from "react-native-iphone-x-helper";

class AddCheckListItem extends Component {
  static propTypes = {};

  state = {
    item: "",
    keyboardSpace: 0
  };
  keyboardDidShowListener = {};
  keyboardDidHideListener = {};

  onEditText = e => {
    this.setState({
      item: e.target.value
    });
  };

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardWillChangeFrame",
      this.keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardWillHide",
      this.keyboardDidHide
    );
  }

  keyboardDidShow = e => {
    this.setState({
      keyboardSpace: -e.endCoordinates.height
    });
  };

  keyboardDidHide = () => {
    this.setState({
      keyboardSpace: 0
    });
  };

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  render() {
    return (
      <View
        style={[
          styles.addItemContainer,
          { marginTop: this.state.keyboardSpace }
        ]}
      >
        <Icon name={constants.trainIcon} color={constants.shade5} size={16} />
        <TextInput
          style={styles.addItemInput}
          onChange={this.onEditText}
          returnKeyType={"done"}
          underlineColorAndroid={"transparent"}
          value={this.state.item}
          placeholder={"Add your own item"}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  addItemContainer: {
    flex: 1,
    height: 40,
    marginTop: 8,
    marginBottom: 16,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white"
  },
  addItemInput: {
    flex: 1,
    marginLeft: 16,
    height: 40,
    ...constants.fontCustom(constants.primaryLight, 17),
    color: constants.black2
  }
});

export default AddCheckListItem;
