import React, { Component, Fragment } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity
} from "react-native";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../Services/PropTypeValidation/forbidExtraProps";
import constants from "../../../constants/constants";
import { responsiveWidth } from "react-native-responsive-dimensions";
import _ from "lodash";
import CountryCodePicker from "../../MobileNumberScreen/Components/CountryCodePicker";
import ForexLabel from "./ForexLabel";

class ForexInputField extends Component {
  static propTypes = forbidExtraProps({
    label: PropTypes.string,
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    setRef: PropTypes.func,
    returnKeyType: PropTypes.string,
    onSubmitField: PropTypes.func,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onEdit: PropTypes.func,
    isMobileNumberField: PropTypes.bool,
    selectedCountryCode: PropTypes.string,
    onSelectCountryCode: PropTypes.func,
    keyboardType: PropTypes.string
  });

  state = {
    isCountryCodeModalVisible: false
  };

  showCountryCodeModal = () =>
    this.setState({ isCountryCodeModalVisible: true });

  hideCountryCodeModal = () =>
    this.setState({ isCountryCodeModalVisible: false });

  selectCountryCode = countryCode => {
    const { onSelectCountryCode = () => null } = this.props;
    this.setState({
      isCountryCodeModalVisible: false
    });
    onSelectCountryCode(countryCode);
  };

  render() {
    const {
      label = "",
      selectedCountryCode = "+91",
      containerStyle = {},
      setRef = () => null,
      returnKeyType = "done",
      onSubmitField = () => null,
      placeholder = "",
      value = "",
      onEdit = () => null,
      isMobileNumberField = false,
      keyboardType = "default"
    } = this.props;
    const { isCountryCodeModalVisible } = this.state;

    return (
      <Fragment>
        <CountryCodePicker
          isVisible={isCountryCodeModalVisible}
          onClose={this.hideCountryCodeModal}
          selectCountryCode={this.selectCountryCode}
        />
        <View style={[styles.forexInputContainer, containerStyle]}>
          <ForexLabel label={label} />
          <View style={styles.textInputWrapper}>
            {isMobileNumberField ? (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={this.showCountryCodeModal}
                style={styles.countryCodeTouchable}
              >
                <View style={styles.countryCodeTextWrapper}>
                  <Text style={styles.countryCodeText}>
                    {selectedCountryCode}
                  </Text>
                </View>
              </TouchableOpacity>
            ) : null}
            <TextInput
              ref={e => setRef(e)}
              onChangeText={text => onEdit(text)}
              placeholder={placeholder}
              value={value}
              placeholderTextColor={constants.shade5}
              style={[
                styles.forexInput,
                isMobileNumberField ? { marginLeft: 8 } : null,
                {
                  ...Platform.select({
                    ios: {
                      marginTop: value ? 3 : 0
                    }
                  })
                }
              ]}
              underlineColorAndroid={"transparent"}
              keyboardType={keyboardType}
              returnKeyType={returnKeyType}
              onSubmitEditing={onSubmitField}
              keyboardAppearance={"dark"}
            />
          </View>
        </View>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  forexInputContainer: {
    marginHorizontal: 24,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: constants.shade2
  },
  forexInput: {
    height: Platform.OS === constants.platformIos ? 32 : 44,
    ...constants.fontCustom(constants.primaryRegular, 20),
    color: constants.black1,
    minWidth: responsiveWidth(50)
  },
  textInputWrapper: {
    flexDirection: "row"
  },
  countryCodeTextWrapper: {
    alignItems: "center",
    justifyContent: "center",
    height: Platform.OS === constants.platformIos ? 32 : 44
  },
  countryCodeText: {
    ...constants.fontCustom(constants.primaryRegular, 20),
    color: constants.black1
  }
});

export default ForexInputField;
