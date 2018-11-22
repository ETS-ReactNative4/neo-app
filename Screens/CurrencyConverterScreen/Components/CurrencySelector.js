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
import SectionHeader from "../../../CommonComponents/SectionHeader/SectionHeader";
import Icon from "../../../CommonComponents/Icon/Icon";
import SelectionRow from "../../../CommonComponents/SelectionRow/SelectionRow";

class CurrencySelector extends Component {
  static propTypes = {
    isVisible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    selectCurrency: PropTypes.func.isRequired,
    currenciesList: PropTypes.array.isRequired
  };

  render() {
    const flagImage = constants.starterBackground;
    const { currenciesList } = this.props;

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
              {/*<TouchableHighlight style={styles.icon}>*/}
              {/*<Icon*/}
              {/*style={24}*/}
              {/*source={constants.searchIcon}*/}
              {/*color={"white"}*/}
              {/*/>*/}
              {/*</TouchableHighlight>*/}
            </View>
            <ScrollView
              style={[
                styles.optionsContainer,
                { marginBottom: isIphoneX() ? 30 : 0 }
              ]}
            >
              {currencies.map((currency, index) => {
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
  }
});

export default CurrencySelector;
