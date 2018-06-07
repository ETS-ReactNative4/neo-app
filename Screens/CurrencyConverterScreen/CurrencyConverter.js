import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Image,
  Keyboard,
  Platform,
  LayoutAnimation
} from "react-native";
import { SafeAreaView } from "react-navigation";
import { isIphoneX } from "react-native-iphone-x-helper";
import CommonRate from "./Components/CommonRate";
import constants from "../../constants/constants";
import CurrencySelector from "./Components/CurrencySelector";
import XSensorPlaceholder from "../../CommonComponents/XSensorPlaceholder/XSensorPlaceholder";
import currencyConverter from "../../Services/currencyConversion/currencyConverter";

class CurrencyConverter extends Component {
  static navigationOptions = {
    title: "Currency Calculator",
    tabBarVisible: false
  };

  state = {
    nativeAmount: 0,
    foreignAmount: 0,
    nativeCurrency: "USDINR",
    foreignCurrency: "USDUSD",
    keyboardSpace: 0,
    isKeyboardVisible: false,
    isSelectorActive: false
  };
  keyboardDidShowListener = {};
  keyboardDidHideListener = {};

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
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  componentWillUpdate() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }

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

  openSelector = () => {
    this.setState({
      isSelectorActive: true
    });
  };

  closeSelector = () => {
    this.setState({
      isSelectorActive: false
    });
  };

  swapCurrencies = () => {
    this.setState({
      nativeCurrency: this.state.foreignCurrency,
      foreignCurrency: this.state.nativeCurrency
    });
  };

  selectCurrency = currency => {
    this.setState({
      foreignCurrency: currency
    });
  };

  render() {
    const foreignCurrency = this.state.foreignCurrency.substr(3);
    const nativeCurrency = this.state.nativeCurrency.substr(3);

    const currencyRates = [
      {
        foreignAmount: 5,
        foreignCurrency: this.state.foreignCurrency.substr(3),
        nativeAmount: currencyConverter(
          5,
          this.state.foreignCurrency,
          this.state.nativeCurrency
        ),
        nativeCurrency: this.state.nativeCurrency.substr(3)
      },
      {
        foreignAmount: 10,
        foreignCurrency: this.state.foreignCurrency.substr(3),
        nativeAmount: currencyConverter(
          10,
          this.state.foreignCurrency,
          this.state.nativeCurrency
        ),
        nativeCurrency: this.state.nativeCurrency.substr(3)
      },
      {
        foreignAmount: 22,
        foreignCurrency: this.state.foreignCurrency.substr(3),
        nativeAmount: currencyConverter(
          22,
          this.state.foreignCurrency,
          this.state.nativeCurrency
        ),
        nativeCurrency: this.state.nativeCurrency.substr(3)
      },
      {
        foreignAmount: 50,
        foreignCurrency: this.state.foreignCurrency.substr(3),
        nativeAmount: currencyConverter(
          50,
          this.state.foreignCurrency,
          this.state.nativeCurrency
        ),
        nativeCurrency: this.state.nativeCurrency.substr(3)
      },
      {
        foreignAmount: 130,
        foreignCurrency: this.state.foreignCurrency.substr(3),
        nativeAmount: currencyConverter(
          130,
          this.state.foreignCurrency,
          this.state.nativeCurrency
        ),
        nativeCurrency: this.state.nativeCurrency.substr(3)
      }
    ];

    return [
      <CurrencySelector
        key={0}
        isVisible={this.state.isSelectorActive}
        onClose={this.closeSelector}
        selectCurrency={this.selectCurrency}
      />,
      <TouchableWithoutFeedback
        key={1}
        onPress={Keyboard.dismiss}
        style={styles.container}
      >
        <View style={styles.container}>
          {!this.state.isKeyboardVisible
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
                  <Text style={styles.outputText}>
                    {currencyConverter(
                      this.state.foreignAmount,
                      this.state.nativeCurrency,
                      this.state.foreignCurrency
                    )}
                  </Text>
                </View>
              ) : (
                <View style={styles.currentRateInfo}>
                  <Text
                    style={styles.currentRateHeading}
                  >{`Today's Conversion Rate`}</Text>
                  <Text
                    style={styles.currentRateText}
                  >{`1.00 ${nativeCurrency} = ${currencyConverter(
                    1,
                    this.state.nativeCurrency,
                    this.state.foreignCurrency
                  )} ${foreignCurrency}`}</Text>
                </View>
              )}
              <TouchableHighlight
                onPress={this.openSelector}
                underlayColor={"transparent"}
                style={styles.outputInfoContainer}
              >
                <View style={styles.outputInfoContainer}>
                  <Text style={styles.outputCurrencyName}>
                    {this.state.foreignCurrency.substr(3)}
                  </Text>
                  <Image
                    style={styles.outputFlagImage}
                    source={constants.starterBackground}
                  />
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
                  style={styles.textBox}
                  onChangeText={this.setAmount}
                  value={this.state.foreignAmount.toString()}
                  keyboardType={"numeric"}
                  underlineColorAndroid={"transparent"}
                />
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.currencyName}>
                  {this.state.nativeCurrency.substr(3)}
                </Text>
                <Image
                  style={styles.flagImage}
                  source={constants.starterBackground}
                />
              </View>
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
              <Image
                source={constants.notificationIcon}
                style={styles.swapIcon}
              />
            </TouchableHighlight>
          </View>
          {isIphoneX() ? (
            <XSensorPlaceholder
              containerStyle={{ backgroundColor: constants.shade5 }}
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
    justifyContent: "center"
  },
  outputCurrencyName: {
    ...constants.font24(constants.primaryLight),
    margin: 8,
    fontWeight: "400",
    paddingBottom: 12, // 11 diff for circle margin, 5 for line height
    color: "rgba(255,87,109,1)"
  },
  outputFlagImage: {
    height: 20,
    width: 30,
    marginBottom: 18 // 11 diff for circle margin
  },

  inputContainer: {
    flexDirection: "row",
    height: 80,
    backgroundColor: constants.shade5,
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
    justifyContent: "center"
  },
  currencyName: {
    ...constants.font24(constants.primaryLight),
    margin: 8,
    fontWeight: "400",
    paddingTop: 16, // 11 diff for circle margin, 5 for line height
    color: "rgba(255,87,109,1)"
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
    borderWidth: 0.5,
    borderColor: constants.shade2,
    position: "absolute",
    bottom: 60,
    right: 48,
    alignItems: "center",
    justifyContent: "center"
  },
  swapIcon: {
    height: 24,
    width: 24
  }
});

export default CurrencyConverter;
