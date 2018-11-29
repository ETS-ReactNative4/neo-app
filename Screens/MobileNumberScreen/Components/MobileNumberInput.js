import React from "react";
import {
  View,
  StyleSheet,
  TouchableHighlight,
  Text,
  Image,
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
        hasError ? { borderBottomColor: "red" } : {}
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
              size={16}
            />
          </View>
        </View>
      </TouchableHighlight>
      <View style={styles.numberInputBox}>
        <TextInput
          ref={e => mobileInputRef(e)}
          onChangeText={editMobileNumber}
          placeholder={"1234567890"}
          value={mobileNumber}
          placeholderTextColor={constants.shade5}
          style={styles.numberInput}
          keyboardType={"phone-pad"}
          maxLength={10}
          underlineColorAndroid={"transparent"}
          returnKeyType={"next"}
          editable={!isMobileVerified}
          onSubmitEditing={() => {
            recordEvent(constants.mobileNumberKeyboardClick);
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
  mobileInputRef: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  mobileNumberBox: {
    marginTop: 8,
    marginHorizontal: 24,
    height: 48,
    borderBottomColor: constants.shade3,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "center"
  },
  countryCodeBox: {
    alignItems: "center",
    flexDirection: "row"
  },
  countryCodeTextWrapper: {
    ...Platform.select({
      ios: {
        height: 36,
        paddingTop: 5
      },
      android: {
        height: 48
      }
    })
  },
  countryCodeText: {
    fontFamily: constants.primaryLight,
    textAlign: "justify",
    color: constants.black2,
    ...Platform.select({
      ios: {
        fontSize: 36
      },
      android: {
        fontSize: 30
      }
    })
  },
  dropDownIconContainer: {
    height: 16,
    width: 16,
    marginHorizontal: 8,
    ...Platform.select({
      ios: {
        marginTop: 8
      },
      android: {}
    })
  },
  numberInputBox: {
    flex: 1
  },
  numberInput: {
    ...Platform.select({
      ios: {
        fontFamily: constants.primaryLight,
        fontSize: 36,
        textAlign: "justify"
      },
      android: {
        fontFamily: constants.primaryLight,
        fontSize: 36,
        height: 56,
        textAlign: "justify"
      }
    }),
    color: constants.black2
  }
});

export default MobileNumberInput;
