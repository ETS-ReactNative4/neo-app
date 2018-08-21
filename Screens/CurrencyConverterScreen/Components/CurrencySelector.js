import React, { Component } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Modal,
  TouchableHighlight,
  Image,
  Text,
  SafeAreaView
} from "react-native";
import PropTypes from "prop-types";
import { isIphoneX } from "react-native-iphone-x-helper";
import constants from "../../../constants/constants";
import SectionHeader from "../../../CommonComponents/SectionHeader/SectionHeader";
import Icon from "../../../CommonComponents/Icon/Icon";

const CurrencyRow = ({ image, text, action }) => {
  return (
    <TouchableHighlight
      underlayColor={"transparent"}
      onPress={action}
      style={styles.currencyRowTouchable}
    >
      <View style={styles.currencyRowContainer}>
        <Image style={styles.currencyRowFlagImage} source={image} />
        <Text style={styles.currencyName}>{text.substr(3)}</Text>
      </View>
    </TouchableHighlight>
  );
};

CurrencyRow.propTypes = {
  image: PropTypes.oneOfType([PropTypes.number, PropTypes.object]).isRequired,
  text: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired
};

class CurrencySelector extends Component {
  static propTypes = {
    isVisible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    selectCurrency: PropTypes.func.isRequired
  };

  render() {
    const flagImage = constants.starterBackground;

    const selectCurrency = currency => {
      this.props.selectCurrency(currency);
      this.props.onClose();
    };

    const currencies = [
      {
        image: flagImage,
        name: "USDEUR",
        action: () => selectCurrency("USDEUR")
      },
      {
        image: flagImage,
        name: "USDINR",
        action: () => selectCurrency("USDINR")
      },
      {
        image: flagImage,
        name: "USDJPY",
        action: () => selectCurrency("USDJPY")
      }
    ];

    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.isVisible}
        onRequestClose={() => {
          console.log("modal closed!");
        }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.container}>
            <View style={styles.header}>
              <TouchableHighlight
                style={styles.icon}
                underlayColor={"transparent"}
                onPress={this.props.onClose}
              >
                <Icon size={24} name={constants.closeIcon} />
              </TouchableHighlight>
              <View style={styles.headingArea}>
                <Text style={styles.headingText}>Output Currency</Text>
              </View>
              <TouchableHighlight style={styles.icon}>
                <Icon
                  style={24}
                  source={constants.searchIcon}
                  color={"white"}
                />
              </TouchableHighlight>
            </View>
            <ScrollView
              style={[
                styles.optionsContainer,
                { marginBottom: isIphoneX() ? 30 : 0 }
              ]}
            >
              {currencies.map((currency, index) => {
                return (
                  <CurrencyRow
                    key={index}
                    image={currency.image}
                    text={currency.name}
                    action={currency.action}
                  />
                );
              })}

              <SectionHeader
                sectionName={"MORE CURRENCIES"}
                containerStyle={{ marginTop: 40, marginBottom: 0 }}
              />

              {currencies.map((currency, index) => {
                return (
                  <CurrencyRow
                    key={index}
                    image={currency.image}
                    text={currency.name}
                    action={currency.action}
                  />
                );
              })}
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
  header: {
    height: 32,
    marginVertical: 32,
    flexDirection: "row",
    alignItems: "center"
  },
  headingArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  headingText: {
    ...constants.font20(constants.primarySemiBold)
  },
  icon: {
    height: 24,
    width: 24
  },
  optionsContainer: {},
  flagImage: {
    height: 20,
    width: 30
  },
  currencyRowTouchable: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: constants.shade4
  },
  currencyRowContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  currencyRowFlagImage: {
    height: 20,
    width: 30,
    marginRight: 8
  },
  currencyName: {
    ...constants.font17(constants.primaryLight),
    marginTop: 8,
    color: constants.black2
  }
});

export default CurrencySelector;
