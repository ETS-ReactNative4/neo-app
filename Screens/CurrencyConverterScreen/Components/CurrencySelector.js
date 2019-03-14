import React, { Component } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  Image,
  Text,
  SafeAreaView
} from "react-native";
import Modal from "react-native-modal";
import PropTypes from "prop-types";
import { isIphoneX } from "react-native-iphone-x-helper";
import constants from "../../../constants/constants";
import SelectionRow from "../../../CommonComponents/SelectionRow/SelectionRow";
import ModalHeader from "../../../CommonComponents/ModalHeader/ModalHeader";

class CurrencySelector extends Component {
  static propTypes = {
    isVisible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    selectCurrency: PropTypes.func.isRequired,
    currenciesList: PropTypes.array.isRequired,
    mode: PropTypes.oneOf([true, false, "native", "foreign"]).isRequired,
    foreignCurrency: PropTypes.string,
    title: PropTypes.string,
    nativeCurrency: PropTypes.string.isRequired
  };

  render() {
    const flagImage = constants.starterBackground;
    const {
      currenciesList,
      mode,
      nativeCurrency,
      foreignCurrency,
      title = "Output Currency"
    } = this.props;

    const selectCurrency = currency => {
      this.props.selectCurrency(currency);
      this.props.onClose();
    };

    const currencies = currenciesList.map(currency => {
      return {
        image: flagImage,
        name: currency,
        action: () => selectCurrency(`USD${currency}`)
      };
    });

    return (
      <Modal
        isVisible={this.props.isVisible}
        onBackButtonPress={this.props.onClose}
        style={{ margin: 0, backgroundColor: "white" }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.container}>
            <ModalHeader
              leftIcon={constants.closeIcon}
              leftButtonAction={this.props.onClose}
              title={title}
            />
            <ScrollView
              style={[
                styles.optionsContainer,
                { marginBottom: isIphoneX() ? 30 : 0 }
              ]}
            >
              {currencies.map((currency, index) => {
                if (mode === "native" && currency.name === foreignCurrency)
                  return null;
                if (mode === "foreign" && currency.name === nativeCurrency)
                  return null;
                return (
                  <SelectionRow
                    key={index}
                    disableImage={true}
                    text={currency.name}
                    action={currency.action}
                  />
                );
              })}

              {/*<SectionHeader*/}
              {/*sectionName={"MORE CURRENCIES"}*/}
              {/*containerStyle={{ marginTop: 40, marginBottom: 0 }}*/}
              {/*/>*/}

              {/*{currencies.map((currency, index) => {*/}
              {/*return (*/}
              {/*<SelectionRow*/}
              {/*key={index}*/}
              {/*disableImage={true}*/}
              {/*text={currency.name.substr(3)}*/}
              {/*action={currency.action}*/}
              {/*/>*/}
              {/*);*/}
              {/*})}*/}
            </ScrollView>
          </View>
        </SafeAreaView>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20
  },
  optionsContainer: {},
  flagImage: {
    height: 20,
    width: 30
  }
});

export default CurrencySelector;
