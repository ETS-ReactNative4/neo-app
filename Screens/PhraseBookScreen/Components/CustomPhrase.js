import React, { Component } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";
import XSensorPlaceholder from "../../../CommonComponents/XSensorPlaceholder/XSensorPlaceholder";
import constants from "../../../constants/constants";
import SimpleButton from "../../../CommonComponents/SimpleButton/SimpleButton";

class CustomPhrase extends Component {
  state = {
    customPhrase: ""
  };

  onEditText = e => {
    this.setState({
      customPhrase: e.target.value
    });
  };

  render() {
    return (
      <View>
        <View style={styles.customPhraseContainer}>
          <TextInput
            style={styles.customPhraseInput}
            onChange={this.onEditText}
            returnKeyType={"done"}
            underlineColorAndroid={"transparent"}
            value={this.state.customPhrase}
            placeholder={"Or, type a custom message"}
          />
          <SimpleButton
            text={"SPA"}
            action={() => null}
            containerStyle={{
              backgroundColor: "white",
              width: 32,
              marginLeft: 16
            }}
            textColor={constants.firstColor}
          />
        </View>
        {isIphoneX() ? <XSensorPlaceholder /> : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  customPhraseContainer: {
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24
  },
  customPhraseInput: {
    flex: 1,
    height: 32,
    backgroundColor: constants.shade5,
    borderRadius: 7,
    paddingHorizontal: 8,
    ...constants.fontCustom(constants.primaryLight, 15),
    color: constants.shade2
  }
});

export default CustomPhrase;
