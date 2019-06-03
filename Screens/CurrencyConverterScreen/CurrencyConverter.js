import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Keyboard,
  Platform,
  LayoutAnimation
} from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";
import CommonRate from "./Components/CommonRate";
import constants from "../../constants/constants";
import CurrencySelector from "./Components/CurrencySelector";
import XSensorPlaceholder from "../../CommonComponents/XSensorPlaceholder/XSensorPlaceholder";
import { inject, observer } from "mobx-react/custom";
import Icon from "../../CommonComponents/Icon/Icon";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import { recordEvent } from "../../Services/analytics/analyticsService";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import LineProgressBar from "../../CommonComponents/LineProgressBar/LineProgressBar";

@ErrorBoundary()
@inject("appState")
@observer
class CurrencyConverter extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <CommonHeader
          leftAction={() => {
            Keyboard.dismiss();
            navigation.goBack();
          }}
          title={"Currency Calculator"}
          navigation={navigation}
        />
      )
    };
  };

  state = {
    nativeAmount: 0,
    foreignAmount: 0,
    nativeCurrency: "USDUSD",
    foreignCurrency: "USDINR",
    keyboardSpace: 0,
    isKeyboardVisible: false,
    isSelectorActive: false
  };
  keyboardDidShowListener = {};
  keyboardDidHideListener = {};
  _inputFieldRef = React.createRef();

  keyboardDidShow = e => {
    this.setState({
      keyboardSpace: isIphoneX()
        ? e.endCoordinates.height - constants.xSensorAreaHeight
        : e.endCoordinates.height,
      isKeyboardVisible: true
    });
  };

  keyboardAppeared = () => {
    this.setState({
      isKeyboardVisible: true
    });
  };

  keyboardDidHide = () => {
    this.setState({
      keyboardSpace: 0,
      isKeyboardVisible: false
    });
  };

  componentDidMount() {
    this.keyboardDidShowListener =
      Platform.OS === "ios"
        ? Keyboard.addListener("keyboardWillChangeFrame", this.keyboardDidShow)
        : Keyboard.addListener("keyboardDidShow", this.keyboardAppeared);
    this.keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      this.keyboardDidHide
    );
    const { getConversionRates, loadCurrencies } = this.props.appState;
    getConversionRates();
    loadCurrencies();
    this.setDefaultCurrency();
    /**
     * keyboard should wait 1 second after screen mounted to appear
     * default screen transition time 600ms
     * Some android devices are crashing when keyboard appears during transition
     */
    setTimeout(() => {
      this._inputFieldRef.current.focus && this._inputFieldRef.current.focus();
    }, 1000);
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
    this._inputFieldRef.current.blur();
  }

  setDefaultCurrency = () => {
    const { currencies } = this.props.appState;
    if (currencies.length) {
      this.setState({
        nativeCurrency: `USD${currencies[0]}`
      });
    } else {
      setTimeout(() => {
        this.setDefaultCurrency();
      }, 500);
    }
  };

  setAmount = foreignAmount => {
    if (!foreignAmount) this.setState({ foreignAmount: 0 });
    else {
      if (foreignAmount.substr(-1) === ".") {
        this.setState({ foreignAmount });
      } else {
        const formattedNumber = parseFloat(foreignAmount);
        if (formattedNumber !== "NaN") {
          this.setState({ foreignAmount: formattedNumber });
        }
      }
    }
  };

  openSelector = type => {
    if (type === "foreign") {
      recordEvent(constants.currencyConverterChangeCurrencyForeignClick);
    } else if (type === "native") {
      recordEvent(constants.currencyConverterChangeCurrencyNativeClick);
    }
    this.setState({
      isSelectorActive: type
    });
  };

  closeSelector = () => {
    this.setState({
      isSelectorActive: false
    });
  };

  swapCurrencies = () => {
    recordEvent(constants.currencyConverterSwapCurrencyClick);
    this.setState({
      nativeCurrency: this.state.foreignCurrency,
      foreignCurrency: this.state.nativeCurrency
    });
  };

  selectForeignCurrency = currency => {
    recordEvent(constants.currencyConverterSelectCurrencyClick);
    this.setState({
      foreignCurrency: currency
    });
  };

  selectNativeCurrency = currency => {
    recordEvent(constants.currencyConverterSelectCurrencyClick);
    this.setState({
      nativeCurrency: currency
    });
  };

  render() {
    if (Platform.OS === "ios") {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }

    const foreignCurrency = this.state.foreignCurrency.substr(3);
    const nativeCurrency = this.state.nativeCurrency.substr(3);

    const {
      currencyConverter,
      conversionRates,
      isConversionLoading
    } = this.props.appState;

    /**
     * TODO: Dynamic suggested rates using user's previous info
     */
    const currencyRates = [
      {
        nativeAmount: 5,
        nativeCurrency,
        foreignAmount: currencyConverter({
          amount: 5,
          from: this.state.nativeCurrency,
          to: this.state.foreignCurrency
        }),
        foreignCurrency
      },
      {
        nativeAmount: 10,
        nativeCurrency,
        foreignAmount: currencyConverter({
          amount: 10,
          from: this.state.nativeCurrency,
          to: this.state.foreignCurrency
        }),
        foreignCurrency
      },
      {
        nativeAmount: 22,
        nativeCurrency,
        foreignAmount: currencyConverter({
          amount: 22,
          from: this.state.nativeCurrency,
          to: this.state.foreignCurrency
        }),
        foreignCurrency
      },
      {
        nativeAmount: 50,
        nativeCurrency,
        foreignAmount: currencyConverter({
          amount: 50,
          from: this.state.nativeCurrency,
          to: this.state.foreignCurrency
        }),
        foreignCurrency
      },
      {
        nativeAmount: 130,
        nativeCurrency,
        foreignAmount: currencyConverter({
          amount: 130,
          from: this.state.nativeCurrency,
          to: this.state.foreignCurrency
        }),
        foreignCurrency
      }
    ];

    const outputAmount = currencyConverter({
      amount: this.state.foreignAmount,
      from: this.state.nativeCurrency,
      to: this.state.foreignCurrency
    });
    const outputText = outputAmount.toString();
    let outputFontSize;
    if (outputText.length <= 5) {
      outputFontSize = 80;
    } else if (outputText.length <= 9) {
      outputFontSize = 40;
    } else {
      outputFontSize = 30;
    }

    const inputAmountText = this.state.foreignAmount.toString();
    let inputFontSize;
    if (inputAmountText.length <= 5) {
      inputFontSize = 60;
    } else {
      inputFontSize = 40;
    }

    const { currencies } = this.props.appState;

    return [
      <CurrencySelector
        currenciesList={currencies}
        key={0}
        nativeCurrency={nativeCurrency}
        foreignCurrency={foreignCurrency}
        isVisible={!!this.state.isSelectorActive}
        mode={this.state.isSelectorActive}
        onClose={this.closeSelector}
        selectCurrency={currency => {
          if (this.state.isSelectorActive === "foreign") {
            this.selectForeignCurrency(currency);
          } else {
            this.selectNativeCurrency(currency);
          }
        }}
      />,
      <TouchableWithoutFeedback
        key={1}
        onPress={Keyboard.dismiss}
        style={styles.container}
      >
        <View style={styles.container}>
          <LineProgressBar isVisible={isConversionLoading} />
          {!this.state.foreignAmount
            ? currencyRates.map((currency, index) => {
                return (
                  <CommonRate
                    key={index}
                    componentStyle={{ marginHorizontal: 24 }}
                    foreignAmount={currency.foreignAmount}
                    foreignCurrency={currency.foreignCurrency}
                    nativeAmount={currency.nativeAmount}
                    nativeCurrency={currency.nativeCurrency}
                  />
                );
              })
            : null}

          <View style={styles.conversionContainer}>
            <View style={styles.outputContainer}>
              {this.state.foreignAmount ? (
                <View style={styles.outputTextBoxContainer}>
                  <Text
                    style={[styles.outputText, { fontSize: outputFontSize }]}
                  >
                    {outputAmount}
                  </Text>
                </View>
              ) : (
                <View style={styles.currentRateInfo}>
                  <Text
                    style={styles.currentRateHeading}
                  >{`Today's Conversion Rate`}</Text>
                  <Text
                    style={styles.currentRateText}
                  >{`1.00 ${nativeCurrency} = ${currencyConverter({
                    amount: 1,
                    from: this.state.nativeCurrency,
                    to: this.state.foreignCurrency
                  })} ${foreignCurrency}`}</Text>
                </View>
              )}
              <TouchableHighlight
                onPress={() => this.openSelector("foreign")}
                underlayColor={"transparent"}
                style={styles.outputInfoContainer}
              >
                <View style={styles.outputInfoContainer}>
                  <Text style={styles.outputCurrencyName}>
                    {this.state.foreignCurrency.substr(3)}
                  </Text>
                  <View style={styles.iconIndicatorContainerOutput}>
                    <Icon
                      name={constants.dropDownArrowIcon}
                      size={8}
                      color={constants.firstColor}
                    />
                  </View>
                </View>
              </TouchableHighlight>
            </View>

            <View
              style={[
                styles.inputContainer,
                { marginBottom: this.state.keyboardSpace }
              ]}
            >
              <View style={styles.textBoxContainer}>
                <TextInput
                  style={[styles.textBox, { fontSize: inputFontSize }]}
                  onChangeText={this.setAmount}
                  value={inputAmountText}
                  keyboardType={"numeric"}
                  underlineColorAndroid={"transparent"}
                  ref={this._inputFieldRef}
                  keyboardAppearance={"dark"}
                />
              </View>
              <TouchableHighlight
                onPress={() => this.openSelector("native")}
                underlayColor={"transparent"}
                style={styles.infoContainer}
              >
                <View style={styles.infoContainer}>
                  <Text style={styles.currencyName}>
                    {this.state.nativeCurrency.substr(3)}
                  </Text>
                  <View style={styles.iconIndicatorContainerInput}>
                    <Icon
                      name={constants.dropDownArrowIcon}
                      size={8}
                      color={constants.firstColor}
                    />
                  </View>
                </View>
              </TouchableHighlight>
            </View>

            <TouchableHighlight
              underlayColor={constants.shade2}
              onPress={this.swapCurrencies}
              style={[
                styles.swapButton,
                {
                  bottom: this.state.isKeyboardVisible
                    ? 60 + this.state.keyboardSpace
                    : 60
                }
              ]}
            >
              <Icon name={constants.swapVertIcon} size={24} />
            </TouchableHighlight>
          </View>
          {isIphoneX() ? (
            <XSensorPlaceholder
              containerStyle={{
                backgroundColor: constants.firstColorBackground
              }}
            />
          ) : null}
        </View>
      </TouchableWithoutFeedback>
    ];
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },

  conversionContainer: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "flex-end",
    height: 80
  },

  outputContainer: {
    flexDirection: "row",
    height: 80,
    backgroundColor: "white",
    paddingHorizontal: 24
  },
  currentRateInfo: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center"
  },
  currentRateHeading: {
    ...constants.font10(constants.primaryLight),
    color: constants.black1
  },
  currentRateText: {
    ...constants.font17(constants.primaryLight),
    color: constants.black1
  },
  outputTextBoxContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  outputText: {
    height: 80,
    color: constants.black1,
    ...constants.fontCustom(constants.primaryLight, 80, 80)
  },
  outputInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8
  },
  iconIndicatorContainerOutput: { position: "absolute", top: 16, right: 0 },
  outputCurrencyName: {
    ...constants.font24(constants.primaryLight),
    margin: 8,
    fontWeight: "400",
    paddingBottom: 12, // 11 diff for circle margin, 5 for line height
    color: constants.firstColor
  },
  outputFlagImage: {
    height: 20,
    width: 30,
    marginBottom: 18 // 11 diff for circle margin
  },

  inputContainer: {
    flexDirection: "row",
    height: 80,
    backgroundColor: constants.firstColorBackground,
    paddingHorizontal: 24
  },
  textBoxContainer: {
    flex: 1
  },
  textBox: {
    flex: 1,
    ...constants.fontCustom(constants.primaryLight, 60, 60)
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8
  },
  iconIndicatorContainerInput: {
    position: "absolute",
    right: 0,
    top: 30
  },
  currencyName: {
    ...constants.font24(constants.primaryLight),
    margin: 8,
    fontWeight: "400",
    paddingTop: 16, // 11 diff for circle margin, 5 for line height
    color: constants.firstColor
  },
  flagImage: {
    height: 20,
    width: 30,
    marginTop: 11 // 11 diff for circle margin
  },

  swapButton: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: "white",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: constants.shade2,
    position: "absolute",
    bottom: 60,
    right: 28,
    alignItems: "center",
    justifyContent: "center"
  },
  swapIcon: {
    height: 24,
    width: 24
  }
});

export default CurrencyConverter;
