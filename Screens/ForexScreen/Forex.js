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
import ForexGuidesInfo from "./Components/ForexGuidesInfo";
import validateEmail from "../../Services/validateEmail/validateEmail";
import validateMobileNumber from "../../Services/validateMobileNumber/validateMobileNumber";

const forexFeatures = [
  "Competitive exchange rates",
  "Pay online through easy pay options",
  "Door delivery and pick up from nearest store",
  "Easy top up of Forex card while on trip - no worries for running out of money"
];

@ErrorBoundary()
@inject("forexStore")
@inject("appState")
@inject("itineraries")
@inject("userStore")
@observer
class Forex extends Component {
  state = {
    name: false,
    ccode: "+91",
    mobileNumber: false,
    email: false,
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
    amount: "",
    isForexModalVisible: false,
    hasFormSubmitAttempted: false
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

  toggleGuidesModal = () =>
    this.setState({ isForexModalVisible: !this.state.isForexModalVisible });

  getQuote = () => {
    this.setState({
      hasFormSubmitAttempted: true
    });
    const { selectedItineraryId } = this.props.itineraries;
    const { userDetails } = this.props.userStore;
    const name = this.state.name === false ? userDetails.name : this.state.name;
    const mobileNumber =
      this.state.mobileNumber === false
        ? userDetails.ccode === "+91"
          ? userDetails.mob_num
          : ""
        : this.state.mobileNumber;
    const email =
      this.state.email === false ? userDetails.email : this.state.email;
    const requestObject = {
      itineraryId: selectedItineraryId,
      name,
      email,
      mobileNumber,
      forexType: this.state.forexType,
      amount: this.state.amount,
      requiredCurrency: this.state.requiredCurrency
    };
    if (this.validateRequest(requestObject)) {
    }
  };

  validateRequest = requestObject => {
    if (!validateEmail(requestObject.email)) return false;
    if (
      !validateMobileNumber(`${this.state.ccode}${requestObject.mobileNumber}`)
    )
      return false;
    for (let field in requestObject) {
      if (requestObject.hasOwnProperty(field)) {
        if (!requestObject[field]) return false;
      }
    }
    return true;
  };

  componentDidMount() {
    const {
      getForexStatus,
      getForexDataFromGuides,
      opportunityId
    } = this.props.forexStore;
    getForexStatus();
    if (!opportunityId) {
      const { loadCurrencies } = this.props.appState;
      const { getUserDetails } = this.props.userStore;
      loadCurrencies();
      getUserDetails();
      getForexDataFromGuides();
    }
  }

  render() {
    const {
      isForexStatusLoading,
      opportunityId,
      forexGuidesDetails
    } = this.props.forexStore;
    const { currencies } = this.props.appState;
    const { userDetails } = this.props.userStore;
    const { hasFormSubmitAttempted } = this.state;

    const selectedCurrency = this.state.requiredCurrency || currencies[0];

    const name = this.state.name === false ? userDetails.name : this.state.name;
    const mobileNumber =
      this.state.mobileNumber === false
        ? userDetails.ccode === "+91"
          ? userDetails.mob_num
          : ""
        : this.state.mobileNumber;
    const email =
      this.state.email === false ? userDetails.email : this.state.email;

    return (
      <Fragment>
        <ForexGuidesInfo
          data={forexGuidesDetails}
          onClose={this.toggleGuidesModal}
          isVisible={this.state.isForexModalVisible}
        />
        <CustomScrollView
          showsVerticalScrollIndicator={false}
          refreshing={isForexStatusLoading}
          onRefresh={() => null}
        >
          {opportunityId ? (
            <View />
          ) : isForexStatusLoading ? null : (
            <Fragment>
              <ForexProviderInfo />
              <ForexFeaturesList
                containerStyle={{ marginTop: 16 }}
                features={forexFeatures}
              />
              <ForexInputField
                containerStyle={styles.inputField}
                value={name}
                onEdit={this.onEditName}
                placeholder={"Your Name..."}
                label={"Name"}
                hasError={hasFormSubmitAttempted && !name}
              />
              <ForexInputField
                isMobileNumberField={true}
                containerStyle={styles.inputField}
                value={mobileNumber}
                selectedCountryCode={this.state.ccode}
                onEdit={this.onEditNumber}
                placeholder={"Your Phone Number..."}
                maxLength={10}
                label={"Mobile Number"}
                keyboardType={"phone-pad"}
                onSelectCountryCode={this.selectCountryCode}
                hasError={
                  hasFormSubmitAttempted &&
                  !validateMobileNumber(`${this.state.ccode}${mobileNumber}`)
                }
              />
              <ForexInputField
                containerStyle={styles.inputField}
                value={email}
                onEdit={this.onEditEmail}
                placeholder={"Your Email..."}
                label={"Email"}
                keyboardType={"email-address"}
                hasError={hasFormSubmitAttempted && !validateEmail(email)}
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
                  hasError={hasFormSubmitAttempted && !this.state.amount}
                />
              </View>
              <Text onPress={this.toggleGuidesModal} style={styles.forexText}>
                {constants.forexText.howMuchToCarryText}
              </Text>
              <SimpleButton
                action={this.getQuote}
                underlayColor={constants.firstColorAlpha(0.8)}
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
      </Fragment>
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
