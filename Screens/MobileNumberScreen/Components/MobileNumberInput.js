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

const MobileNumberInput = ({
  hasError,
  showCountryCodeModal,
  countryCode,
  editMobileNumber,
  mobileNumber,
  isMobileVerified
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
          <Image style={styles.dropDownIcon} source={constants.dropDownArrow} />
        </View>
      </TouchableHighlight>
      <View style={styles.numberInputBox}>
        <TextInput
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
  isMobileVerified: PropTypes.bool.isRequired
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
  dropDownIcon: {
    height: 20,
    width: 20,
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
