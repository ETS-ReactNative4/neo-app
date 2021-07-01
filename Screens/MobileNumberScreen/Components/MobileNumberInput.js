import React from "react";
import {
  View,
  StyleSheet,
  TouchableHighlight,
  Text,
  TextInput,
  Platform
} from "react-native";
import constants from "../../../constants/constants";
import PropTypes from "prop-types";
import { recordEvent } from "../../../Services/analytics/analyticsService";
import Icon from "../../../CommonComponents/Icon/Icon";

const MobileNumberInput = ({
  hasError,
  showCountryCodeModal,
  countryCode,
  editMobileNumber,
  mobileNumber,
  isMobileVerified,
  submitMobileNumber,
  mobileInputRef
}) => {
  return (
    <View
      style={[
        styles.mobileNumberBox,
        hasError ? styles.mobileNumberBoxError : null
      ]}
    >
      <TouchableHighlight
        onPress={showCountryCodeModal}
        underlayColor={"transparent"}
      >
        <View style={styles.countryCodeBox}>
          <View style={styles.countryCodeTextWrapper}>
            <Text style={styles.countryCodeText}>{countryCode}</Text>
          </View>
          <View style={styles.dropDownIconContainer}>
            <Icon
              name={constants.arrowDown}
              color={constants.shade2}
              size={8}
            />
          </View>
        </View>
      </TouchableHighlight>
      <View style={styles.numberInputBox}>
        <TextInput
          ref={mobileInputRef}
          onChangeText={editMobileNumber}
          placeholder={"9888888888"}
          value={mobileNumber}
          placeholderTextColor={constants.shade5}
          style={styles.numberInput}
          keyboardType={"phone-pad"}
          underlineColorAndroid={"transparent"}
          returnKeyType={"next"}
          editable={!isMobileVerified}
          onSubmitEditing={() => {
            recordEvent(constants.MobileNumber.event, {
              click: constants.MobileNumber.click.requestOtpKeyboard
            });
            submitMobileNumber();
          }}
          keyboardAppearance={"dark"}
        />
      </View>
    </View>
  );
};

MobileNumberInput.propTypes = {
  hasError: PropTypes.bool.isRequired,
  showCountryCodeModal: PropTypes.func.isRequired,
  countryCode: PropTypes.string.isRequired,
  editMobileNumber: PropTypes.func.isRequired,
  mobileNumber: PropTypes.string.isRequired,
  isMobileVerified: PropTypes.bool.isRequired,
  submitMobileNumber: PropTypes.func.isRequired,
  mobileInputRef: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  mobileNumberBox: {
    marginTop: 16,
    marginHorizontal: 24,
    height: 48,
    borderBottomColor: constants.shade4,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "center"
  },
  mobileNumberBoxError: { borderBottomColor: "red" },
  countryCodeBox: {
    alignItems: "center",
    flexDirection: "row"
  },
  countryCodeTextWrapper: {
    height: 36
  },
  countryCodeText: {
    fontFamily: constants.primaryLight,
    textAlign: "justify",
    color: constants.black2,
    fontSize: 36
  },
  dropDownIconContainer: {
    height: 8,
    width: 8,
    marginHorizontal: 8,
    marginTop: 8
  },
  numberInputBox: {
    flex: 1,
    height: 56
  },
  numberInput: {
    fontFamily: constants.primaryLight,
    fontSize: 36,
    textAlign: "justify",
    ...Platform.select({
      android: {
        height: 56
      }
    }),
    color: constants.black2
  }
});

export default MobileNumberInput;
