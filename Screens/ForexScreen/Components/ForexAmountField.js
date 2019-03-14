import React, { Fragment, Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform
} from "react-native";
import PropTypes from "prop-types";
import Icon from "../../../CommonComponents/Icon/Icon";
import constants from "../../../constants/constants";
import ForexLabel from "./ForexLabel";
import CurrencySelector from "../../CurrencyConverterScreen/Components/CurrencySelector";
import forbidExtraProps from "../../../Services/PropTypeValidation/forbidExtraProps";

class ForexAmountField extends Component {
  static propTypes = forbidExtraProps({
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    selectedCurrency: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    currencies: PropTypes.array.isRequired,
    onSelectCurrency: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    hasError: PropTypes.bool
  });

  state = {
    isCurrencySelectorVisible: false
  };

  toggleCurrencySelector = () =>
    this.setState({
      isCurrencySelectorVisible: !this.state.isCurrencySelectorVisible
    });

  render() {
    const {
      containerStyle = {},
      selectedCurrency = "INR",
      label = "",
      amount = "",
      currencies = [],
      onSelectCurrency = () => null,
      onEdit = () => null,
      hasError
    } = this.props;
    const { isCurrencySelectorVisible } = this.state;

    return (
      <Fragment>
        <CurrencySelector
          title={"Required Currency"}
          currenciesList={currencies}
          nativeCurrency={selectedCurrency}
          isVisible={isCurrencySelectorVisible}
          mode={"native"}
          onClose={this.toggleCurrencySelector}
          selectCurrency={currency => onSelectCurrency(currency.substr(3))}
        />
        <View style={containerStyle}>
          <ForexLabel label={label} />
          <View style={styles.forexAmountContainer}>
            <TouchableOpacity
              onPress={this.toggleCurrencySelector}
              activeOpacity={0.8}
              style={[
                styles.countryCodeTextWrapper,
                hasError ? styles.hasError : {},
                styles.leftSection
              ]}
            >
              <Text style={styles.countryCodeText}>{selectedCurrency}</Text>
              <Icon
                name={constants.arrowDown}
                color={constants.shade2}
                size={8}
              />
            </TouchableOpacity>
            <View
              style={[
                styles.countryCodeTextWrapper,
                hasError ? styles.hasError : {},
                styles.rightSection
              ]}
            >
              <TextInput
                value={amount}
                style={styles.amountInputField}
                onChangeText={onEdit}
                underlineColorAndroid={"transparent"}
                keyboardType={"numeric"}
                keyboardAppearance={"dark"}
                placeholderTextColor={constants.shade5}
                placeholder={"--"}
              />
            </View>
          </View>
        </View>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  forexAmountContainer: {
    flexDirection: "row",
    marginTop: 8
  },
  countryCodeTextWrapper: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: constants.black2,
    height: 48,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center"
  },
  hasError: {
    borderColor: constants.thirdColor
  },
  leftSection: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderLeftWidth: StyleSheet.hairlineWidth,
    width: 60
  },
  rightSection: {
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderRightWidth: StyleSheet.hairlineWidth,
    width: 72
  },
  countryCodeText: {
    ...constants.fontCustom(constants.primaryRegular, 16),
    color: constants.black1,
    marginRight: 4
  },
  amountInputField: {
    ...constants.fontCustom(constants.primaryRegular, 16),
    color: constants.black1,
    height: 48,
    minWidth: 60,
    textAlign: "center",
    ...Platform.select({
      ios: {
        marginTop: 4
      }
    })
  }
});

export default ForexAmountField;
