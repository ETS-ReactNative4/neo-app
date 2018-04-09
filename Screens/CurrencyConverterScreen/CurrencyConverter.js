import React, {
  Component,
} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  Keyboard,
} from 'react-native';
import {
  NavigationActions,
} from 'react-navigation';
import CommonRate from "./Components/CommonRate";
import constants from "../../constants/constants";

class CurrencyConverter extends Component {

  static navigationOptions = {
    title: 'Currency Calculator',
  };

  state = {
    nativeAmount: '',
    foreignAmount: '',
    nativeCurrency: '',
    foreignCurrency: '',
    keyboardSpace: 0,
  };
  keyboardDidShowListener = {};
  keyboardDidHideListener = {};

  keyboardDidShow = e => {
    this.setState({
      keyboardSpace: e.endCoordinates.height - constants.tabBarBottomHeight,
    });
  };

  keyboardDidHide = () => {
    this.setState({
      keyboardSpace: 0,
    });
  };

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
  }

  componentWillUnmount() {

  }

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
      <View style={styles.container}>

        {
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
        }

        <View style={styles.conversionContainer}>
          <View style={[styles.inputContainer, {marginBottom: this.state.keyboardSpace}]}>
            <View style={styles.textBoxContainer}>
              <TextInput
                style={styles.textBox}
                onChangeText={foreignAmount => this.setState({foreignAmount})}
                value={this.state.foreignAmount}
                keyboardType={'numeric'}
              />
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.currencyName}>EUR</Text>
                <Image style={styles.flagImage} source={constants.starterBackground}/>
            </View>
          </View>
        </View>
      </View>
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
