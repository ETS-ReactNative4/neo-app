import React from "react";
import { View, StyleSheet, Text, TextInput, Platform } from "react-native";
import constants from "../../../constants/constants";
import PropTypes from "prop-types";

const PasswordInput = ({ password, onEdit }) => {
  return (
    <View style={styles.passwordContainer}>
      <View style={styles.passwordInfoWrapper}>
        <Text style={styles.passwordInfoText}>ENTER YOUR PASSWORD</Text>
      </View>
      <View style={styles.passwordBox}>
        <TextInput
          onChangeText={onEdit}
          placeholder={"********"}
          value={password}
          style={styles.passwordInput}
          keyboardType={
            /* React Native Issue - https://github.com/facebook/react-native/issues/10678 */
            Platform.OS === "ios" ? "email-address" : "default"
          }
          underlineColorAndroid={"transparent"}
          returnKeyType={"done"}
          secureTextEntry={true}
        />
      </View>
    </View>
  );
};

PasswordInput.propTypes = {
  password: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  passwordContainer: {
    paddingHorizontal: 24
  },
  passwordInfoWrapper: {
    marginTop: 24
  },
  passwordInfoText: {
    color: "rgba(83,87,109,1)",
    ...constants.font13(constants.primaryLight)
  },
  passwordBox: {
    marginTop: 8,
    ...Platform.select({
      ios: {
        height: 48
      },
      android: {
        height: 64
      }
    }),
    borderBottomColor: constants.shade3,
    borderBottomWidth: 1
  },
  passwordInput: {
    flex: 1,
    ...Platform.select({
      ios: {
        fontFamily: constants.primaryLight,
        fontSize: 36,
        textAlign: "justify"
      },
      android: {
        fontFamily: constants.primaryLight,
        fontSize: 36,
        height: 64,
        textAlign: "justify"
      }
    }),
    color: constants.black2
  }
});

export default PasswordInput;
