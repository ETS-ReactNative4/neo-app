import React, {
  Component,
} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  Keyboard,
  Platform,
  LayoutAnimation,
} from 'react-native';
import CommonRate from "./Components/CommonRate";
import constants from "../../constants/constants";

class CurrencyConverter extends Component {

  static navigationOptions = {
    title: 'Currency Calculator',
  };

  state = {
    nativeAmount: 0,
    foreignAmount: 0,
    nativeCurrency: '',
    foreignCurrency: '',
    keyboardSpace: 0,
    isKeyboardVisible: false,
  };
  keyboardDidShowListener = {};
  keyboardDidHideListener = {};

  keyboardDidShow = e => {
    this.setState({
      keyboardSpace: e.endCoordinates.height - constants.tabBarBottomHeight,
      isKeyboardVisible: true,
    });
  };

  keyboardAppeared = () => {
    this.setState({
      isKeyboardVisible: true,
    });
  };

  keyboardDidHide = () => {
    this.setState({
      keyboardSpace: 0,
      isKeyboardVisible: false,
    });
  };

  componentDidMount() {
    this.keyboardDidShowListener = Platform.OS === 'ios'
      ?
        Keyboard.addListener('keyboardWillChangeFrame', this.keyboardDidShow)
      :
        Keyboard.addListener('keyboardDidShow', this.keyboardAppeared);
    this.keyboardDidHideListener = Keyboard.addListener( Platform.OS === 'ios' ?'keyboardWillHide' :'keyboardDidHide', this.keyboardDidHide);
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  componentWillUpdate() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }

  setAmount = foreignAmount => {
    if(!foreignAmount) this.setState({foreignAmount: 0});
    else {
      if(foreignAmount.substr(-1) === '.') {
        this.setState({foreignAmount});
      } else {
        const formattedNumber = parseFloat(foreignAmount);
        if(formattedNumber !== 'NaN') {
          this.setState({foreignAmount: formattedNumber});
        }
      }
    }
  };

  render() {

    const currencyRates = [
      {
        foreignAmount: 22,
        foreignCurrency: 'EUR',
        nativeAmount: 1000,
        nativeCurrency: 'INR',
      },
      {
        foreignAmount: 22,
        foreignCurrency: 'EUR',
        nativeAmount: 1000,
        nativeCurrency: 'INR',
      },
      {
        foreignAmount: 22,
        foreignCurrency: 'EUR',
        nativeAmount: 1000,
        nativeCurrency: 'INR',
      },
      {
        foreignAmount: 22,
        foreignCurrency: 'EUR',
        nativeAmount: 1000,
        nativeCurrency: 'INR',
      },
      {
        foreignAmount: 22,
        foreignCurrency: 'EUR',
        nativeAmount: 1000,
        nativeCurrency: 'INR',
      },
    ];

    return(
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={styles.container}>
        <View style={styles.container}>
          {
            !this.state.isKeyboardVisible
            ?
              currencyRates.map((currency, index) => {
                return (
                  <CommonRate
                    key={index}
                    componentStyle={{marginHorizontal: 24}}
                    foreignAmount={currency.foreignAmount}
                    foreignCurrency={currency.foreignCurrency}
                    nativeAmount={currency.nativeAmount}
                    nativeCurrency={currency.nativeCurrency}
                  />
                )
              })
            :
              null
          }

          <View style={styles.conversionContainer}>

            <View style={styles.outputContainer}>
              <View style={styles.outputTextBoxContainer}>
                <Text style={styles.outputText}>{this.state.nativeAmount}</Text>
              </View>
              <View style={styles.outputInfoContainer}>
                <Text style={styles.outputCurrencyName}>EUR</Text>
                <Image style={styles.outputFlagImage} source={constants.starterBackground}/>
              </View>
            </View>

            <View style={[styles.inputContainer, {marginBottom: this.state.keyboardSpace}]}>
              <View style={styles.textBoxContainer}>
                <TextInput
                  style={styles.textBox}
                  onChangeText={this.setAmount}
                  value={this.state.foreignAmount.toString()}
                  keyboardType={'numeric'}
                  underlineColorAndroid={'transparent'}
                />
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.currencyName}>EUR</Text>
                <Image style={styles.flagImage} source={constants.starterBackground}/>
              </View>
            </View>

          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },


  conversionContainer: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-end',
    height: 80,
  },

  outputContainer: {
    flexDirection: 'row',
    height: 80,
    backgroundColor: 'white',
    paddingHorizontal: 24,
  },
  outputTextBoxContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  outputText: {
    height: 60,
    ...constants.fontCustom(constants.primaryLight, 60, 60),
  },
  outputInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  outputCurrencyName: {
    ...constants.font24(constants.primaryLight),
    margin: 8,
    fontWeight: "400",
    paddingBottom: 16, // 11 diff for circle margin, 5 for line height
    color: "rgba(255,87,109,1)",
  },
  outputFlagImage: {
    height: 20,
    width: 30,
    marginBottom: 20, // 11 diff for circle margin
  },

  inputContainer: {
    flexDirection: 'row',
    height: 80,
    backgroundColor: constants.shade5,
    paddingHorizontal: 24,
  },
  textBoxContainer: {
    flex: 1,
  },
  textBox: {
    flex: 1,
    ...constants.fontCustom(constants.primaryLight, 60, 60),
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  currencyName: {
    ...constants.font24(constants.primaryLight),
    margin: 8,
    fontWeight: "400",
    paddingTop: 16, // 11 diff for circle margin, 5 for line height
    color: "rgba(255,87,109,1)",
  },
  flagImage: {
    height: 20,
    width: 30,
    marginTop: 11, // 11 diff for circle margin
  }
});

export default CurrencyConverter;
