import React, { Component, Fragment } from "react";
import { View, StyleSheet, Keyboard, Text } from "react-native";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import pullToRefresh from "../../Services/refresh/pullToRefresh";
import CustomScrollView from "../../CommonComponents/CustomScrollView/CustomScrollView";
import ForexProviderInfo from "./Components/ForexProviderInfo";
import ForexInputField from "./Components/ForexInputField";
import constants from "../../constants/constants";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import ForexSwitchComponent from "./Components/ForexSwitchComponent";
import ForexAmountField from "./Components/ForexAmountField";
import ForexFeaturesList from "./Components/ForexFeaturesList";
import { inject, observer } from "mobx-react/custom";
import SimpleButton from "../../CommonComponents/SimpleButton/SimpleButton";
import { responsiveWidth } from "react-native-responsive-dimensions";

const forexFeatures = [
  "Competitive exchange rates",
  "Pay online through easy pay options",
  "Door delivery and pick up from nearest store",
  "Easy top up of Forex card while on trip - no worries for running out of money"
];

@ErrorBoundary()
@inject("forexStore")
@inject("appState")
@inject("userStore")
@observer
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

  onEditAmount = amount => this.setState({ amount });

  selectCurrency = requiredCurrency => this.setState({ requiredCurrency });

  selectCountryCode = ccode => this.setState({ ccode });

  selectProduct = forexType => this.setState({ forexType });

  componentDidMount() {
    const { getForexStatus, getForexDataFromGuides } = this.props.forexStore;
    const { loadCurrencies } = this.props.appState;
    const { getUserDetails } = this.props.userStore;
    getForexStatus();
    loadCurrencies();
    getUserDetails();
    getForexDataFromGuides();
  }

  render() {
    const { isLoading, opportunityId } = this.props.forexStore;
    const { currencies } = this.props.appState;
    const { userDetails } = this.props.userStore;

    const selectedCurrency = this.state.requiredCurrency || currencies[0];

    return (
      <CustomScrollView
        showsVerticalScrollIndicator={false}
        refreshing={isLoading}
        onRefresh={() => null}
      >
        {opportunityId ? (
          <View />
        ) : isLoading ? null : (
          <Fragment>
            <ForexProviderInfo />
            <ForexFeaturesList
              containerStyle={{ marginTop: 16 }}
              features={forexFeatures}
            />
            <ForexInputField
              containerStyle={styles.inputField}
              value={this.state.name || userDetails.name}
              onEdit={this.onEditName}
              placeholder={"Your Name..."}
              label={"Name"}
            />
            <ForexInputField
              isMobileNumberField={true}
              containerStyle={styles.inputField}
              value={
                this.state.mobileNumber || userDetails.ccode === "+91"
                  ? userDetails.mob_num
                  : ""
              }
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
              value={this.state.email || userDetails.email}
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
              <ForexAmountField
                selectedCurrency={selectedCurrency}
                currencies={currencies}
                containerStyle={styles.amountField}
                label={"Amount"}
                amount={this.state.amount}
                onEdit={this.onEditAmount}
                onSelectCurrency={this.selectCurrency}
              />
            </View>
            <Text onPress={() => null} style={styles.forexText}>
              {constants.forexText.howMuchToCarryText}
            </Text>
            <SimpleButton
              containerStyle={{
                width: responsiveWidth(100) - 48,
                height: 56,
                alignSelf: "center",
                marginTop: 24
              }}
              text={"Get Quote"}
              textColor={"white"}
            />
          </Fragment>
        )}
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
    marginHorizontal: 24,
    flexDirection: "row"
  },
  switchField: {},
  amountField: {
    marginLeft: 16
  },
  forexText: {
    marginTop: 10,
    marginHorizontal: 24,
    color: constants.firstColor
  }
});

export default Forex;
