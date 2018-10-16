import React, { Component } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  Keyboard
} from "react-native";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import VoucherSplitSection from "../VoucherScreens/Components/VoucherSplitSection";
import constants from "../../constants/constants";
import { responsiveWidth } from "react-native-responsive-dimensions";
import Icon from "../../CommonComponents/Icon/Icon";
import SimpleButton from "../../CommonComponents/SimpleButton/SimpleButton";
import apiCall from "../../Services/networkRequests/apiCall";
import Loader from "../../CommonComponents/Loader/Loader";
import paymentScript from "./Components/paymentScript";

class PaymentSummary extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <CommonHeader title={"Complete Payment"} navigation={navigation} />
      )
    };
  };

  state = {
    paymentInfo: [],
    isLoading: false,
    isPaymentLoading: false
  };
  _didFocusSubscription;

  constructor(props) {
    super(props);

    this._didFocusSubscription = props.navigation.addListener(
      "didFocus",
      () => {
        console.log("Focusing Summary....");
        this.loadPaymentData();
      }
    );
  }

  componentDidMount() {
    this.loadPaymentData();
  }

  componentWillUnmount() {
    this._didFocusSubscription && this._didFocusSubscription.remove();
  }

  apiFailure = () => {};

  loadPaymentData = () => {
    this.setState({
      isLoading: true
    });
    const itineraryId = this.props.navigation.getParam("itineraryId", "");
    apiCall(constants.getPaymentInfo.replace(":itineraryId", itineraryId))
      .then(response => {
        this.setState({
          isLoading: false
        });
        if (response.status === "SUCCESS") {
          this.setState({
            paymentInfo: response.data
          });
        } else {
          this.apiFailure();
        }
      })
      .catch(error => {
        this.setState({
          isLoading: false
        });
        this.apiFailure();
      });
  };

  initiatePayment = paymentOptionType => {
    const itineraryId = this.props.navigation.getParam("itineraryId", "");
    this.setState({
      isPaymentLoading: true
    });
    apiCall(constants.initiatePayment, {
      itineraryId,
      paymentOptionType,
      userId: ""
    })
      .then(response => {
        this.setState(
          {
            isPaymentLoading: false
          },
          () => {
            if (response.status === "SUCCESS") {
              const paymentScriptJs = paymentScript({
                ...response.data,
                successUrl: constants.paymentSuccess,
                failureUrl: constants.paymentFailure,
                cancelUrl: constants.paymentFailure
              });
              this.props.navigation.navigate("PaymentScreen", {
                paymentScript: paymentScriptJs
              });
            } else {
              this.apiFailure();
            }
          }
        );
      })
      .catch(error => {
        this.setState({
          isPaymentLoading: false
        });
        this.apiFailure();
      });
  };

  render() {
    const tripId = [
      {
        name: "Trip ID",
        value: "PYT283049"
      }
    ];

    const paymentOptions = this.state.paymentInfo.reduce(
      (detailsArray, amount) => {
        if (amount.paymentStatus === "PENDING") {
          const data = {
            amount: `₹ ${amount.paymentAmount}`,
            percentage: `${amount.percent}% of total cost`,
            action: () => this.initiatePayment(amount.paymentType)
          };
          detailsArray.push(data);
        }
        return detailsArray;
      },
      []
    );

    const amountDetails = [
      {
        name: "Total cost",
        value: "₹ 1,83,940"
      },
      {
        name: "Amount paid",
        value: "₹ 1,83,940"
      },
      {
        name: "Amount pending",
        value: "₹ 1,83,940"
      }
    ];

    return (
      <ScrollView
        style={styles.summaryContainer}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isLoading}
            onRefresh={() => {
              this.loadPaymentData();
            }}
          />
        }
      >
        <Loader isVisible={this.state.isPaymentLoading} />
        <Text style={styles.titleText}>Anand’s 10nights trip to Europe</Text>

        <VoucherSplitSection
          sections={tripId}
          containerStyle={{
            borderBottomWidth: 2,
            borderBottomColor: constants.shade4,
            marginTop: 24
          }}
        />

        <VoucherSplitSection
          sections={amountDetails}
          containerStyle={{
            borderBottomWidth: 2,
            borderBottomColor: constants.shade4,
            marginTop: 24
          }}
        />

        <View style={styles.dueDateWrapper}>
          <Text style={styles.dueDate}>Due date for next payment mm/dd/yy</Text>
        </View>

        <Text style={styles.paymentTitle}>Choose Payment</Text>

        <View style={styles.paymentOptionsBox}>
          {paymentOptions.map((paymentOption, optionKey) => {
            const isLast = paymentOptions.length === optionKey + 1;
            return (
              <TouchableOpacity
                onPress={paymentOption.action}
                style={[
                  styles.optionButton,
                  !isLast
                    ? {
                        borderBottomWidth: 1,
                        borderBottomColor: constants.shade3
                      }
                    : null
                ]}
                key={optionKey}
              >
                <View>
                  <Text style={styles.amountText}>{paymentOption.amount}</Text>
                  <Text style={styles.percentageText}>
                    {paymentOption.percentage}
                  </Text>
                </View>
                <View>
                  <Icon
                    name={constants.arrowRight}
                    size={16}
                    color={constants.shade2}
                  />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.actionRow}>
          <SimpleButton
            text={"Support"}
            containerStyle={{ width: responsiveWidth(43), borderWidth: 0.5 }}
            action={() => {}}
            color={"transparent"}
            textColor={constants.black2}
            hasBorder={true}
            icon={constants.compassIcon}
            iconSize={16}
          />
          <SimpleButton
            text={"Invoice"}
            containerStyle={{ width: responsiveWidth(43), borderWidth: 0.5 }}
            action={() => {}}
            color={"transparent"}
            textColor={constants.black2}
            hasBorder={true}
            icon={constants.callIcon}
            iconSize={16}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  summaryContainer: {
    backgroundColor: "white",
    paddingHorizontal: 24
  },
  titleText: {
    alignSelf: "center",
    ...constants.fontCustom(constants.primaryLight, 15),
    marginTop: 8,
    color: constants.black1
  },
  dueDateWrapper: {
    width: responsiveWidth(100) - 48,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: constants.shade4,
    alignSelf: "center"
  },
  dueDate: {
    alignSelf: "center",
    ...constants.fontCustom(constants.primaryLight, 15),
    color: constants.black2
  },
  paymentTitle: {
    marginTop: 19,
    ...constants.fontCustom(constants.primarySemiBold, 20),
    color: constants.black1
  },
  paymentOptionsBox: {
    marginTop: 8,
    backgroundColor: constants.firstColorBackground,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: constants.shade3
  },
  optionButton: {
    flexDirection: "row",
    height: 56,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16
  },
  amountText: {
    ...constants.fontCustom(constants.primarySemiBold, 17),
    color: constants.firstColor
  },
  percentageText: {
    ...constants.fontCustom(constants.primaryLight, 13),
    color: constants.black2,
    marginBottom: -4
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 24
  }
});

export default PaymentSummary;
