import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";
import constants from "../../../../../constants/constants";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../../../Services/PropTypeValidation/forbidExtraProps";
import PaymentInfoText from "../../PaymentInfoText";

/**
 * Card used for displaying the completed payments
 * Clicking on the card will open the receipt for the payment
 */
const CompletedPaymentCard = ({
  action,
  date,
  referenceId,
  mode,
  amount,
  color = constants.firstColor,
  containerStyle = {},
  salesReceipt
}) => {
  return (
    <TouchableOpacity
      onPress={action}
      activeOpacity={0.8}
      style={[
        styles.paymentCompleteCardContainer,
        { backgroundColor: color },
        containerStyle
      ]}
    >
      <View style={styles.leftSection}>
        <PaymentInfoText
          title={"Date"}
          text={date}
          containerStyle={styles.firstSection}
        />
        <PaymentInfoText
          title={"Reference ID"}
          text={referenceId}
          containerStyle={styles.secondSection}
        />
      </View>
      <View style={styles.rightSection}>
        <PaymentInfoText
          title={mode}
          text={amount}
          textStyle={styles.amountText}
          isLeftAligned={false}
          containerStyle={styles.amountSection}
        />
        <View style={styles.actionSection}>
          <Text
            style={[
              styles.viewReceiptText,
              salesReceipt ? { textDecorationLine: "underline" } : {}
            ]}
          >
            {salesReceipt ? "View Receipt" : ""}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

CompletedPaymentCard.propTypes = forbidExtraProps({
  date: PropTypes.string.isRequired,
  referenceId: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
});

const styles = StyleSheet.create({
  paymentCompleteCardContainer: {
    alignSelf: "center",
    flexDirection: "row",
    width: responsiveWidth(100) - 48,
    borderRadius: 3
  },
  leftSection: {
    flex: 1
  },
  rightSection: {
    flex: 1
  },
  viewReceiptText: {
    ...constants.fontCustom(constants.primarySemiBold, 14),
    color: "white"
  },
  firstSection: {
    marginTop: 24,
    marginLeft: 24,
    marginBottom: 12
  },
  secondSection: {
    marginBottom: 24,
    marginLeft: 24,
    marginTop: 12
  },
  amountSection: {
    marginTop: 24,
    marginRight: 24,
    marginBottom: 12
  },
  amountText: {
    ...constants.fontCustom(constants.primarySemiBold, 24, 28)
  },
  actionSection: {
    height: 40,
    marginTop: 12,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default CompletedPaymentCard;
