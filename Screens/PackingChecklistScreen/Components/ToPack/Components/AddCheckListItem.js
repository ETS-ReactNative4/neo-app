import React, { Component } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import Icon from "../../../../../CommonComponents/Icon/Icon";
import constants from "../../../../../constants/constants";
import { isIphoneX } from "react-native-iphone-x-helper";
import forbidExtraProps from "../../../../../Services/PropTypeValidation/forbidExtraProps";
import { recordEvent } from "../../../../../Services/analytics/analyticsService";

class AddCheckListItem extends Component {
  static propTypes = forbidExtraProps({
    addListItem: PropTypes.func.isRequired
  });

  state = {
    item: ""
  };

  onEditText = item => {
    this.setState({
      item
    });
  };

  done = () => {
    this.refs._addCheckListInput.blur();
    if (this.state.item) {
      this.props.addListItem(this.state.item);
      this.setState({
        item: ""
      });
    }
  };

  render() {
    return (
      <View
        style={[
          styles.addItemContainer,
          this.state.item
            ? {
                borderTopWidth: 1,
                borderTopColor: constants.black2,
                borderBottomWidth: 1,
                borderBottomColor: constants.black2
              }
            : {}
        ]}
      >
        <Icon
          name={constants.checkBoxIcon}
          color={constants.shade5}
          size={16}
        />
        <TextInput
          style={styles.addItemInput}
          ref={"_addCheckListInput"}
          onChangeText={this.onEditText}
          returnKeyType={"done"}
          onSubmitEditing={() => {
            recordEvent(constants.packingChecklistAddItemClickKeyboard);
            this.done();
          }}
          underlineColorAndroid={"transparent"}
          value={this.state.item}
          placeholder={"Add your own item"}
        />
        {this.state.item ? (
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => {
              recordEvent(constants.packingChecklistAddItemClick);
              this.done();
            }}
          >
            <View style={styles.closeButtonTransform}>
              <Icon
                name={constants.closeIcon}
                color={constants.firstColor}
                size={16}
              />
            </View>
          </TouchableOpacity>
        ) : null}
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
  },
  closeButton: {
    height: 16,
    width: 16,
    alignItems: "center",
    justifyContent: "center"
  },
  closeButtonTransform: {
    flex: 1,
    transform: [{ rotate: "45deg" }]
  }
});

export default AddCheckListItem;
