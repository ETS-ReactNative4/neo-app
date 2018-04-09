import React, {
  Component,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import CommonRate from "./Components/CommonRate";

class CurrencyConverter extends Component {

  static navigationOptions = {
    title: 'Currency Calculator',
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
      <View style={styles.container}>
        {
          currencyRates.map((currency, index) => {
            return (
              <CommonRate
                key={index}
                foreignAmount={currency.foreignAmount}
                foreignCurrency={currency.foreignCurrency}
                nativeAmount={currency.nativeAmount}
                nativeCurrency={currency.nativeCurrency}
              />
            )
          })
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    flex: 1,
  },
});

export default CurrencyConverter;
