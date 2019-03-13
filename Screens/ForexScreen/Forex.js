import React, { Component } from "react";
import { View, StyleSheet, Keyboard } from "react-native";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import pullToRefresh from "../../Services/refresh/pullToRefresh";
import CustomScrollView from "../../CommonComponents/CustomScrollView/CustomScrollView";
import ForexProviderInfo from "./Components/ForexProviderInfo";
import ForexInputField from "./Components/ForexInputField";
import constants from "../../constants/constants";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import ForexSwitchComponent from "./Components/ForexSwitchComponent";

@ErrorBoundary()
class Forex extends Component {
  state = {
    name: "",
    ccode: "+91",
    mobileNumber: "",
    email: "",
    productOptions: [
      {
        label: "Cash",
        value: constants.forexProduct.cash
      },
      {
        label: "Card",
        value: constants.forexProduct.singleCurrencyCard
      }
    ],
    forexType: constants.forexProduct.cash,
    requiredCurrency: "",
    amount: ""
  };

  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <CommonHeader
          leftAction={() => {
            Keyboard.dismiss();
            navigation.goBack();
          }}
          title={"Forex"}
          navigation={navigation}
        />
      )
    };
  };

  onEditName = name => this.setState({ name });

  onEditNumber = mobileNumber => this.setState({ mobileNumber });

  onEditEmail = email => this.setState({ email });

  selectCountryCode = ccode => this.setState({ ccode });

  selectProduct = forexType => this.setState({ forexType });

  render() {
    return (
      <CustomScrollView
        showsVerticalScrollIndicator={false}
        refreshing={true}
        onRefresh={() => null}
      >
        <ForexProviderInfo />
        <ForexInputField
          containerStyle={styles.inputField}
          value={this.state.name}
          onEdit={this.onEditName}
          placeholder={"Your Name..."}
          label={"Name"}
        />
        <ForexInputField
          isMobileNumberField={true}
          containerStyle={styles.inputField}
          value={this.state.mobileNumber}
          selectedCountryCode={this.state.ccode}
          onEdit={this.onEditNumber}
          placeholder={"Your Phone Number..."}
          maxLength={10}
          label={"Mobile Number"}
          keyboardType={"phone-pad"}
          onSelectCountryCode={this.selectCountryCode}
        />
        <ForexInputField
          containerStyle={styles.inputField}
          value={this.state.email}
          onEdit={this.onEditEmail}
          placeholder={"Your Email..."}
          label={"Email"}
          keyboardType={"email-address"}
        />
        <View style={styles.optionsRow}>
          <ForexSwitchComponent
            label={"Product"}
            containerStyle={styles.switchField}
            options={this.state.productOptions}
            onSelect={this.selectProduct}
            selectedValue={this.state.forexType}
          />
        </View>
      </CustomScrollView>
    );
  }
}

const styles = StyleSheet.create({
  inputField: {
    marginTop: 24
  },
  optionsRow: {
    marginTop: 24,
    marginHorizontal: 24
  },
  switchField: {}
});

export default Forex;
