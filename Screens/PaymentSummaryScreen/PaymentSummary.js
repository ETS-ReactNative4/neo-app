import React, { Component } from "react";
import { View } from "react-native";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import constants from "../../constants/constants";
import { responsiveWidth } from "react-native-responsive-dimensions";
import apiCall from "../../Services/networkRequests/apiCall";
import moment from "moment";
import paymentScript from "./Components/paymentScript";
import getLocaleString from "../../Services/getLocaleString/getLocaleString";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import _ from "lodash";
import YourBookingsTabBar from "../YourBookingsScreen/Components/YourBookingsTabBar";
import ScrollableTabView from "react-native-scrollable-tab-view";
import UpcomingPayments from "./Components/UpcomingPayments/UpcomingPayments";
import CompletedPayments from "./Components/CompletedPayments/CompletedPayments";
import { toastBottom } from "../../Services/toast/toast";
import dialer from "../../Services/dialer/dialer";

@ErrorBoundary()
class PaymentSummary extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: <CommonHeader title={"Payment Summary"} navigation={navigation} />
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

  apiFailure = () => {
    toastBottom("Failed to fetch data from the server");
    this.props.navigation.goBack();
  };

  loadPaymentData = () => {
    const itineraryId = this.props.navigation.getParam("itineraryId", "");
    const paymentDetails = this.props.navigation.getParam("paymentDetails", {});
    const itineraryName = this.props.navigation.getParam("itineraryName", "");
    const paymentStatus = paymentDetails.paymentStatus;
    this.setState({
      tripId: `PYT${itineraryId.substr(itineraryId.length - 7).toUpperCase()}`,
      itineraryName,
      nextPendingDate: paymentDetails.nextPendingDate,
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
        if (response.status === constants.responseSuccessStatus) {
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
        Version: "V_2",
        user_device: "MOBILE_APP"
      }
    )
      .then(response => {
        this.setState(
          {
            isPaymentLoading: false
          },
          () => {
            if (response.status === constants.responseSuccessStatus) {
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
    const { paymentInfo, isLoading } = this.state;

    const {
      productPayments,
      platoPayements: platoPayments,
      accountInfo = {},
      contactNumber = null,
      gstReceipt
    } = paymentInfo;

    /**
     * Construct Bank details to show the virtual account for plato payments
     */
    const platoBankDetails = [
      {
        name: "Account",
        value: accountInfo.van
      },
      {
        name: "Bank",
        value: accountInfo.bank
      },
      {
        name: "Name",
        value: accountInfo.cname
      },
      {
        name: "Branch",
        value: accountInfo.branch
      },
      {
        name: "IFSCode",
        value: accountInfo.ifsc
      },
      {
        name: "Swift Code",
        value: accountInfo.swiftId
      }
    ];

    /**
     * Construct Payment Options object array that is used by payment cards to initiate payment
     */
    const paymentOptions = productPayments
      ? productPayments.reduce((detailsArray, amount, amountIndex) => {
          const data = {
            amount: `₹ ${amount.paymentAmount}`,
            percentageText:
              amount.percent === 100
                ? `Clear Total Balance Due`
                : `Complete ${amount.percent}% of your trip cost`,
            action: () => this.initiatePayment(amount.paymentType),
            paymentDue: amount.paymentDue,
            percent: amount.percent,
            paymentAllowed: amount.paymentAllowed,
            nextInstallmentAmount: amount.nextInstallmentAmount,
            nextInstallmentDate: amount.nextInstallmentDate,
            paymentStatus: amount.paymentStatus
          };
          detailsArray.push(data);
          return detailsArray;
        }, [])
      : [];

    /**
     * Launch dialer when the payment expires and user clicks call support
     */
    const openSupport = () => (contactNumber ? dialer(contactNumber) : null);

    /**
     * create payment history object array using both product and plato payment histories
     */
    const paymentHistory = platoPayments
      ? platoPayments.paidInstallments
        ? platoPayments.paidInstallments.reduce((detailsArray, amount) => {
            detailsArray.push({
              paymentAmount: getLocaleString(amount.amount),
              transactionId: amount.referenceNumber,
              mode: amount.paymentMode,
              date: moment(amount.paymentTime).format(
                constants.costingDateFormat
              ),
              salesReceipt: amount.salesReceipt
            });
            return detailsArray;
          }, [])
        : []
      : productPayments
        ? productPayments.reduce((detailsArray, amount) => {
            if (amount.paymentStatus === constants.paymentStatusSuccess) {
              const data = {
                paymentAmount: `₹ ${amount.paymentAmount}`,
                transactionId: amount.transactionId,
                mode: amount.mode || "Razor Pay",
                date: amount.paidOn,
                salesReceipt: amount.salesReceipt
              };
              detailsArray.push(data);
            }
            return detailsArray;
          }, [])
        : [];

    /**
     * Check if payment is made with plato
     */
    const isPaidWithPlato =
      platoPayments &&
      platoPayments.paidInstallments &&
      platoPayments.paidInstallments.length;

    /**
     * Find the pending plato installments
     */
    const platoPendingInstallments =
      platoPayments && platoPayments.pendingInstallments
        ? platoPayments.pendingInstallments
        : [];

    /**
     * Find the paid plato installments
     */
    const platoPaidInstallmentsCount = platoPayments
      ? platoPayments.paidInstallments
        ? platoPayments.paidInstallments.length
        : 0
      : 0;

    /**
     * Check if payment is complete in Plato
     */
    const isPlatoPaymentsComplete =
      isPaidWithPlato && platoPendingInstallments.length === 0;

    /**
     * Check if payment is complete in product
     */
    const isProductPaymentComplete =
      !isPaidWithPlato && productPayments
        ? !!productPayments.find(
            amount =>
              amount.paymentStatus === "SUCCESS" &&
              amount.paymentType === "FULL"
          )
        : false;

    /**
     * Flag to check if payment is complete for the trip
     */
    const isPaymentComplete =
      this.state.paymentStatus === constants.paymentStatusSuccess ||
      isPlatoPaymentsComplete ||
      isProductPaymentComplete;

    return (
      <ScrollableTabView
        tabBarActiveTextColor={constants.black2}
        tabBarInactiveTextColor={constants.firstColor}
        tabBarUnderlineStyle={{
          height: 2,
          backgroundColor: constants.black2
        }}
        tabBarTextStyle={{ ...constants.font13(constants.primaryLight) }}
        initialPage={0}
        style={{
          alignSelf: "center",
          width: responsiveWidth(100),
          backgroundColor: "white"
        }}
        prerenderingSiblingsNumber={Infinity}
        renderTabBar={() => <YourBookingsTabBar />}
      >
        {!isPaymentComplete ? (
          <UpcomingPayments
            tabLabel="Upcoming"
            isLoading={isLoading}
            loadPaymentData={this.loadPaymentData}
            isPaidWithPlato={isPaidWithPlato}
            paymentOptions={paymentOptions}
            isPaymentComplete={isPaymentComplete}
            platoBankDetails={platoBankDetails}
            isPaymentExpired={
              _.toUpper(this.state.paymentStatus) ===
              constants.paymentStatusExpired
            }
            paymentDue={this.state.nextPendingDate}
            paymentHistory={paymentHistory}
            openSupport={openSupport}
            platoPendingInstallments={platoPendingInstallments}
            platoPaidInstallmentsCount={platoPaidInstallmentsCount}
          />
        ) : null}
        {paymentHistory ? (
          <CompletedPayments
            tabLabel={"Completed"}
            isPaymentComplete={isPaymentComplete}
            paymentHistory={paymentHistory}
            isLoading={isLoading}
            loadPaymentData={this.loadPaymentData}
            gstReceipt={gstReceipt}
          />
        ) : (
          <View tabLabel={"Completed"} />
        )}
      </ScrollableTabView>
    );
  }
}

export default PaymentSummary;
