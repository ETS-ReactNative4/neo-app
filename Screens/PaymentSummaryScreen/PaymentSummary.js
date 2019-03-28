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
import Modal from "react-native-modal";
import apiCall from "../../Services/networkRequests/apiCall";
import Loader from "../../CommonComponents/Loader/Loader";
import moment from "moment";
import paymentScript from "./Components/paymentScript";
import getLocaleString from "../../Services/getLocaleString/getLocaleString";
import VoucherAccordion from "../VoucherScreens/Components/VoucherAccordion";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import CustomScrollView from "../../CommonComponents/CustomScrollView/CustomScrollView";
import { recordEvent } from "../../Services/analytics/analyticsService";
import _ from "lodash";

/**
 * TODO: Need data from previous api
 */
@ErrorBoundary()
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
    paymentStatus: "",
    isFirstLoad: true,
    isBankDetailModalVisible: false
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

  openBankDetailModal = () => {
    this.setState({
      isBankDetailModalVisible: true
    });
  };

  closeModal = () => {
    this.setState({
      isBankDetailModalVisible: false
    });
  };

  apiFailure = () => {};

  loadPaymentData = () => {
    const itineraryId = this.props.navigation.getParam("itineraryId", "");
    const paymentDetails = this.props.navigation.getParam("paymentDetails", {});
    const itineraryName = this.props.navigation.getParam("itineraryName", "");
    const paymentStatus = paymentDetails.paymentStatus;
    this.setState({
      tripId: `PYT${itineraryId.substr(itineraryId.length - 7).toUpperCase()}`,
      itineraryName,
      nextPendingDate: moment(paymentDetails.nextPendingDate).format(
        "MM/DD/YYYY"
      ),
      itineraryTotalCost: getLocaleString(paymentDetails.itineraryTotalCost),
      totalAmountPaid: getLocaleString(paymentDetails.totalAmountPaid),
      paymentDue: getLocaleString(paymentDetails.paymentDue),
      paymentStatus
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
    apiCall(
      constants.initiatePayment,
      {
        itineraryId,
        paymentOptionType,
        userId: ""
      },
      "POST",
      constants.productUrl,
      false,
      {
        Version: "V_2"
      }
    )
      .then(response => {
        this.setState(
          {
            isPaymentLoading: false
          },
          () => {
            if (response.status === "SUCCESS") {
              const transactionId = response.data.transactionId;
              const paymentScriptJs = paymentScript(response.data);
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
    const platoBankDetails = [
      {
        name: "Account",
        value: "50200003337649"
      },
      {
        name: "Name",
        value: "Travel Troops global pvt ltd"
      },
      {
        name: "Branch",
        value: "T Nagar - GN Chetty Rd, Chennai"
      },
      {
        name: "IFSCode",
        value: "HDFC0000206"
      },
      {
        name: "Swift Code",
        value: "HDFCINBB"
      }
    ];

    const tripId = [
      {
        name: "Trip ID",
        value: this.state.tripId
      }
    ];
    const { paymentInfo, isLoading } = this.state;
    const { productPayments, platoPayements: platoPayments } = paymentInfo;

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

    const paymentHistory = platoPayments
      ? platoPayments.paidInstallments
        ? platoPayments.paidInstallments.reduce((detailsArray, amount) => {
            detailsArray.push({
              paymentAmount: getLocaleString(amount.amount),
              transactionId: amount.transactionId,
              mode: "Offline",
              date: moment(amount.paymentTime).format("DD/MMM/YYYY")
            });
            return detailsArray;
          }, [])
        : []
      : productPayments
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

    const isPaidWithPlato =
      platoPayments &&
      platoPayments.paidInstallments &&
      platoPayments.paidInstallments.length;
    const isPaymentComplete = this.state.paymentStatus === "SUCCESS";
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

    /**
     * TODO: Move bank details out of the app to api/webview
     */
    return (
      <CustomScrollView
        style={styles.summaryContainer}
        refreshing={this.state.isLoading}
        onRefresh={() => {
          this.loadPaymentData();
        }}
      >
        <Loader isVisible={this.state.isPaymentLoading} />
        <Modal
          isVisible={this.state.isBankDetailModalVisible}
          animationInTiming={600}
          animationOutTiming={600}
          onBackButtonPress={this.closeModal}
          onBackdropPress={this.closeModal}
          useNativeDriver={true}
          style={{ margin: 0 }}
          backdropOpacity={0.2}
        >
          <View style={styles.platoBankDetailContainer}>
            <Text style={styles.platoBankDetailTitle}>{"Bank Details"}</Text>
            <VoucherSplitSection sections={platoBankDetails} />
            <SimpleButton
              text={"Got it!"}
              hasBorder={true}
              color={"white"}
              action={this.closeModal}
              textColor={constants.firstColor}
              containerStyle={{ padding: 4 }}
            />
          </View>
        </Modal>
        <Text style={styles.titleText}>{this.state.itineraryName}</Text>

        <VoucherSplitSection
          sections={tripId}
          containerStyle={{
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: constants.shade4,
            marginTop: 24,
            marginHorizontal: 24
          }}
        />

        <VoucherSplitSection
          sections={amountDetails}
          containerStyle={{
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: constants.shade4,
            marginTop: 24,
            marginHorizontal: 24,
            paddingBottom: 16
          }}
        />

        <View style={styles.dueDateWrapper}>
          <Text style={styles.dueDate}>
            {!isLoading
              ? _.toUpper(this.state.paymentStatus) === "SUCCESS"
                ? "Payment Completed!"
                : _.toUpper(this.state.paymentStatus) === "EXPIRED"
                  ? "Payment Expired!"
                  : `Due date for next payment ${this.state.nextPendingDate}`
              : null}
          </Text>
        </View>

        {isPaymentComplete
          ? null
          : [
              isPaidWithPlato ? (
                <Text key={0} style={styles.offlinePaymentText}>
                  {`You have paid offline. To complete the next payment use the following `}
                  <Text
                    onPress={this.openBankDetailModal}
                    style={{
                      color: constants.firstColor,
                      textDecorationLine: "underline"
                    }}
                  >{`bank account`}</Text>
                </Text>
              ) : (
                <Text key={0} style={styles.paymentTitle}>
                  Choose Payment
                </Text>
              ),
              <View key={1} style={styles.paymentOptionsBox}>
                {!isPaidWithPlato &&
                  paymentOptions.map((paymentOption, optionKey) => {
                    const isLast = paymentOptions.length === optionKey + 1;
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          recordEvent(constants.paymentScreenStartPayment);
                          paymentOption.action();
                        }}
                        style={[
                          styles.optionButton,
                          !isLast
                            ? {
                                borderBottomWidth: StyleSheet.hairlineWidth,
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
          <VoucherAccordion
            containerStyle={{
              marginHorizontal: 24
            }}
            sections={paymentLedger}
          />
        ) : null}
      </CustomScrollView>
    );
  }
}

const styles = StyleSheet.create({
  summaryContainer: {
    backgroundColor: "white"
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
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: constants.shade4,
    alignSelf: "center",
    marginHorizontal: 24
  },
  dueDate: {
    alignSelf: "center",
    ...constants.fontCustom(constants.primaryLight, 15),
    color: constants.black2
  },
  paymentTitle: {
    marginTop: 19,
    ...constants.fontCustom(constants.primarySemiBold, 20),
    color: constants.black1,
    marginHorizontal: 24
  },
  offlinePaymentText: {
    textAlign: "center",
    marginHorizontal: 24,
    marginTop: 8,
    color: constants.black2,
    ...constants.fontCustom(constants.primarySemiBold, 18)
  },
  paymentOptionsBox: {
    marginTop: 8,
    backgroundColor: constants.firstColorBackground,
    borderRadius: 3,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: constants.shade3,
    marginHorizontal: 24
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
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: constants.shade4
  },
  platoBankDetailContainer: {
    backgroundColor: "white",
    marginHorizontal: 24,
    borderRadius: 5,
    padding: 16,
    alignItems: "center",
    justifyContent: "center"
  },
  platoBankDetailTitle: {
    ...constants.fontCustom(constants.primarySemiBold, 17),
    padding: 16
  }
});

export default PaymentSummary;
