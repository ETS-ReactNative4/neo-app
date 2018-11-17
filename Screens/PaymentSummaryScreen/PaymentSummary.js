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
import moment from "moment";
import paymentScript from "./Components/paymentScript";
import getLocaleString from "../../Services/getLocaleString/getLocaleString";
import VoucherAccordion from "../VoucherScreens/Components/VoucherAccordion";

/**
 * TODO: Need data from previous api
 */
class PaymentSummary extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <CommonHeader title={"Complete Payment"} navigation={navigation} />
      )
    };
  };

  state = {
    paymentInfo: {},
    isLoading: false,
    isPaymentLoading: false,
    itineraryName: "",
    tripId: "",
    nextPendingDate: "",
    itineraryTotalCost: "",
    totalAmountPaid: "",
    paymentDue: "",
    isFirstLoad: true
  };
  _didFocusSubscription;

  constructor(props) {
    super(props);

    this._didFocusSubscription = props.navigation.addListener(
      "didFocus",
      () => {
        if (this.state.isFirstLoad) {
          this.setState({
            isFirstLoad: false
          });
        } else {
          this.loadPaymentData();
        }
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
    const itineraryId = this.props.navigation.getParam("itineraryId", "");
    const paymentDetails = this.props.navigation.getParam("paymentDetails", {});
    const itineraryName = this.props.navigation.getParam("itineraryName", "");
    this.setState({
      tripId: `PYT${itineraryId.substr(itineraryId.length - 7).toUpperCase()}`,
      itineraryName,
      nextPendingDate: moment(paymentDetails.nextPendingDate).format(
        "MM/DD/YYYY"
      ),
      itineraryTotalCost: getLocaleString(paymentDetails.itineraryTotalCost),
      totalAmountPaid: getLocaleString(paymentDetails.totalAmountPaid),
      paymentDue: getLocaleString(paymentDetails.paymentDue)
    });
    this.setState({
      isLoading: true
    });
    apiCall(constants.getPaymentInfo.replace(":itineraryId", itineraryId))
      .then(response => {
        setTimeout(() => {
          this.setState({
            isLoading: false
          });
        }, 1000);
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
              const transactionId = response.data.transactionId;
              const paymentScriptJs = paymentScript({
                ...response.data,
                successUrl: constants.paymentSuccess,
                failureUrl: constants.paymentFailure,
                cancelUrl: constants.paymentCancelled
              });
              this.props.navigation.navigate("PaymentScreen", {
                paymentScript: paymentScriptJs,
                transactionId
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
        value: this.state.tripId
      }
    ];
    const { paymentInfo } = this.state;
    const { productPayments, platoPayements } = paymentInfo;

    const paymentOptions = productPayments
      ? productPayments.reduce((detailsArray, amount) => {
          if (amount.paymentStatus === "PENDING") {
            const data = {
              amount: `₹ ${amount.paymentAmount}`,
              percentage: `${amount.percent}% of total cost`,
              action: () => this.initiatePayment(amount.paymentType)
            };
            detailsArray.push(data);
          }
          return detailsArray;
        }, [])
      : [];

    const paymentHistory = productPayments
      ? productPayments.reduce((detailsArray, amount) => {
          if (amount.paymentStatus === "SUCCESS") {
            const data = {
              paymentAmount: `₹ ${amount.paymentAmount}`,
              transactionId: amount.transactionId,
              mode: "PayU",
              date: amount.paidOn
            };
            detailsArray.push(data);
          }
          return detailsArray;
        }, [])
      : platoPayements && platoPayements.paidInstallments
        ? platoPayments.paidInstallments.reduce((detailsArray, amount) => {
            detailsArray.push({
              paymentAmount: getLocaleString(amount.amount),
              transactionId: amount.transactionId,
              mode: "Offline",
              date: moment(amount.paymentTime)
            });
            return detailsArray;
          }, [])
        : [];

    const paymentLedger = [
      {
        name: "Payment History",
        component: (
          <View>
            {paymentHistory.map((payment, paymentIndex) => {
              const paymentSectionData = [
                {
                  name: "Date",
                  value: payment.date
                },
                {
                  name: "Mode",
                  value: payment.mode
                },
                {
                  name: "Transaction ID",
                  value: payment.transactionId
                },
                {
                  name: "Amount",
                  value: payment.paymentAmount
                }
              ];
              return (
                <View key={paymentIndex} style={styles.historySplitContainer}>
                  <VoucherSplitSection sections={paymentSectionData} />
                </View>
              );
            })}
          </View>
        )
      }
    ];

    let amountDetails = [
      {
        name: "Total cost",
        value: this.state.itineraryTotalCost
      }
    ];

    const isPaymentComplete = !paymentOptions.length;
    if (!isPaymentComplete) {
      amountDetails = [
        ...amountDetails,
        {
          name: "Amount paid",
          value: this.state.totalAmountPaid
        },
        {
          name: "Amount pending",
          value: this.state.paymentDue
        }
      ];
    }

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
        <Text style={styles.titleText}>{this.state.itineraryName}</Text>

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
          <Text style={styles.dueDate}>
            {isPaymentComplete
              ? "Payment Completed!"
              : `Due date for next payment ${this.state.nextPendingDate}`}
          </Text>
        </View>

        {isPaymentComplete
          ? null
          : [
              <Text key={0} style={styles.paymentTitle}>
                Choose Payment
              </Text>,
              <View key={1} style={styles.paymentOptionsBox}>
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
                        <Text style={styles.amountText}>
                          {paymentOption.amount}
                        </Text>
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
            ]}

        {paymentHistory.length ? (
          <VoucherAccordion sections={paymentLedger} />
        ) : null}
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
    justifyContent: "center",
    paddingVertical: 24
  },
  historySplitContainer: {
    marginTop: 8,
    borderBottomWidth: 1,
    borderBottomColor: constants.shade4
  }
});

export default PaymentSummary;
